import {io} from 'socket.io-client';
import {BASE_URL} from './makeRequest';
// console.log(BASE_URL);
let url = BASE_URL.split('/api');
// console.log(url)
url = url[0];

const socket = io(url);
export default socket;
