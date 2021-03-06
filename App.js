import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import NewsFeedScreen from "./screens/NewsFeedScreen";
import FollowingScreen from "./screens/FollowingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PostScreen from "./screens/PostScreen";
import PostCompleteScreen from "./screens/PostCompleteScreen";
import ChallengeDetailScreen from "./screens/ChallengeDetailScreen";

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

const AppTabNavigator = createBottomTabNavigator(
  {
    NewsFeedScreen: NewsFeedScreen,
    FollowingScreen: FollowingScreen,
    ProfileScreen: ProfileScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "NewsFeedScreen") {
          iconName = `ios-home${focused ? "" : "-outline"}`;
        } else if (routeName === "FollowingScreen") {
          iconName = `ios-paper${focused ? "" : "-outline"}`;
        } else if (routeName === "ProfileScreen") {
          iconName = `ios-person${focused ? "" : "-outline"}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

const AppStackNavigator = createStackNavigator(
  {
    AppTabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: ({ navigation }) => ({
        // const title = navigation.getParam('title')
        // navigate: navigation.navigate('screenName, {title: 'title goes here'});
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View style={{ paddingHorizontal: 10 }}>
              <Ionicons name="ios-menu" size={24} />
            </View>
          </TouchableOpacity>
        ),
        headerRight: (
          <TouchableOpacity onPress={() => navigation.navigate("Post")}>
            <View style={{ paddingHorizontal: 10 }}>
              <Ionicons name="ios-create-outline" size={24} />
            </View>
          </TouchableOpacity>
        )
      })
    },
    Details: {
      screen: ChallengeDetailScreen
    },
    Post: {
      screen: PostScreen
    },
    Complete: {
      screen: PostCompleteScreen
    }
  }
  // { initialRouteName: "Complete" }
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: AppStackNavigator
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        // const title = navigation.getParam('title')
        // navigate: navigation.navigate('screenName, {title: 'title goes here'});
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <View style={{ paddingHorizontal: 10 }}>
              <Ionicons name="ios-menu" size={24} />
            </View>
          </TouchableOpacity>
        )
      })
    }
  },
  { initialRouteName: "Main" }
);

const VSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: SplashScreen,
    Auth: AuthStackNavigator,
    App: AppDrawerNavigator
  },
  {
    initialRouteName: "AuthLoading"
  }
);

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
