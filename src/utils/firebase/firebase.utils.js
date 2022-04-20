import { initializeApp } from 'firebase/app';

import { 
  getAuth, 
  signInWithRedirect,
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
  } from 'firebase/auth';
  //observer listner is a way for us to hook into some kind of stream of events, whether these events are sign at events or sign out events
  //we're actually able to trigger something based on these changes

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB8uu1URGhmmSgIpAv8VSEJ__YaXTN3GFA",
  authDomain: "crwn-db-a5dbe.firebaseapp.com",
  projectId: "crwn-db-a5dbe",
  storageBucket: "crwn-db-a5dbe.appspot.com",
  messagingSenderId: "1004129026539",
  appId: "1:1004129026539:web:a66a810a1a81231e32d9ae"
};

const firebaseApp = initializeApp(firebaseConfig);

const goggleProvider = new GoogleAuthProvider();

goggleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, goggleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, goggleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }catch(error){
      console.log(error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
  //give back auth object
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
  //give back auth object
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

// what this obsever does is it returns you back whatever you get back from on/off state changed in our on/off state change to work, it takes two parameters
//첫번째 파라미터: auth
//두번째 파라미터: 콜백 함수 => auth state가 바뀔 때마다 실행됨