import React from 'react';
import { View, Text, Header } from 'react-native';
import { tester1, tester2, tester3, tester4, tester5 } from '../../assets/index';
import Mail from '../../components/post/Mail';

const MailSubPage = ({ navigation }) => {
  return (
    <>
      <Mail
        click={true}
        navigation={navigation}
        props={{
          name: '성기훈',
          date: '20.09 26',
          text: '예, 저는 저 쌍문동 사는 성기훈인데요...',
          src: tester1,
        }}
      />
      <Mail
        click={true}
        navigation={navigation}
        props={{
          name: '조상우',
          date: '20.09 31',
          text: '형 인생이 왜 그 모양 그 꼴인지 알아?',
          src: tester2,
        }}
      />
      <Mail
        click={true}
        navigation={navigation}
        props={{
          name: '강새벽',
          date: '20.10 05',
          text: '아저씨 나 집에 가고 싶어',
          src: tester3,
        }}
      />
      <Mail
        click={true}
        navigation={navigation}
        props={{
          name: '오일남',
          date: '20.10 18',
          text: '"제발 그만해! 나! 무서워 이러다가는 다 죽어!!! 다!! 다!!! 죽는단 말야... 나.. 너무 무서워... 그만해!!!! 이러다간 다 죽어!!!!"',
          src: tester4,
        }}
      />
      <Mail
        click={true}
        navigation={navigation}
        props={{
          name: '영희',
          date: '20.10 01',
          text: '무궁화 꽃이 피었습니다!',
          src: tester5,
        }}
      />
    </>
  );
};

export default MailSubPage;
