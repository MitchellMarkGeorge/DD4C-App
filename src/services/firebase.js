import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDxBi6d2FvNaOjax4k4CAWknjUDfMhG00s",
    authDomain: "dd4c-88f01.firebaseapp.com",
    databaseURL: "https://dd4c-88f01-default-rtdb.firebaseio.com",
    projectId: "dd4c-88f01",
    storageBucket: "dd4c-88f01.appspot.com",
    messagingSenderId: "903253830258",
    appId: "1:903253830258:web:3ade2b780471b72222b0eb",
    measurementId: "G-XC33SNH5ZY"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export const auth = firebase.auth();
  export const db = firebase.database();