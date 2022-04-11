import { initializeApp } from 'firebase/app';

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'
// it allows us to retrieve documents inside of our firestore database
// it need to get a document instance
// when we want to access the data on those documents, we need to use getDoc and when we wanna set the data, we need setDoc

const firebaseConfig = {
  apiKey: "AIzaSyB8uu1URGhmmSgIpAv8VSEJ__YaXTN3GFA",
  authDomain: "crwn-db-a5dbe.firebaseapp.com",
  projectId: "crwn-db-a5dbe",
  storageBucket: "crwn-db-a5dbe.appspot.com",
  messagingSenderId: "1004129026539",
  appId: "1:1004129026539:web:a66a810a1a81231e32d9ae"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
//once we've instanciated our firestore, we can use it in order to access our database
//this singletone instance allows us now to tell firebase when we want to get a document or we want set a document or anything like that related to our database
//this is the database that we're going to pass because this directly points to our database

//this function will take data we're getting from the authentication servie and then we're going to store it inside of firestore

//1. we need to see if there is an existing document reference
// reference: this is a special type of object that firestore uses when talking about actual instance of document model
export const createUserDocumentFromAuth = async (userAuth) => {
  //database, collection, identifier
  const userDocRef = doc(db, 'users', userAuth.uid);
  //google automatically generate this collection(obj) for you
  //this obj(collection) represents some document reference in the database
  //the reason that google make it automatically is this reference points to some now unique point inside of the database
  //by giving us this reference, google wants us to use this specific document reference obj that they provided us in order to set data there
  //goggle is not made this yet, bu pointing
  //and then inside of tha user's collection is that specific userId
  //if we wanted to set the data, gooogle at least knows that i shoud set it inside of users for specific id

  //sanpshot: kinna dataㄴ = specific kind of object
  const userSnapshot = await getDoc(userDocRef)
  //userSnapshot.exists() => check whether it exist
  // true => 데이터 가져다줘 false=> 하나 만들어줘
  
  //if user data docs not exist => create a set the doc with the data from user Auth in my collection
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    //when user sign in
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    }catch(error){
      console.log(error.message)
    }
  }

  //if user data exists
  return userDocRef

  //return userDocRef
}