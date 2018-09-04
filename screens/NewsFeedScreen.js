import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  ScrollView
} from "react-native";
import Adventures from "../adventures/Adventures";

export default class NewsFeedScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Popular Adventures</Text>
        <Adventures />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002647"
  },
  text: {
    paddingBottom: 5,
    paddingTop: 10,
    fontWeight: "700",
    color: "white"
  }
});
