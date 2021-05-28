import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAYVgqtWf4TKF1aZvYdkVdQeFXPjyQAch0",
    authDomain: "crwn-db-723f8.firebaseapp.com",
    projectId: "crwn-db-723f8",
    storageBucket: "crwn-db-723f8.appspot.com",
    messagingSenderId: "467321245030",
    appId: "1:467321245030:web:0c1833f3fca05ee73d0ca7",
    measurementId: "G-FPPXS2EE4H"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createAt,
          ...additionalData
        })
      } catch (error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters ({prompt: 'select_account'});
  
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;