import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  AsyncStorage
} from "react-native";

export default class SignUpScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.logoContainer}>
          <Image source={require("./CHALLX-logo-01.png")} style={styles.logo} />
        </View>

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(225,225,225,0.7)"
            returnKeyType="next"
            // onSubmitEditing={() => this.passwordInput.focus()}
            // onChangeText={email => this.setState({ email })}
            // value={this.state.email}
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
            // ref={input => (this.passwordInput = input)}
            // onChangeText={password => this.setState({ password })}
            // value={this.state.password}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            returnKeyType="go"
            placeholderTextColor="rgba(225,225,225,0.7)"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.props.navigation.navigate("App")}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
          <Text style={styles.title}>
            By clicking Sign Up, you agree to our Terms and Conditions, and
            Private Policy
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34738f"
    // alignItems: "center",
    // justifyContent: "center"
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
    backgroundColor: "#ed8a45",
    paddingVertical: 15
  },

  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700"
  },
  title: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
    fontSize: 10
  }
});
