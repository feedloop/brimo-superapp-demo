import {createNativeBottomTabNavigator} from '@bottom-tabs/react-navigation';
import React from 'react';
import {MD3Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AccountNavigator from './AccountNavigator';
import HomeNavigator from './HomeNavigator';

export type TabsParamList = {
  HomeNavigator: undefined;
  AccountNavigator: undefined;
};

const homeIcon = Icon.getImageSourceSync('home', 24);
const accountIcon = Icon.getImageSourceSync('account', 24);

const Tabs = createNativeBottomTabNavigator<TabsParamList>();

const TabsNavigator = () => {
  return (
    <Tabs.Navigator
      translucent={false}
      tabBarActiveTintColor={MD3Colors.primary50}>
      <Tabs.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: () => homeIcon,
        }}
      />
      <Tabs.Screen
        name="AccountNavigator"
        component={AccountNavigator}
        options={{
          title: 'Account',
          tabBarIcon: () => accountIcon,
        }}
      />
    </Tabs.Navigator>
  );
};

export default TabsNavigator;
