import React, { Component } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import { View} from 'native-base';
import Map from './src/components/Map'
import Map2 from './src/components/map2'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'; 

export default class App extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

class Mapa1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Map />
      </View>
    )
  }
}

class Mapa2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Map2 />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const appDrawerNavigator = createDrawerNavigator({
  'Roubo de celular': {
    screen:Mapa1
  },
  'Roubo de carro': {
    screen:Mapa2
  },
}, {
  drawerBackgroundColor: '#1E90FF',
  contentOptions: {
    activeTintColor: 'white',
    itemsContainerStyle: {
      marginVertical: 0,
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
})

const AppSwitchNavigator = createSwitchNavigator({
  Dasboard: { screen: appDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator)
