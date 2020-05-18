import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBk532DVzF_COJlgYSTnQ13auL964V0po0",
  authDomain: "nba-app-c83aa.firebaseapp.com",
  databaseURL: "https://nba-app-c83aa.firebaseio.com",
  projectId: "nba-app-c83aa",
  storageBucket: "nba-app-c83aa.appspot.com",
  messagingSenderId: "368883105837",
  appId: "1:368883105837:web:051b6ce73780af8d6138a4",
  measurementId: "G-J1CYW3XNRG",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();




const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); //google props
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export default firebase;
