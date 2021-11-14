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
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const getData = async () => {
  const data = await axios
    .get('/dandelion/post/get/mine', {
      query: {
        page: 0,
        maxPost: 4,
      },
    })
    .then((res) => console.log(res));
  console.log('이건가', data);
  return data;
};

export default { getData };
