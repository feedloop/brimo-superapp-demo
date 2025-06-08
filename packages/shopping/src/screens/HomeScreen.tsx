import {NativeBottomTabScreenProps} from '@bottom-tabs/react-navigation';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Button, Text} from 'react-native-paper';
import {HomeStackParamList} from '../navigation/HomeNavigator';
import {MainStackParamList} from '../navigation/MainNavigator';
import {TabsParamList} from '../navigation/TabsNavigator';

type Props = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList>,
  CompositeScreenProps<
    NativeBottomTabScreenProps<TabsParamList, 'HomeNavigator'>,
    NativeStackScreenProps<MainStackParamList>
  >
>;

const HomeScreen = ({navigation}: Props) => {
  const handleShoppingNavigation = () => {
    navigation.navigate('ShoppingPage1');
  };

  const handleTopUpNavigation = () => {
    navigation.navigate('TopUp');
  };

  return (
    <View style={styles.container}>
      <Avatar.Icon size={60} icon={'shopping'} style={styles.avatar} />
      <Text variant="headlineMedium" style={styles.title}>
        This is Shopping Mini App
      </Text>
      <Button
        mode="contained"
        onPress={handleShoppingNavigation}
        style={styles.button}>
        Shopping Page 1
      </Button>
      <Button
        mode="contained"
        onPress={handleTopUpNavigation}
        style={styles.button}>
        Go to Top Up mini app
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    minWidth: 150,
    marginBottom: 16,
  },
  avatar: {
    marginBottom: 16,
  },
});

export default HomeScreen;
