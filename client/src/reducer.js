import {INITIAL_STATE} from './config';

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'MOVE_ITEM':
            return Object.assign({}, state, moveItem(state.content, action));
    }
    return state
}

function moveItem(content, action){
    let newContent = content;
    newContent.forEach(item => { if(item.name === action.item) item.location = action.bin });
    return {content: newContent};
}