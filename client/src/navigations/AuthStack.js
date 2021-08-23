import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@screens/Login';
import Signup from '@screens/Signup';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const theme = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.background },
        headerTintColor: theme.headerTintColor,
      }}
    >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerBackTitleVisible: false, title: '회원가입' }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
