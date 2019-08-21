
import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';


export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

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
    console.log(location.coords.latitude)
    console.log(location.coords.longitude)
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

    let locations = {
      markers: [{
        title: 'Houve um assalto',
        coordinates: {
          latitude: -23.175993,
          longitude: -45.8565098
        },
      },
      {
        title: 'Houve um assalto',
        coordinates: {
          latitude: -23.1745971,
          longitude: -45.8547501
        },  
      }]
    }

    return (
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
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

      {locations.markers.map(marker => (
          <MapView.Marker 
            coordinate={marker.coordinates}
            title={marker.title}
            image={require('./icon/stolecarmin.png')}
          />
        ))}
      </MapView>
    );
  }
}

