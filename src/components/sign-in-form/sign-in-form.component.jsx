import { useState } from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

//this user context object is going to give use back whatever value is passes in for the value
//the value if object and we pass currentUser, setCurrentUser 
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password} = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
 
  const signInWithGoggle = async() =>{
    await signInWithGooglePopup();
    //firebase Auth give back accessToken
    //response.user => access token & uid
    //uid: unique id identifier that we get with this obj
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
      await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields();
    }catch(error){
      switch(error.code){
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break;
        default:
          console.log(error)
      }
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    //name is idenifier which formFields need to update
    setFormFields({...formFields,[name]: value})
    //spread all of the fields, and then we're going to update the appropriate field by using object notation[]
    //name에 displayname이 들어왔으면 객체의 key값 중 displayname에 vlaue를 업데이트
  }

  return(
    <div className="sign-up-container">
      <h2>계정이 있으신가요?</h2>
      <span>이메일과 비밀번호로 로그인</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Email" 
          type='email'
          onChange={handleChange}
          name="email"
          required
          value={email}
        />

        <FormInput
          label="Password"
          type='password'
          onChange={handleChange}
          name="password" 
          required
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button 
            type='button'
            onClick={signInWithGoggle}
            buttonType='google'
          >
          Google sign In
          </Button>

        </div>
      </form>
    </div>
    
  )
}
export default SignInForm;