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

import firebase from "../services/firebase";

export default class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "cat@test.com",
      password: "catcancode",
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
      .then(() => this.props.navigation.navigate("App"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  // cat@test.com pass: catcancode
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
        <Image source={require("./bkg2.png")} style={styles.backgroundImage} />

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
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={this.loginWithEmail}
          >
            <Text style={styles.buttonText}> SIGN IN</Text>
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
          <TouchableOpacity style={styles.googleButton}>
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
    backgroundColor: "#122f3d"
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
    textAlign: "center"
  },
  formContainer: {
    padding: 20,
    marginBottom: 30
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
  },
  googleButton: {
    backgroundColor: "#db3236",
    paddingVertical: 15,
    marginTop: 10
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    //resizeMode: "cover",
    opacity: 0.9
  }
});
