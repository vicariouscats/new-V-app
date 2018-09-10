import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import firebase from '../services/firebase';


export default class AuthLoadingScreen extends React.Component {
  render() {
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }
}