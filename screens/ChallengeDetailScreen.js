import React from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
import { getChallengeDetail } from "../utils/data";
import { Spinner } from "native-base";
import { LinearGradient } from "expo";
import CompletedUsers from "../components/CompletedUsers";
import firebase, { firestore } from "../services/firebase";

class ChallengeDetailScreen extends React.Component {
  static navigationOptions = {};

  state = {
    loading: true,
    challenge: null,
    photos: [],
    completedUsers: []
  };

  componentDidMount() {
    const challengeId = this.props.navigation.state.params.id;
    this.subscribe = firestore
      .collection("challenges")
      .doc(challengeId)
      .onSnapshot(snapshot => {
        this.setState({
          loading: false,
          challenge: snapshot.data()
        });
      });
  }

  componentWillUnmount() {
    this.subscribe && this.subscribe();
  }

  handleAccept = async () => {
    const challengeId = this.props.navigation.state.params.id;
    const currentChallengerIds = this.state.challenge.challengerIds || [];
    const challengers = this.state.challenge.challengers || {};
    const currentUser = firebase.auth().currentUser;
    const userId = currentUser.uid;
    challengers[userId] = {
      name: currentUser.displayName,
      avatar: currentUser.photoURL
    };
    await firestore
      .collection("challenges")
      .doc(challengeId)
      .set(
        {
          challengerIds: [
            // list of user ids
            ...currentChallengerIds,
            userId
          ],
          challengers: challengers
        },
        { merge: true }
      );
  };

  isAccepted() {
    const challengerIds = this.state.challenge.challengerIds || [];
    const userId = firebase.auth().currentUser.uid;
    return challengerIds.includes(userId);
  }

  render() {
    if (this.state.loading)
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Spinner />
        </View>
      );
    const screenWidth = Dimensions.get("window").width;
    const challenge = this.state.challenge;
    console.log("challenge", challenge);
    const challengerCount = challenge.challengerIds
      ? challenge.challengerIds.length
      : 0;
    const completedCount = challenge.completedUserIds
      ? challenge.completedUserIds.length
      : 0;

    const completedUsers = challenge.completedUserIds
      ? challenge.completedUserIds.map(userId => {
          return challenge.challengers[userId];
        })
      : [];

    // .filter(user => {
    //   console.log("user", user);
    //   user !== undefined;
    // })

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          style={{ backgroundColor: "white", flex: 1 }}
          contentContainerStyle={{
            paddingBottom: 56,
            position: "relative"
          }}
        >
          <ImageBackground
            source={{ uri: challenge.pictureUrl }}
            style={{
              position: "relative",
              width: screenWidth,
              height: 300
            }}
          >
            <LinearGradient
              colors={["transparent", "rgba(0, 0, 0, 0.5)"]}
              style={{
                flex: 1,
                position: "absolute",
                bottom: 0,
                padding: 16,
                width: "100%"
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: "white"
                }}
              >
                {challenge.title}
              </Text>
            </LinearGradient>
          </ImageBackground>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd"
            }}
          >
            <ImageBackground
              source={{ uri: challenge.author.avatar }}
              style={{
                width: 56,
                height: 56,
                borderRadius: 56,
                overflow: "hidden",
                marginRight: 16
              }}
            />
            <View style={{ flex: 1, flexDirection: "column", paddingTop: 8 }}>
              <View style={{ marginBottom: 8 }}>
                <Text>Posted By</Text>
              </View>
              <View>
                <Text>{challenge.author.name}</Text>
              </View>
            </View>
          </View>
          <View style={{ padding: 16 }}>
            <Text
              style={{
                color: "#666",
                fontSize: 14
              }}
            >
              {challenge.content}
            </Text>
          </View>

          <View
            style={{
              padding: 16
            }}
          >
            <Text style={{ fontSize: 16, marginBottom: 8 }}>
              Photos & Videos
            </Text>
            <FlatList
              data={this.state.photos}
              horizontal
              renderItem={({ item }) => (
                <View style={{ marginRight: 8 }}>
                  <ImageBackground
                    source={{ uri: item }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 6,
                      overflow: "hidden"
                    }}
                  />
                </View>
              )}
            />
          </View>

          <CompletedUsers total={completedCount} users={completedUsers} />
        </ScrollView>
        <View style={{ height: 56 }}>
          <TouchableOpacity
            style={{
              backgroundColor: this.isAccepted() ? "grey" : "green",
              height: 56,
              alignItems: "center",
              justifyContent: "center"
            }}
            onPress={this.handleAccept}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              {this.isAccepted() ? "Accepted" : "Accept Challenge"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ChallengeDetailScreen;
