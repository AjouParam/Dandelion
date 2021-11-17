import io from 'socket.io-client';

export default io('http://10.0.2.2:4000/', { reconnection: true });
