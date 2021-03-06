import React, { Component } from "react";
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native";

export default class SettingsScreen extends Component {
  signOut = async () => {
    AsyncStorage.clear();
    this.props.navigation.navigate("Welcome");
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign Out" onPress={this.signOut} />
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
