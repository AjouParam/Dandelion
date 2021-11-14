import axios from 'axios';

export const validateEmail = (email) => {
  const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
  return regex.test(email);
};

export const validatePassword = (pass) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/;
  return regex.test(pass);
};

export const validateName = (name) => {
  const regex = /^[가-힣a-zA-Z0-9]{2,8}/i;
  return regex.test(name);
};

export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, '');
};

//좌표 값으로 지명 위치 가져오기
export const coord2address = async (location) => {
  const { longitude, latitude } = location;
  await axios
    .get('https://dapi.kakao.com/v2/local/geo/coord2address.json', {
      headers: { Authorization: 'KakaoAK 49044b35e7697c7ed1c41e61f9482595' },
      params: {
        x: longitude,
        y: latitude,
      },
    })
    .then((res) => {
      const temp = JSON.parse(res.request._response)['documents'];
      console.log('KAKAO', temp);

      return temp;
    })
    .catch((err) => console.log('udonPeople error : ' + err));
};
