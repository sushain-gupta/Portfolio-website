/*-------------------------------------------
            INTIALIZING FIREBASE
---------------------------------------------*/

const firebaseConfig = {
  databaseURL: "https://sushains-portfolio-default-rtdb.firebaseio.com",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const ref = firebase.database().ref();
