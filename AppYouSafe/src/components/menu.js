import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ToggleSwitch from 'toggle-switch-react-native'

export default class MenuSideBar extends Component {
  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <Text> <Icon name="rocket" size={30} color="#900" />Conteúdo side bar</Text>
        <ToggleSwitch
          onColor="green"
          offColor="grey"
          label="Furto de Roubo"
          labelStyle={{ color: "black", fontWeight: "900" }}
          size="large"
          onToggle={isOn => console.log("changed to : ", isOn)}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    color: '#ffffff',
    marginTop: 7
  },
  container_menu: {
    backgroundColor: '#1E90FF',
    width: Dimensions.get('window').width,
  },
  header: {
    backgroundColor: '#1E90FF',
  }
});