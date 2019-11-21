
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Map extends Component {
    state = {
        location: null,
          errorMessage: null,
          isModalVisible: false
        };
      
        location = []
      
        
    componentDidMount() {
        // current ip network that are you use // 
        axios.get('http://172.20.10.6:3000/latlonCarSteal')
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
    
      // criar função pra mostrar a posicão atual  quando clicar
      showCurrentLocation = () => { 
        console.log("click")
      }

    render() {

        return(
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
            <View style={styles.btnShowInfo}>
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
            <View style={styles.btnChangeLayer}>
              <Icon
                name='map'
                type='font-awesome'
                onPress={this.switchMapType} />
            </View>
            <View style={styles.btnShowCurrentLocation}>
              <Icon
                name='location-arrow'
                type='font-awesome'
                onPress={this.showCurrentLocation} />
            </View>
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
