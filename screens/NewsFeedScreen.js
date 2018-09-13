import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  FlatList
} from "react-native";
import {
  Container,
  Content,
  Icon,
  Thumbnail,
  Header,
  Left,
  Right,
  Spinner,
  H1
} from "native-base";
import { getChallenges } from "../utils/data";
import { LinearGradient } from "expo";
import ChallengeItem from "../components/ChallengeItem";
import { firestore } from "../services/firebase";

export default class NewsFeedScreen extends Component {
  /**
   * Initial: loading = true
   * Fetched: loading = false, challenges
   *  2.1: no challenge -> show empty message
   *  2.2: show list challenges
   */
  state = {
    loading: true,
    challenges: []
  };

  componentDidMount() {
    this.subscribe = firestore
      .collection("challenges")
      .limit(20) // limit collection (challenges) to 20
      .onSnapshot({
        //receive data real-time (update immediately if there are any changes in the db)
        error: console.log,
        next: querySnapshot => {
          const challenges = [];
          querySnapshot.forEach(snapshot => {
            challenges.push({
              ...snapshot.data(),
              id: snapshot.id
            });
          });
          this.setState({
            loading: false,
            challenges: challenges
          });
        }
      });
  }

  componentWillUnmount() {
    this.subscribe && this.subscribe();
  }

  render() {
    // Scenarios
    // case 1: Loading content
    // case 2: Not found/empty content
    // case 3: list content
    console.log("DATADATA", this.state.challenges);
    const isEmpty =
      this.state.loading === false && this.state.challenges.length === 0;

    if (this.state.loading) {
      return this._renderLoading();
    } else if (isEmpty) {
      return this._renderNotFound();
    } else {
      return (
        <FlatList
          style={{ flex: 1, backgroundColor: "#fff" }}
          contentContainerStyle={{ alignItems: "center" }}
          data={this.state.challenges.sort((a, b) => {
            if (a.createdAt.seconds > b.createdAt.seconds) return -1;
            if (a.createdAt.seconds < b.createdAt.seconds) return 1;
            return 0;
          })}
          keyExtractor={challenge => challenge.id}
          renderItem={this._renderChallenge}
        />
      );
    }
  }

  // loading
  _renderLoading = () => {
    return (
      <View>
        <Spinner inverse />
      </View>
    );
  };

  //empty
  _renderNotFound = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <H1>Not found</H1>
      </View>
    );
  };

  //render challenges via challenge item component. navigation passes 'id' prop
  _renderChallenge = ({ item }) => {
    return (
      <ChallengeItem
        key={item.id}
        challenge={item}
        onPress={() =>
          this.props.navigation.navigate("Details", { id: item.id })
        }
      />
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ed8a45"
  },
  text: {
    paddingBottom: 5,
    paddingTop: 10,
    fontWeight: "700",
    color: "white"
  }
});
