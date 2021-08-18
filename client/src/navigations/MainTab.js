import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, ChannelList, Maps, HotSpot } from '../screens';
import { Ionicons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
  const theme = useContext(ThemeContext);
  return <Ionicons name={name} size={26} color={focused ? theme.tabActiveColor : theme.tabInactiveColor} />;
};

const MainTab = ({ navigation, route }) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const title = getFocusedRouteNameFromRoute(route) ?? 'Channels';
    navigation.setOptions({
      headerTitle: title,
      headerRight: () =>
        title === 'Channels' && (
          <Ionicons
            name="ios-add"
            size={26}
            style={{ margin: 10 }}
            onPress={() => navigation.navigate('Channel Creation')}
          />
        ),
    });
  }, [route]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
      }}
    >
      <Tab.Screen
        name="지도"
        component={Maps}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: focused ? 'ios-map' : 'ios-map-outline',
            }),
          title: '지도',
        }}
      />
      <Tab.Screen
        name="핫스팟"
        component={HotSpot}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: focused ? 'ios-bonfire' : 'ios-bonfire-outline',
            }),
          title: '핫스팟',
        }}
      />
      <Tab.Screen
        name="채널"
        component={ChannelList}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: focused ? 'ios-bonfire' : 'ios-bonfire-outline',
            }),
          title: '채널',
        }}
      />
      <Tab.Screen
        name="프로필"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            TabBarIcon({
              focused,
              name: focused ? 'person-circle' : 'person-circle-outline',
            }),
          title: '프로필',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
