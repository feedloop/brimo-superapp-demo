import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TopupScreen from '../screens/TopupScreen';
import TabsNavigator from './TabsNavigator';

export type MainStackParamList = {
  Tabs: undefined;
  TopUp: undefined;
};

const Main = createNativeStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <Main.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Main.Screen name="Tabs" component={TabsNavigator} />
      <Main.Screen name="TopUp" component={TopupScreen} />
    </Main.Navigator>
  );
};

export default MainNavigator;
