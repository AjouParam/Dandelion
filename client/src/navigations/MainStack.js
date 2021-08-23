import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTab from './MainTab';

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
      <Stack.Screen name="Main" component={MainTab} />
    </Stack.Navigator>
  );
};

export default MainStack;
