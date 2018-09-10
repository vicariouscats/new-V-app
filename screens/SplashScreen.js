import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from '../services/firebase';

export default class SplashScreen extends React.Component {
  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.props.navigation.navigate('Main');
      } else {
        this.props.navigation.navigate('Auth');
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }
}
