import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
const Container = styled.View`
  flex: 1;
  display: flex;
  padding: 15px 15px;
  height: 700px;
  background-color: #ffffff;
`;

const StyledText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const Divider = styled.View`
  margin-top: 10px;
  height: 1px;
  border: 0.5px solid #000000;
`;
const ImageContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  margin-top: 20px;
`;

const Image = styled.View`
  border: 1px solid;
  height: 80px;
  width: 80px;
  margin: 5px;
`;
// const MindleInfo = ({ navigation, route }) => {
const MindleInfo = (props) => {
  const [mindleInfo, setMindleInfo] = useState({ name: '', madeby: '', hashtag: [], visitCount: '', current: '' });
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '4',
      title: '4 Item',
    },
    {
      id: '5',
      title: '5 Item',
    },
    {
      id: '6',
      title: '6 Item',
    },
    {
      id: '7',
      title: '7 Item',
    },
    {
      id: '8',
      title: '8 Item',
    },
    {
      id: '9',
      title: '9 Item',
    },
    {
      id: '10',
      title: '10 Item',
    },
    {
      id: '11',
      title: '11 Item',
    },
    {
      id: '12',
      title: '12 Item',
    },
    {
      id: '13',
      title: '13 Item',
    },
    {
      id: '14',
      title: '14 Item',
    },
    {
      id: '15',
      title: '15 Item',
    },
    {
      id: '16',
      title: '16 Item',
    },
    {
      id: '17',
      title: '17 Item',
    },
    {
      id: '18',
      title: '18 Item',
    },
    {
      id: '19',
      title: '19 Item',
    },
    {
      id: '20',
      title: '20 Item',
    },
    {
      id: '21',
      title: '21 Item',
    },
    {
      id: '22',
      title: '22 Item',
    },
    {
      id: '23',
      title: '23 Item',
    },
    {
      id: '24',
      title: '24 Item',
    },
    {
      id: '25',
      title: '25 Item',
    },
  ];
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setMindleInfo(props.mindleInfo);
    setTimeout(() => {
      if (mindleInfo) console.log(mindleInfo);
    }, 200);
    setLoading(true);
    getData();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={{ height: 60, padding: 15 }}>
        <TouchableOpacity
          onPress={() => {
            setSelectedId(item.id);
          }}
          style={{ backgroundColor: '#fdfdfd' }}
        >
          <StyledText>{item.title}</StyledText>
        </TouchableOpacity>
      </View>
    );
  };

  const getData = () => {
    //TODO : get contents API
    console.log('get data');
    if (page * 12 + 12 <= DATA.length) {
      setData((prev) => prev.concat(DATA.slice(page * 12, page * 12 + 12)));
      setPage((prev) => prev + 1);
    } else {
      setData((prev) => prev.concat(DATA.slice(page * 12, DATA.length)));
      setPage((prev) => prev + 1);
    }
    setLoading(false);
  };

  const handleLoadMore = () => {
    console.log('load more!');
    setLoading(true);
    getData();
  };
  return (
    <>
      <Container>
        {/* <Header /> */}

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListHeaderComponent={
            <>
              <ImageContainer>
                <Image></Image>
                <Image></Image>
                <Image></Image>
                <Image></Image>
                <Image></Image>
                <Image></Image>
                <Image></Image>
                <Image></Image>
              </ImageContainer>
              <Divider />
            </>
          }
          ListFooterComponent={loading && <ActivityIndicator />}
        />
        {/* <BottomSheet
          ref={bottomSheet}
          snapPoints={[800, 400]}
          initialSnap={1}
          enabledGestureInteraction={true}
          renderContent={MindleBoard}
        /> */}
      </Container>
    </>
  );
};
export default MindleInfo;
