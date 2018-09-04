import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage
} from "react-native";
// import { Button, Containter, Form, Input, Item, Label } from "native-base";
import * as firebase from "firebase";
// import { GoogleSignin, GoogleSigninButton } from "react-native-google-signin";

// import { LoginButton } from "react-native-fbsdk";

var config = {
  apiKey: "AIzaSyBFRT8o7hoMoET5a0z4j2ClV1Nxip5_P34",
  authDomain: "v-app-ed3e2.firebaseapp.com",
  databaseURL: "https://v-app-ed3e2.firebaseio.com",
  projectId: "v-app-ed3e2",
  storageBucket: "v-app-ed3e2.appspot.com",
  messagingSenderId: "722404394814"
};
firebase.initializeApp(config);

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: null,
      userID: []
    };
  }

  // REAL HANDLE ----------reinstate later
  loginWithEmail = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }));
    this.props.navigation.navigate("App");
  };

  // // ----------TEMPORARY HANDLE
  // loginWithEmail = async () => {
  //   await AsyncStorage.setItem("emailToken", "Edgar");

  //   this.props.navigation.navigate("App");
  // };
  //----------------

  // PREV HANDLE ------------------

  async componentDidMount() {
    let fb_access_token = await AsyncStorage.getItem("fb_access_token");
    fb_access_token;
  }

  async loginWithFacebook() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "291621038300677",
      {
        permissions: ["public_profile", "email"]
      }
    );
    if (type === "success") {
      this.props.navigation.navigate("App");
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(error => {
          return "Error";
        });
    }
  }

  // //TEMPORARY FIX
  // async loginWithFacebook() {
  //   const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
  //     "291621038300677", //got from fbdev
  //     {
  //       permissions: ["public_profile"]
  //     }
  //   );
  //   if (type === "success") {
  //     await AsyncStorage.setItem("fb_access_token", token);
  //   }
  // }

  async signInWithGoogleAsync() {
    try {
      const result = await Expo.Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId:
          "722404394814-fjp30jgdqqknr39ui8c2fv5itbk8ti4c.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        return result.accessToken && this.props.navigation.navigate("App");
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  // async signInWithGoogleAsync() {
  //   try {
  //     const result = await Expo.Google.logInAsync({
  //       // androidClientId: YOUR_CLIENT_ID_HERE,
  //       iosClientId:
  //         "722404394814-fjp30jgdqqknr39ui8c2fv5itbk8ti4c.apps.googleusercontent.com",
  //       scopes: ["profile", "email"]
  //     });

  //     if (result.type === "success") {
  //       return result.accessToken && this.props.navigation.navigate("App");
  //     } else {
  //       return { cancelled: true };
  //     }
  //   } catch (e) {
  //     return { error: true };
  //   }
  // }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../V-logo-01.png")} />
        </View>
        <View style={styles.formContainer}>
          <Text />
          {this.state.errorMessage && (
            <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
          )}
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(225,225,225,0.7)"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            returnKeyType="go"
            placeholderTextColor="rgba(225,225,225,0.7)"
            style={styles.input}
            ref={input => (this.passwordInput = input)}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText} onPress={this.loginWithEmail}>
              {" "}
              SIGN IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.facebookButton}>
            <Text
              style={styles.buttonText}
              onPress={() => this.loginWithFacebook()}
            >
              {" "}
              Sign in with FACEBOOK
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // style={styles.buttonContainer}
            style={{ backgroundColor: "red" }}
          >
            <Text
              style={styles.buttonText}
              onPress={() => this.signInWithGoogleAsync()}
            >
              {" "}
              Sign in with GOOGLE +
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              style={styles.title}
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002647"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },

  logo: {
    width: 360,
    height: 100
  },

  title: {
    color: "white",
    marginTop: 10,
    width: 200,
    textAlign: "center"
  },
  formContainer: {
    padding: 20
  },

  input: {
    height: 40,
    backgroundColor: "green",
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 15,
    color: "#fff",
    paddingHorizontal: 10
  },

  buttonContainer: {
    backgroundColor: "#C0C0C0",
    paddingVertical: 15
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700"
  },

  facebookButton: {
    backgroundColor: "#3B5998",
    paddingVertical: 15,
    marginTop: 10
  }
});
