import {INITIAL_STATE} from './config';

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'ADD_LETTER':
            return Object.assign({}, state, moveItem(state, state.inputs, action));
        case 'SUBMIT':
            return Object.assign({}, state, submit(state));
        case 'UPDATE_POSITION':
            return Object.assign({}, state, setLocation(state, action));
        case 'UPDATE_SURE':
            return Object.assign({}, state, setSure(state, action));
    }
    return state
}

function moveItem(state, inputs, action){
    let newContent = inputs;
    let newState = state;
    if(action.input === 'Are you sure?') {
        newState.sureInput.text = newState.sureInput.text + action.letter;
    }
    else {
    newContent.forEach(input => { if(input.name === action.input) input.text = input.text + action.letter });
    }
    newState.inputs = newContent;
    return newState
}

function setLocation(state, action){
    const { lat, long } = action.position;
    let newState = state;
    newState.locationInput.text = `Lat: ${ lat }, Long: ${ long }`
    if(lat === 50 && long === 14) newState.isPositionValid = true;
    return newState;
}

function setSure(state, action){
    let newState = state;
    if (action.value === 'yes') {
        newState.isSure = true
        newState.sureInput.text = 'What a bravery!';
    }
    else if(action.value === 'no') {
        newState.sureInput.text = '';
        newState.isSure = false;
        newState.showSure = false;
        newState.error = false
    }
    return newState;
}

function submit(state){
    let newState = state;
    newState.inputs.forEach((input) => { 
        if(input.name === 'Email'){
            if(!isValidEmail(input.text)) {
                input.validationError = 'What you expected? I dont check for valid email.';
                newState.error = true;
            }
            else input.validationError = undefined;
        } 
    });

    const { showSure, requirePosition, isSure, isPositionValid, error } = newState;
    if (!showSure && !isSure) newState.showSure = true;
    if (isSure) newState.requirePosition = true;
    if (isSure && isPositionValid) newState.finished = true;
    if(error && !isSure) newState.superSpeed = true;
    return newState;
}

function isValidEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
