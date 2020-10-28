import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MapView from 'react-native-maps';
import Modal from "react-native-modal";
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Map2 extends Component {

  constructor(props) {
    super(props);
    this.state = { region: null };
  }

  state = {
    location: null,
    errorMessage: null,
    isModalVisible: false
  };

  location = []

  componentDidMount() {
    // current ip network that are you use // 
    axios.get('http://192.168.15.15:3000/latlonCarSteal')
      .then(res => {
        this.location = res.data;
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

  current_Location = () => {
    mystate = {
      latitude: parseFloat(this.state.location.coords.latitude),
      longitude: parseFloat(this.state.location.coords.longitude),
      longitudeDelta: 0.04,
      latitudeDelta: 0.04
    }
  }

  showCurrentLocation = () => {
    this.setState({
      region: this.current_Location()
    });
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
          style={styles.mapStyle}
          mapType={this.state.mapType}
          region={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
        >

          <MapView.Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude
            }}
            title={"Minha Localização"}
            description={"Estou aqui"}
            image={require('../icon/currentlocation2.png')}
          />
          {this.location.map((marker, id) => (
            <MapView.Marker
              key={id}
              coordinate={marker.coordinates}
              title={marker.title}
              image={require('../icon/stolecarmin.png')}
            />
          ))}
        </MapView>
        <TouchableOpacity style={styles.btnShowInfo}
          onPress={this.toggleModal}>
          <Icon
            name='info-circle'
            type='font-awesome'
          />
          <Modal isVisible={this.state.isModalVisible}>
            <View style={{ flex: 1 }}>
              <Text style={styles.info}>No último mês foram relatados 20.999 furtos de carros</Text>
              <Text style={styles.btnCloseModal}
                onPress={this.toggleModal}
              >x</Text>
            </View>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnChangeLayer}
          onPress={this.switchMapType}>
          <Icon
            name='map'
            type='font-awesome'
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnShowCurrentLocation}
          onPress={this.showCurrentLocation}>
          <Icon
            name='location-arrow'
            type='font-awesome'
          />
        </TouchableOpacity>
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%',
    marginLeft: 10
  },
  btnShowInfo: {
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
  btnChangeLayer: {
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
  btnShowCurrentLocation: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 30,
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
    right: 0,
    fontSize:40,
    color: "#ffffff"
    // ver o botão de fechar
  },
  info: {
    color: '#FFFFFF',
    textAlign: 'center',
    position: 'absolute',
    bottom: '50%',
    padding: 30

  }
});