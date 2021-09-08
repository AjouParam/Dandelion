import { atom } from 'recoil';

const userState = {
  nameState: atom({
    key: 'nameState',
    default: '',
  }),
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
