import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Drawer, Container, Header, View} from 'native-base';
import Map from './src/components/Map'
import MenuSideBar from './src/components/menu'



export default class App extends Component {

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  render() {
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<MenuSideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <Container>
          <Header style={styles.header}>
            <Container style={styles.container_menu}>
              <Icon onPress={() => this.openDrawer()} name="bars" size={30} style={styles.menu} />
            </Container>
            <View style={styles.appNameContainer}>
              <Text style={styles.appName}>You Safe</Text>
            </View>
          </Header>
          <Map></Map>
        </Container>
      </Drawer>
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
  menu: {
    color: '#ffffff',
    marginTop: 7,
    marginLeft: 15
  },
  container_menu: {
    backgroundColor: '#1E90FF',
    width: Dimensions.get('window').width,
  },
  header: {
    backgroundColor: '#1E90FF',
  },
  appNameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '30%'
  },
  appName: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
  }
});