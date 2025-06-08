import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import InvestasiScreen from '../screens/InvestasiScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import TopupScreen from '../screens/TopupScreen';
import TabsNavigator from './TabsNavigator';

export type MainStackParamList = {
  Tabs: undefined;
  Topup: undefined;
  Shopping: undefined;
  Investasi: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator screenOptions={{headerShown: false}}>
      <Main.Screen name="Tabs" component={TabsNavigator} />
      <Main.Screen name="Topup" component={TopupScreen} />
      <Main.Screen name="Shopping" component={ShoppingScreen} />
      <Main.Screen name="Investasi" component={InvestasiScreen} />
    </Main.Navigator>
  );
};

export default MainNavigator;
