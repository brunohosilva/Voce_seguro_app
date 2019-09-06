
import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import { Icon, Button } from 'react-native-elements';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import axios from 'axios';
export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    isModalVisible: false
  };

  location = []

  componentDidMount() {
    // current ip network that are you use // 
    axios.get('http://192.168.15.10:3000/teste')
      .then(res => {
        this.location = res.data;
        console.log(this.location)
      })
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  switchMapType = () => {
    this.setState({ mapType: this.state.mapType === 'satellite' ? 'standard' : 'satellite' });
  }

  render() {
    let latitude = 0;
    let longitude = 0;

    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      latitude = parseFloat(this.state.location.coords.latitude);
      longitude = parseFloat(this.state.location.coords.longitude);
    }

    return (
      <View style={styles.container}>
        <MapView
          style={{
            width: "100%",
            height: "100%"
          }}
          mapType={this.state.mapType}
          region={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >

          <MapView.Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude
            }}
            title={"Minha Localização"}
            description={"Estou aqui"}
          />
          {this.location.map((marker, id) => (
            <MapView.Marker
              key={id}
              coordinate={marker.coordinates}
              title={marker.title}
              image={require('./icon/stolecarmin.png')}
            />
          ))}
        </MapView>
        <View style={styles.btn_info}>
          <Icon
            name='info-circle'
            type='font-awesome'
            onPress={this.toggleModal} />
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1 }}>
              <Text style={styles.info}>No último mês foram relatados 20.999 furtos de carros</Text>
              <Button style={styles.btnCloseModal}
                icon={{
                  name: 'times-circle',
                  type: 'font-awesome',
                  color: '#FFFFFF'
                }}
                type="clear"
                onPress={this.toggleModal}
              />
            </View>
          </Modal>
        </View>
        <View style={styles.btn_layer}>
          <Icon
            name='map'
            type='font-awesome'
            onPress={this.switchMapType} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    padding: 5,
    height: 50,
    width: 50,
    borderRadius: 400,
    backgroundColor: '#FFFFFF',
    borderColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  btn_layer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 30,
    padding: 5,
    height: 50,
    width: 50,
    borderRadius: 400,
    backgroundColor: '#FFFFFF',
    borderColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  btnCloseModal: {
    position: 'absolute',
    right: 0
  },
  info: {
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    bottom: '50%',
    padding: 30
    
  }
});

