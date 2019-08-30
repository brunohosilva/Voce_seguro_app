
import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import axios from 'axios';
export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  location = []

  componentDidMount() {
    // current ip network that are you use // 
    axios.get('http://172.20.10.6:3000/latlon')
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
      <MapView
        style={{ flex: 1 }}
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
    );
  }
}

