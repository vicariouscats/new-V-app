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
import firebase, { firestore } from "../services/firebase";

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
    firestore
      .collection("challenges")
      .limit(20)
      .onSnapshot({
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

  render() {
    // Scenarios
    // case 1: Loading content
    // case 2: Not found/empty content
    // case 3: list content
    const isEmpty =
      this.state.loading === false && this.state.challenges.length === 0;

    if (this.state.loading) {
      return this._renderLoading();
    } else if (isEmpty) {
      return this._renderNotFound();
    } else {
      return (
        <FlatList
          style={{ flex: 1, backgroundColor: "#122f3d" }}
          contentContainerStyle={{ alignItems: "center" }}
          data={this.state.challenges}
          keyExtractor={challenge => challenge.id}
          renderItem={this._renderChallenge}
        />
      );
    }
  }

  _renderLoading = () => {
    return (
      <View>
        <Spinner inverse />
      </View>
    );
  };

  _renderNotFound = () => {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <H1>Not found</H1>
      </View>
    );
  };

  _renderChallenge = ({ item }) => {
    const userId = firebase.auth().currentUser.uid;
    const completedUserIds = item.completedUserIds || [];
    const isCompleted = completedUserIds.includes(userId);
    return (
      <ChallengeItem
        key={item.id}
        challenge={item}
        completed={isCompleted}
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
    backgroundColor: "#002647"
  },
  text: {
    paddingBottom: 5,
    paddingTop: 10,
    fontWeight: "700",
    color: "white"
  }
});
