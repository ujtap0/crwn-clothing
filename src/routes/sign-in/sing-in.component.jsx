import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async() =>{
    const {user} = await signInWithGooglePopup();
    //firebase Auth give back accessToken
    //response.user => access token & uid
    //uid: unique id identifier that we get with this obj
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return(
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>
        Sign in with Google Popup
      </button>
    </div>
  )
}

export default SignIn;