import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Button
} from "react-native";

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
    const { params } = this.props.navigation.state;
    return (
      <View>
        <ImageBackground
          blurRadius={5}
          source={{
            uri: `https://image.tmdb.org/t/p/w342/${params.poster_path}`
          }}
          style={styles.backgroundImages}
        >
          <View style={styles.darkOverlay} />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w342/${params.poster_path}`
            }}
            style={[styles.images, { marginBottom: 5 }]}
          />
          <Button title="Play Now" color="red" onPress={() => {}} />
          <Text
            style={{
              fontStyle: "italic",
              fontWeight: "bold",
              fontSize: 15,
              color: "white",
              marginTop: 5,
              marginStart: 6,
              marginEnd: 6
            }}
          >
            {params.title}
          </Text>
          <Text
            style={{
              color: "white",
              marginTop: 5,
              marginStart: 6,
              marginEnd: 6
            }}
          >
            {params.overview}
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.79)"
  },
  text: {
    color: "white"
  },
  images: {
    height: 200,
    width: 140,
    alignItems: "center"
  },
  backgroundImages: {
    opacity: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
