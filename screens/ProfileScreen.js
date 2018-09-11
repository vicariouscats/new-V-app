import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  ScrollView,
  Image,
  ImageBackground
} from "react-native";
import {
  Container,
  Content,
  Icon,
  Thumbnail,
  Header,
  Left,
  Right,
  Body
} from "native-base";

export default class ProfileScreen extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.boxContainer, styles.topThird]}>
          <Image
            source={{ uri: "https://via.placeholder.com/75x75" }}
            style={{
              height: 75,
              width: 75,
              borderRadius: 37.5
            }}
          />
          <Text>Profile Name</Text>
          <Text>Location</Text>
          <View style={{ flexDirection: "row" }}>
            <Button title="Follow" onPress={() => {}} />
            <Button title="Message" onPress={() => {}} />
          </View>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            alignContent: "space-between",
            justifyContent: "space-between"
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text>26</Text>
            <Text>Completed</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text>12</Text>
            <Text>Posts</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text>12.3k</Text>
            <Text>Followers</Text>
          </View>
        </View>
        <View style={[styles.boxContainer, styles.midThird]} />
        <View style={[styles.boxContainer, styles.botThird]} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  boxContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  topThird: {
    flex: 2
  },
  midThird: {
    paddingBottom: 10
  }
});
