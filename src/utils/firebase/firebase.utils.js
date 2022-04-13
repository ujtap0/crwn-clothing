import { initializeApp } from 'firebase/app';

import { 
  getAuth, 
  signInWithRedirect,
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword
  } from 'firebase/auth';

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

  console.log(userDocRef)

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