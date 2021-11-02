import React from 'react';
import { View, Text, Header } from 'react-native';

import Mail from '../../components/post/Mail';

const MailSubPage = ({ navigation }) => {
  return (
    <>
      <Mail
        click={true}
        navigation={navigation}
        props={{
          name: '엉뚱한 어피치',
          date: '07.11 01',
          text: '테라스 간맥 고?',
        }}
      />
    </>
  );
};

export default MailSubPage;
