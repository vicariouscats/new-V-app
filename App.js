import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Icon } from "native-base";

import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import NewsFeedScreen from "./screens/NewsFeedScreen";
import FollowingScreen from "./screens/FollowingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AdventureDetails from "./adventures/AdventureDetails";
import PostScreen from "./screens/PostScreen";

// AUTHORIZE ROUTE (STACK NAVIGATOR)
const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUp: SignUpScreen
  //consider getting rid of signup screen and putting it all in welcome screen
});

const AppTabNavigator = createBottomTabNavigator({
  NewsFeedScreen: {
    screen: NewsFeedScreen
  },
  FollowingScreen: {
    screen: FollowingScreen
  },
  ProfileScreen: {
    screen: ProfileScreen
  }
});

const AppStackNavigator = createStackNavigator({
  AppTabNavigator: {
    screen: AppTabNavigator,
    navigationOptions: ({ navigation }) => ({
      // const title = navigation.getParam('title')
      // navigate: navigation.navigate('screenName, {title: 'title goes here'});
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="menu" size={24} />
          </View>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("Post")}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="post" size={24} />
          </View>
        </TouchableOpacity>
      )
    })
  },
  Details: {
    screen: AdventureDetails
  },
  Post: {
    screen: PostScreen
  }
});

const AppDrawerNavigator = createDrawerNavigator({
  Main: AppStackNavigator,
  Settings: SettingsScreen
});

const VSwitchNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppDrawerNavigator
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default class App extends React.Component {
  render() {
    return <VSwitchNavigator />;
  }
}
