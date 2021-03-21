import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAoSFfOeCf2Cr-ZiqDDdSMFh1PwKORbPcw",
    authDomain: "slack-clone-43fa6.firebaseapp.com",
    projectId: "slack-clone-43fa6",
    storageBucket: "slack-clone-43fa6.appspot.com",
    messagingSenderId: "760358441921",
    appId: "1:760358441921:web:574bd5f32ede60038b5540",
    measurementId: "G-5ZXZEV2G39"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };

