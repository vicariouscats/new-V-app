import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Button
} from "react-native";

import { withNavigation } from "react-navigation";

export default class AdventureDetails extends Component {
  static navigationOptions = {
    title: "Details",
    headerStyle: {
      backgroundColor: "black",
      borderBottomWidth: 0
    },
    headerTintColor: "white"
  };
  render() {
    return (
      <View>
        <Text>This is the Adventure Details</Text>
      </View>
    );
  }
}
