import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {HomeStackParamList} from '../navigation/HomeNavigator';

type Props = NativeStackScreenProps<HomeStackParamList, 'ShoppingPage1'>;

const ShoppingPage1 = ({navigation}: Props) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Shopping Page 1
      </Text>
      <Text variant="bodyMedium" style={styles.description}>
        This is the first step of the shopping process.
      </Text>
      <Button mode="contained" onPress={handleGoBack} style={styles.button}>
        Go Back
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
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  button: {
    minWidth: 150,
  },
});

export default React.memo(ShoppingPage1);
