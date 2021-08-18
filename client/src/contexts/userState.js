import { atom } from 'recoil';

const userState = {
  emailState: atom({
    key: 'emailState',
    default: '',
  }),

  uidState: atom({
    key: 'uidState',
    default: '',
  }),
};

export default userState;
