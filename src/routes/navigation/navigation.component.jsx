import { Fragment, useContext } from "react"
import { Outlet,Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';
import { ReactComponent as  CrwnLogo} from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { CartContext } from "../../context/cart.context";
import { UserContext } from "../../context/user.context";


const Navigation = () => {
  const { currentUser } = useContext(UserContext)
  //sign in컴포넌트에서 setCurrentUser에 데이터를 패싱해주면 이 컴포넌트가 re-render됨
  //the reason why is because useContext as a hook tells this component whenever a value inside of this context updates re-render me
  //userContext에 있는 currentValue가 바뀔때마다 이 컴포넌트가 재평가 됨
  //useContext만 컴포넌트 안에서 불러오면 무조건 재평가
  //but it did not actually really render anything on the dom => nothing changed on the Dom=> this is where that virtual dom and the actual reconciliation steps
  //if we have multiple components that are all listening to a context, event though they don't use the actual values(we don't do anything with them)
  //the fact that you're hooked into the context will cuase react to rerun function
  // it doesn't mean that it will re-render anything to the dom, jsx values actually update based on this value(컨텍스트로 받은 value)
  //howevere, we still need to think about the fact that all of the code run until that return statement is still getting called
  //그래서 정말 많은 컴포넌트가 있으면 성능 이슈 생길 수 있음
  //-----------------------------------------------------------------
  // currentUSer가 빈obj가 아니면 signIn 대신 signUp보여주기
  //-----------------------------------------------------------------
  //signOutUser를 실행했으면 context에도 업데이트 해주기
  //-----------------------------------------------------------------
  const { isCartOpen } = useContext(CartContext)
  return(
    <Fragment>
      <div className='navigation'>
        <Link className={'logo-container'} to='/'>
          <CrwnLogo className="logo" />
        </Link>
        <div className={'nav-links-container'}>
          <Link className={'nav-link'} to='/shop'>
            SHOP
          </Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>
            ) : (
              <Link className={'nav-link'} to='/auth'>
                SIGN IN
              </Link>
            )
          }
          <CartIcon/>
        </div>
        {isCartOpen && <CartDropdown />}
        {/* component is always truthy value so if isCartOpen is true it return to you is goinf to be the last thing(component) */}
      </div>
      <Outlet />
    </Fragment>
  )
}
export default Navigation