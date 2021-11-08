import React, { useContext } from 'react';
import { Text } from 'react-native';
import { ThemeContext } from 'styled-components/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MainTab from './MainTab';
import { Maps, Mypage, HotSpot, MypageList, MindlePost, MakePost, PostContainer } from '../screens';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: theme.headerTintColor,
        cardStyle: { backgroundColor: theme.background },
        headerBackTitleVisible: false,
      }}
    >
      {/* <Stack.Screen name="Main" component={Map} /> */}
      <Stack.Screen name="Main" component={Maps} options={{ headerShown: false }} />
      <Stack.Screen name="MindlePost" component={MindlePost} options={{ headerShown: true, title: '게시글' }} />
      <Stack.Screen name="MakePost" component={MakePost} options={{ headerShown: true, title: '게시글 작성' }} />
      <Stack.Screen name="Mypage" component={Mypage} options={{ headerShown: true, title: 'MY' }} />
      <Stack.Screen name="PostContainer" component={PostContainer} options={{ headerShown: false }} />
      <Stack.Screen name="MypageList" component={MypageList} options={{ headerShown: false }} />
      <Stack.Screen name="HotSpot" component={PostContainer} options={{ headerShown: false }} />
      <Stack.Screen name="Post" component={PostContainer} options={{ headerShown: false }} />
      <Stack.Screen name="Channel" component={PostContainer} options={{ headerShown: false }} />
      <Stack.Screen name="Mindle" component={PostContainer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStack;
