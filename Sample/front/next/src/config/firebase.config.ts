import config from '@config';
import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyC6wkE2lCppUXdrn_5ChcyRuF1A9vacEA4',
  authDomain: 'diary-f8127.firebaseapp.com',
  databaseURL: 'https://diary-f8127.firebaseio.com',
  projectId: 'diary-f8127',
  storageBucket: 'diary-f8127.appspot.com',
  messagingSenderId: '273281593934',
  appId: '1:273281593934:web:ec3d368ccf9b218aff891f',
  measurementId: 'G-K4ZN80VQV4',
};

if (!config.isServer) {
  firebase.initializeApp(firebaseConfig);
  if (!config.dev) {
    firebase.analytics();
  }
}

export default firebase;
