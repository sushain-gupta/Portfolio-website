/*-------------------------------------------
            INTIALIZING FIREBASE
---------------------------------------------*/

// TODO: Replace the following with your app's Firebase project configuration.
const firebaseConfig = {
  // The value of `databaseURL` depends on the location of the database.
  databaseURL: "Databse URL goes here",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ref = firebase.database().ref();
