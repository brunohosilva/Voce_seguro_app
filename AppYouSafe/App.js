import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Drawer, Container, Header} from 'native-base';
import Map from './src/components/Map'

class SideBar extends Component {

  render() {
    return (
      <View style={[styles.container, { backgroundColor: '#fff' }]}>
        <Text> <Icon name="rocket" size={30} color="#900" />Conteúdo side bar</Text>
      </View>
    );
  }
};

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
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}>
        <Container>
          <Header style={styles.header}>
            <Container style={styles.container_menu}>
              <Icon onPress={() => this.openDrawer()} name="bars" size={30} style={styles.menu} />
            </Container>
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