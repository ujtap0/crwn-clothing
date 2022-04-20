import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
//context => actural storage things itself
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: ()=>null
})

//provider is actual component = this is literal function component
//UserContex.provider wrap around any other component that need access to the values inside
//provider receive the value, which is going to hold the actual contextual value

//this provider is that this is provider is essentially allowing any of its child components to access the values inside of its user state
//so we want to be able to call currentUser, setCurrentUser anywhere inside of the component tree which is nested within this actual provider value

export const UserProvider=({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = {currentUser, setCurrentUser};

  //i'm going to instantiate some function, but give it a empty dependency array => it means that we wanna run this function only once when the component mount
  useEffect(()=>{
    //onAuthStateChange의 두번째 파라미터에 전달해줄 fn
    // this thing is a permanently open listener
    // you can imagine this as if somebody is standing there and trying to listen for changes to this auth state => whenever it does, it will run this function
    // the problem with this is that you actuallly need to get rid of it, i.e.(that is = 즉) tell it to stop listening whenever this component unmount
    //if you don't, then this is something of a memory leak
    // because if this component unmount, we don't need this listener anymore
    // this function give us a handy way to do so => it returns us back a function that while unsubscribe. that is, stop listening
    //the reason why we get it back from our function is because, we are really just returning back from our function, whatever we get back from auth stage change, this function gives the function that gives us back that unsubscribe function
    const unsubscribe = onAuthStateChangedListener((user)=>{
      //the user that gets passed through is either going to be an authenticated use object or it's going to be null
      if(user){
        createUserDocumentFromAuth(user)
        //we're centralizing out auth, but maybe it's a user that's brand new when they sign in with google. but maybe it's a user that already exists
      }
      setCurrentUser(user);
    })
    //with useEffect with this callback, it will run whatever you return from this callback when it announced

    //app이 실행되면 userProvider이 마운트 됨
    //user provider is going to instantiate this first callback on mount

    //로그인 된 상태에서 새로고침하면 app이 초기화되고 navigation에 있는 signout은 signin으로 바뀜(context도 초기화 되기 때문)
    //그런데 파이어베이스에서는 로그인된 유저가 있다고 user객체를 보냄
    //the reason why this is happening is because the authentication singleton that we have from our firebase utils
    // firebase utils에서 getAuth로 받은 객체?함수?가 어떤 플랫폼이든지 keep tracking한다.유저가 로그인된 상태인지 로그아웃 했는지
    //그래서 새로고침해도 유저가 로그인했는지 안했는지 알 수 있음
    //sign out되려면 유저가 수동적으로 sign out을 실행해야 됨
    // the moment that this listner mounts it will check the authentication state automatically when you initialize the listner
    return unsubscribe
  },[])

  return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
}