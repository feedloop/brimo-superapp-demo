import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NavBar from '../components/NavBar';
import HomeScreen from '../screens/HomeScreen';
import ShoppingPage1 from '../screens/ShoppingPage1';

export type HomeStackParamList = {
  Home: undefined;
  ShoppingPage1: undefined;
};

const Home = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <Home.Navigator
      screenOptions={{
        header: NavBar,
        title: 'Shopping',
      }}>
      <Home.Screen name="Home" component={HomeScreen} />
      <Home.Screen
        name="ShoppingPage1"
        component={ShoppingPage1}
        options={{
          title: 'Shopping Page 1',
        }}
      />
    </Home.Navigator>
  );
};

export default HomeNavigator;
