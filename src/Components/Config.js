import io from 'socket.io-client';
const BASE_URL = 'http://192.168.43.7:3000/';
// YellowBox.ignoreWarnings(['Remote debugger']);
const socket = io(BASE_URL, {forceNode: true});

export {BASE_URL, socket};
