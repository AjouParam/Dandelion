import io from 'socket.io-client';

const socketClient = io('http://10.0.2.2:4000/');

socketClient.on('connect', () => {
  console.log('connection server');
});

export default socketClient;
