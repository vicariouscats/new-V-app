import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { ImagePicker } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import firebase, { firestore } from '../services/firebase';

export default class PostScreen extends Component {
  state = {
    loading: false,
    form: {
      title: '',
      content: '',
      pictureUrl: '',
      author: 'Tester'
    },
    picture: null
  };

  componentDidMount() {
    console.log(firebase.auth().currentUser);
  }

  _pickImage = async () => {
    const { Permissions } = Expo;
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    ImagePicker.launchImageLibraryAsync()
      .then(result => {
        if (!result.cancelled) {
          this.setState({ picture: result });
        }
      })
      .catch(() => {});
  };

  handleSave = async () => {
    try {
      this.setState({ loading: true });
      const file = await fetch(this.state.picture.uri);
      const blob = await file.blob();
      const ref = firebase
        .storage()
        .ref()
        .child(`${Date.now()}.jpg`);
      const snapshot = await ref.put(blob);
      const pictureUrl = await snapshot.ref.getDownloadURL();
      const challengeSnapshot = await firestore.collection('challenges').add({
        title: this.state.form.title,
        content: this.state.form.title,
        pictureUrl: pictureUrl,
        author: {
          name: firebase.auth().currentUser.displayName,
          avatar: firebase.auth().currentUser.photoURL
        },
        createdAt: new Date()
      });

      this.setState({ loading: false });
      this.props.navigation.navigate('Details', { id: challengeSnapshot.id });
    } catch (ex) {
      // handle error
      console.log(ex);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          position: 'relative'
        }}
      >
        <View style={{ padding: 16 }}>
          <TextInput
            placeholder="Title"
            style={{
              borderWidth: 1,
              borderColor: '#777',
              height: 40,
              paddingHorizontal: 16
            }}
            value={this.state.form.title}
            onChangeText={title => {
              this.setState({
                form: {
                  ...this.state.form,
                  title
                }
              });
            }}
          />
          <TextInput
            placeholder="Content"
            style={{
              borderWidth: 1,
              borderColor: '#777',
              paddingHorizontal: 16,
              minHeight: 300,
              marginTop: 16
            }}
            multiline={true}
            value={this.state.form.content}
            onChangeText={content => {
              this.setState({
                form: {
                  ...this.state.form,
                  content
                }
              });
            }}
          />
          {!this.state.picture && (
            <TouchableOpacity
              onPress={this._pickImage}
              style={{ marginTop: 24 }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#777',
                  borderStyle: 'dashed',
                  padding: 16,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Ionicons name="md-image" style={{ fontSize: 36 }} />
                <Text>Select photo</Text>
              </View>
            </TouchableOpacity>
          )}

          {this.state.picture && (
            <Image
              source={{
                uri: this.state.picture.uri
              }}
              style={{ width: 500, height: 200 }}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={this.handleSave}
          style={{
            flex: 1,
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 56,
            backgroundColor: 'green',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16 }}>Save</Text>
        </TouchableOpacity>
        {this.state.loading && (
          <View style={{
            position: 'absolute',
            top: 0, 
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255,255, 0.6)'
          }}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}
