import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NavBar from '../components/NavBar';
import HomeScreen from '../screens/HomeScreen';
import TopupPage1 from '../screens/TopupPage1';

export type HomeStackParamList = {
  Home: undefined;
  TopupPage1: undefined;
};

const Home = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        header: NavBar,
        title: 'Topup',
      }}>
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen
        name="TopupPage1"
        component={TopupPage1}
        options={{
          title: 'Topup Page 1',
        }}
      />
    </Home.Navigator>
  );
};

export default HomeNavigator;
