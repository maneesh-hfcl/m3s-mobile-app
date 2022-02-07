import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login';
import { NavigationContainer } from '@react-navigation/native';
import HomeStackScreens from './screenStack/homeStack';
import DrawerMenuScreens from './screenStack/drawerMenuStack';

export default function App() {
  return (
      <NavigationContainer>
        <DrawerMenuScreens />
        {/* <HomeStackScreens /> */}
      </NavigationContainer>
    // <View style={styles.container}>
    //   <Text>Hellodfdf sir, night time</Text>
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
