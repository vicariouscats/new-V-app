import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default class AdventureItem extends Component {
  render() {
    const movieInfo = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Details", movieInfo);
          }}
        >
          <Image
            style={styles.images}
            source={{
              uri: `https://image.tmdb.org/t/p/w342/${this.props.poster_path}`
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1
  },
  images: {
    alignItems: "stretch",
    height: 200,
    width: 140
  }
});
