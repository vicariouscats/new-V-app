import React, { Component } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import AdventureItem from "../adventures/AdventureItem";

export default class Adventures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adventures: [],
      loaded: false
    };
  }

  async componentDidMount() {
    const timeout = ms => new Promise(res => setTimeout(res, ms));
    const url =
      "https://api.themoviedb.org/3/movie/now_playing?api_key=8c54b08b120d2d59bdffb9c090467daa";
    const response = await fetch(url);
    const data = await response.json();
    await timeout(3000);
    this.setState({
      adventures: data.results,
      loaded: true
    });
  }

  render() {
    if (!this.state.loaded) {
      return <ActivityIndicator size="large" style={{ flex: 1 }} />;
    }
    console.log(this.props);
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 5 }} />}
          data={this.state.adventures}
          renderItem={({ item }) => (
            <AdventureItem {...item} navigation={this.props.navigation} />
          )}
        />
      </View>
    );
  }
}
