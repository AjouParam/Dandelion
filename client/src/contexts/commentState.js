import { atom } from 'recoil';

const commentState = atom({
  key: 'commentState',
  default: false,
});

export default commentState;
