import './button.styles.scss'

//three type of buttons
// default
// inveted
// google sign in
// 버튼 타입별로 css를 다르게 적용해줘야 함

const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted'
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return(
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default Button;