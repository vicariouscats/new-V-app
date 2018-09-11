import firebase from 'firebase';
require('firebase/firestore');

var config = {
  apiKey: 'AIzaSyBFRT8o7hoMoET5a0z4j2ClV1Nxip5_P34',
  authDomain: 'v-app-ed3e2.firebaseapp.com',
  databaseURL: 'https://v-app-ed3e2.firebaseio.com',
  projectId: 'v-app-ed3e2',
  storageBucket: 'v-app-ed3e2.appspot.com',
  messagingSenderId: '722404394814'
};

if(firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

export default firebase;
export const firestore = firebase.firestore();

firestore.settings({
  timestampsInSnapshots: true
});
