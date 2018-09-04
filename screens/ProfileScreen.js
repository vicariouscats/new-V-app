import React, { Component } from "react";
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native";

export default class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Lea's PROFILE SCREEN</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
