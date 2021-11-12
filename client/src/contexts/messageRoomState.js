import { atom } from 'recoil';

const messageRoomState = {
  roomIdState: atom({
    key: 'roomIdState',
    default: [],
  }),
  audienceNameState: atom({
    key: 'audienceNameState',
    default: '',
  }),

  lastMessageState: atom({
    key: 'lastMessageState',
    default: '',
  }),
};

export default messageRoomState;
