import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userState from '@contexts/userState';

const headers = {
  'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  Accept: '*/*',
};

const jwtToken = useRecoilValue(userState.uidState);
axios.defaults.baseURL = 'http://3.35.45.177:3000/';
axios.defaults.headers.common['x-access-token'] = jwtToken;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

const getData = async (setMypost) => {
  const data = await axios
    .get('/dandelion/post/get/mine', {
      params: {
        page: 1,
        maxPost: 4,
      },
    })
    .then((res) => setMypost(res.data.data));
};

export default { getData };
