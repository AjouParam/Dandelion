import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, Award, Map, HotSpot, Settings } from '@screens/index';

import { ThemeContext } from 'styled-components/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

// const TabBarIcon = ({ focused, name }) => {
//   const theme = useContext(ThemeContext);
//   return <Ionicons name={name} size={26} color={focused ? theme.tabActiveColor : theme.tabInactiveColor} />;
// };

const TabText = styled.Text`
  font-size: 10px;
`;
const MainTab = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const title = getFocusedRouteNameFromRoute(route) ?? '지도';
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => title === '지도' && <TabText>지도</TabText>,
    });
  }, [route]);

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
      }}
    >
      <Tab.Screen
        name="지도"
        component={Map}
        options={{
          // tabBarIcon: ({ focused }) =>
          //   TabBarIcon({
          //     focused,
          //     name: focused ? 'ios-map' : 'ios-map-outline',
          //   }),
          title: '지도',
        }}
      />
      <Tab.Screen
        name="핫스팟"
        component={HotSpot}
        options={{
          // tabBarIcon: ({ focused }) =>
          //   TabBarIcon({
          //     focused,
          //     name: focused ? 'ios-bonfire' : 'ios-bonfire-outline',
          //   }),
          title: '핫스팟',
        }}
      />
      <Tab.Screen
        name="보상"
        component={Award}
        options={{
          // tabBarIcon: ({ focused }) =>
          //   TabBarIcon({
          //     focused,
          //     name: focused ? 'gift' : 'gift-outline',
          //   }),
          title: '보상',
        }}
      />
      <Tab.Screen
        name="프로필"
        component={Profile}
        options={{
          // tabBarIcon: ({ focused }) =>
          //   TabBarIcon({
          //     focused,
          //     name: focused ? 'person-circle' : 'person-circle-outline',
          //   }),
          title: '프로필',
        }}
      />
      <Tab.Screen
        name="설정"
        component={Settings}
        options={{
          // tabBarIcon: ({ focused }) =>
          //   TabBarIcon({
          //     focused,
          //     name: focused ? 'settings' : 'settings-outline',
          //   }),
          title: '설정',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
