import { store } from './index.jsx'
export default function getPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, onError,{maximumAge:60000, timeout:30000, enableHighAccuracy:true});
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    store.dispatch({ type:'UPDATE_POSITION', position: {lat: parseInt(position.coords.latitude), long: parseInt(position.coords.longitude)}});
}

function onError(err) {
    console.log(err);
}