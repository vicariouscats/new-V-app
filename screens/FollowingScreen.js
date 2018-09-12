import React, { Component } from "react";
import {
  StyleSheet,
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
import Swipeout from "react-native-swipeout";
import { getChallenges } from "../utils/data";
import { LinearGradient } from "expo";
import ChallengeItem from "../components/ChallengeItem";
import firebase, { firestore } from "../services/firebase";
import { View, Text, Button } from "native-base";

export default class FollowingScreen extends Component {
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
      .where("challengerIds", "array-contains", firebase.auth().currentUser.uid)
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

  handleUnfollow = async challenge => {
    const userId = firebase.auth().currentUser.uid;
    let challengerIds = challenge.challengerIds || [];

    challengerIds = challengerIds.filter(id => {
      return id != userId;
    });

    await firestore
      .collection("challenges")
      .doc(challenge.id)
      .update({
        challengerIds: challengerIds
      });
  };

  handleComplete = async challenge => {
    const userId = firebase.auth().currentUser.uid;
    let completedUserIds = challenge.completedUserIds || [];

    completedUserIds.push(userId);

    await firestore
      .collection("challenges")
      .doc(challenge.id)
      .update({
        completedUserIds: completedUserIds
      });
    this.props.navigation.navigate("Complete");
  };

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
          style={{ flex: 1 }}
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
    console.log({
      userId,
      completedUserIds
    });
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {},
      onOpen: (secId, rowId, direction) => {},
      right: !isCompleted
        ? [
            {
              onPress: this.handleComplete.bind(null, item),
              text: "Complete",
              backgroundColor: "gold"
            },
            {
              onPress: this.handleUnfollow.bind(null, item),
              text: "Unfollow",
              backgroundColor: "blue"
            }
          ]
        : []
    };
    return (
      <Swipeout {...swipeSettings}>
        <View style={{}}>
          <ChallengeItem
            challenge={item}
            completed={isCompleted}
            onPress={() =>
              this.props.navigation.navigate("Details", { id: item.id })
            }
          />
        </View>
      </Swipeout>
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
