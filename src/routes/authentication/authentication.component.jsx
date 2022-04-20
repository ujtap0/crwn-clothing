// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss'

const Authentication = () => {
  //signIn이 된후 페이지로 되돌아 왔을 때 useEffect가 실행됨
  // useEffect(async ()=>{
  //   //auth: auth is helping us keep track of all these authentication states that are happening throughout the app wherever page is navigated
  //   //alghoug the user sign in through different means and methos, we need some way to be certain of what it is that the user has done. so auth is in chage of tracking authenticaion 
  //   const response = await getRedirectResult(auth)
  //   if(response){
  //     const userDocRef = await createUserDocumentFromAuth(response.user);
  //   }
  // },[])


  
  // const logGoogleRedirectUser = async() =>{
  //   const {user} = await signInWithGoogleRedirect();
  //   //다른 페이지로 이동하는 것이기 때문에 뒤에 적힌 코드는 실행되지 않음 => 팝업로그인과 달리 다른 방법으로 데이터를 뽑아내야 함
  // }

  return(
    <div className="authentication-container">
      <SignInForm/>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
      <SignUpForm />
    </div>
  )
}

export default Authentication;