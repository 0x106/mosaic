const firebase = require('firebase');

var firebaseAppConfig = {
    apiKey: "AIzaSyBI9kkVq2jZNpTKjaX79BqgcepavI9wzQs",
    authDomain: "mosaic-portal.firebaseapp.com",
    databaseURL: "https://mosaic-portal.firebaseio.com",
    projectId: "mosaic-portal",
    storageBucket: "mosaic-portal.appspot.com",
    messagingSenderId: "958527622038"
};

firebase.initializeApp(firebaseAppConfig);

module.exports = firebase
