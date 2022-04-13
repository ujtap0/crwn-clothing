import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.styles.scss'

const defaultFormFields = {
  dispalyName: '',
  email: '',
  password: '',
  confirmPassword: ''
}


const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {displayName, email, password, confirmPassword} = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password !== confirmPassword){
      alert('패스워드가 일치하지 않습니다');
      return
    }
    try{
      const {user} = createAuthUserWithEmailAndPassword(
        email, 
        password)
        //authentication은 이메일과 비밀번호만 쓰이고
        //displayname같은 경우는 데이터 베이스에 저장해야 함
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    }catch(error){
      if(error.code === 'auth/email-already-in-use'){
        alert('이미 가입되어 있는 계정입니다')
      }else{
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
      <h2>계정이 없으면</h2>
      <span>이메일과 비밀번호로 회원가입</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type='text' 
          onChange={handleChange}
          name="displayName"
          required
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type='password'
          onChange={handleChange}
          name="confirmPassword" 
          required
          value={confirmPassword}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
    
  )
}
export default SignUpForm;