import React, { useState, useEffect } from 'react';
import { View, Text, Header, FlatList } from 'react-native';
import { tester1, tester2, tester3, tester4, tester5 } from '../../assets/index';
import Mail from '../../components/post/Mail';
import dummy from './mail_dummy.json';
const test_image = [tester1, tester2, tester3, tester4, tester5];
const renderItem = ({ item }) => {
  console.log(item);
  return (
    <Mail
      click={true}
      navigation={item.navigation}
      props={{
        name: item.name,
        date: item.date,
        text: item.text,
        src: test_image[item.src],
      }}
    />
  );
};
const MailSubPage = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setLoading(true);
    /*
    fetch('API_URL')
      .then((res) => res.json())
      .then((res) => setData(res));\
    */
    setData(dummy.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => String(item.id)}></FlatList>;
};

export default MailSubPage;
