import React, { useState,useEffect  } from "react";
import "../style/css/header.css";
import logo from "../images/logo.png";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Collapse from "react-bootstrap/Collapse";
import { Link, NavLink } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import "./signup.css";
import "./login.css";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MenuSharpIcon from "@material-ui/icons/MenuSharp";
import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { loginInit ,logout,loadUser} from '../services/user/actions';
import { loadCategory } from '../services/categories/actions';
import { UncontrolledAlert } from 'reactstrap';
import Autocomplete from './Autocomplete';
import {
 LoginSocialFacebook,
 LoginSocialGoogle
} from "reactjs-social-login";
// import Fade from 'react-bootstrap/Fade'
const Header = props => {

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();

  const nameRef = React.useRef();
  const emailRef = React.useRef();
  const passRef = React.useRef();
  const [user, setUser] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [signup_errors, setSignUpErrors] = useState([]);
  const [login_errors, setLoginErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginupModal] = useState(false);
  const [searchText,setSearchText] = useState('');
  const [searchCategory,setSearchCategory] = useState('');
  const [categories,setCategories] =useState([]);
  const customStyles = {
  option: (provided, state) => ({
    ...provided,
   font: 'normal normal normal 12px/14px DM Sans',
   fontFamily: "'DM Sans', sans-serif",
   letterSpacing: '0px',
   color: '#1C2633',
    opacity:'0.49',
    margin: 'auto',
    marginLeft: '20px',
    width:'300px'
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
  })
}
  const checkActive = (match, location) => {
    //some additional logic to verify you are in the home URI
    if (!location) return false;
    const { pathname } = location;
    console.log(pathname);
    return pathname === "/";
  };
  function searchProduct(){
       const data = {
            category: searchText,
            search: searchCategory
        };
        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch(apiBaseUrl + 'search', requestOptions)
      .then(response => {
        return response.json();
      }).then(result => {})
  }
  function registerUser(){

     const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
        };

        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch(apiBaseUrl + 'register', requestOptions)
      .then(response => {
        return response.json();
      }).then(result => {
          if(result.status){

            setShowSuccess(true);
            passRef.current.value ='';
             emailRef.current.value = '';
              nameRef.current.value = '';
              setTimeout(function(e){
                  setShowLoginupModal(true);
                  setShowSignupModal(false);
                  setShowSuccess(false);
              },3000);
          } else {
              if(result.errors){
                let error_msg = [];
                for(let error in result.errors){
                    error_msg.push(result.errors[error][0])
                }   
                setSignUpErrors(error_msg);
              }
          }
    });

  }
  function fillForm(data,type){
    if(type==1){
      const access_token = data.data.access_token
      fetch('https://www.googleapis.com/oauth2/v3/userinfo?access_token='+access_token)
      .then(response => {
        return response.json();
      }).then(result => {
         const data = {
            name: result.name ,
            email: result.email,
            id: result.sub,
            type:1,
        };

        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
        fetch(apiBaseUrl + 'login', requestOptions)
      .then(response => {
        return response.json();
      }).then(result => {
          if(result.status){
            let user = result.data;
            let data = {};
             data.name= user.name;
             if(user.gender){
                data.gender = user.gender;
             } else {
              data.gender = ''
             }
             data.email = user.email
             if(user.dob){
                data.dob = user.dob;
             } else {
              data.dob = ''
             }
             if(user.type){
              data.type = user.type;
             } else {
              data.type = ''
             }
             data.address = user.address;
             data.offer_count = user.offer_count;
             data.image = user.profileImage;
             data.orders = user.orders;
            data.token= result.token;
            addLogin(data);
            setUser(true);
            usernameRef.current.value ='';
             passwordRef.current.value = '';              
             setTimeout(function(e){
                  setShowLoginupModal(false);
                  setShowSignupModal(false);
              },3000);
          } else {
              if(result.errors){
                let error_msg = [];
                for(let error in result.errors){
                  console.log(result.errors[error][0]);
                    error_msg.push(result.errors[error][0])
                }   
                setLoginErrors(error_msg);
              } else {
                 setLoginErrors(["Login Credentials are wrong!."]);
              }
          }
    });
      });
    }
     if(type==2){
        const data_req = {
            name: data.name ,
            email: data.email,
            id: data.id,
            type:2,
        };

        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data_req)
    };
        fetch(apiBaseUrl + 'login', requestOptions)
      .then(response => {
        return response.json();
      }).then(result => {
          if(result.status){
            let user = result.data;
            let data = {};
             data.name= user.name;
             if(user.gender){
                data.gender = user.gender;
             } else {
              data.gender = ''
             }
             data.email = user.email
             if(user.dob){
                data.dob = user.dob;
             } else {
              data.dob = ''
             }
             if(user.type){
              data.type = user.type;
             } else {
              data.type = ''
             }
             data.address = user.address;
             data.offer_count = user.offer_count;
             data.image = user.profileImage;
             data.orders = user.orders;
            data.token= result.token;
            addLogin(data);
            setUser(true);
            usernameRef.current.value ='';
             passwordRef.current.value = '';              
             setTimeout(function(e){
                  setShowLoginupModal(false);
                  setShowSignupModal(false);
              },3000);
          } else {
              if(result.errors){
                let error_msg = [];
                for(let error in result.errors){
                  console.log(result.errors[error][0]);
                    error_msg.push(result.errors[error][0])
                }   
                setLoginErrors(error_msg);
              } else {
                 setLoginErrors(["Login Credentials are wrong!."]);
              }
          }
    });
     }  

  }
   useEffect(async () => { 
    if(props.user  &&  props.user.token){

      setUser(true);
    }
    
  },[props.user])
   function checkLogin(){
      if(props.user && props.user.token){
        const { logout  } = props;
        let user = props.user;
          user = {};
          logout(user);
          setUser(false);
      } else {
          setShowLoginupModal(true);
      }
   }
   function addLogin(user){
    const { loginInit  } = props;
    loginInit(user);
   }
  function LoginUser(){
    const data = {
            email: usernameRef.current.value,
            password: passwordRef.current.value,
        };

        const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
        fetch(apiBaseUrl + 'login', requestOptions)
      .then(response => {
        return response.json();
      }).then(result => {
          if(result.status){
            let user = result.data;
            let data = {};
             data.name= user.name;
             if(user.gender){
                data.gender = user.gender;
             } else {
              data.gender = ''
             }
             data.email = user.email
             if(user.dob){
                data.dob = user.dob;
             } else {
              data.dob = ''
             }
             if(user.type){
              data.type = user.type;
             } else {
              data.type = ''
             }
             data.address = user.address;
             data.offer_count = user.offer_count;
             data.image = user.profileImage;
             data.orders = user.orders;
            data.token= result.token;
            addLogin(data);
            setUser(true);
            usernameRef.current.value ='';
             passwordRef.current.value = '';              
             setTimeout(function(e){
                  setShowLoginupModal(false);
                  setShowSignupModal(false);
              },3000);
          } else {
              if(result.errors){
                let error_msg = [];
                for(let error in result.errors){
                  console.log(result.errors[error][0]);
                    error_msg.push(result.errors[error][0])
                }   
                setLoginErrors(error_msg);
              } else {
                 setLoginErrors(["Login Credentials are wrong!."]);
              }
          }
    });
  }
  return (
    <div className="header">
      <div className="header__section__one ">
        <div className="  header_first__row container">
          <div className="  header_first__row__div">
            <MenuSharpIcon
              onClick={() => setOpen(!open)}
              id="header__list__icon"
            />

            <div className="header__logo__div ">
              <div className="logo__input">
                <Link to="/" id="logo__link">
                  <img className="header__logo " src={logo} alt="logo" />
                </Link>

                
                <div className="header__input__div">

                
                 
                  <Autocomplete suggestions={[]}/>
                  
                    <span className="header__serach__span" onClick={() => searchProduct()}>
                      <SearchIcon  />
                    </span>
                </div>
              </div>
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="shoppinCart__icon__div">
                  <div id="shoppinCart__span">2</div>
                  <ShoppingCartOutlinedIcon id="shoppinCart__icon" />
                </div>
              </Link>
            </div>

            <div className="header_first__row__right ">
              <div className="header__login">
                <PermIdentityIcon
                  onClick={() => setShowLoginupModal(true)}
                  
                  id="login__icon"
                />
                <div
                  className="header__login__div"
                  
                >
                  <h6 onClick={() => checkLogin()}>{user ? "Sign Out" : "Sign In"} </h6>
                  {user && (<h5><Link
                  to="/dashboard"  style={{ textDecoration: "none", color: "inherit" }}>My Account</Link></h5>)}
                </div>
              </div>

              <div className="header__login">
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ShoppingCartOutlinedIcon id="login__icon" />
                </Link>

                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="header__login__div">
                    <h6>My Cart</h6>
                    <h5>{props.cartTotal.productQuantity} Items</h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__second__row ">
        <div className="navbars container">
          <div className="nav__items">
            <NavLink
              strict
              to="/"
              isActive={checkActive}
              activeClassName="nav__active"
              id="navLink"
            >
              <h5>Home</h5>
            </NavLink>
            <NavLink
              strict
              to="/categories"
              activeClassName="nav__active"
              id="navLink"
            >
              <h5>Categories</h5>
            </NavLink>
            <NavLink to="/preorder" activeClassName="nav__active" id="navLink">
              <h5>Pre-order</h5>
            </NavLink>
            <NavLink to="/imprints" activeClassName="nav__active" id="navLink">
              <h5>IMPRINTs</h5>
            </NavLink>

            <NavLink to="/web_magazine" activeClassName="nav__active" id="navLink">
              <h5>Web magazine</h5>
            </NavLink>
            <NavLink to="/authors" activeClassName="nav__active" id="navLink">
              <h5>Authors List</h5>
            </NavLink>
            <NavLink to="/offerZone" activeClassName="nav__active" id="navLink">
              <h5>OFFERSZONE</h5>
            </NavLink>
          </div>
        </div>
      </div>


{/* <<<<<<<<<<<<<<<<<<< NAVBAR COLLAPSE >>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Collapse in={open}>
        <div className="navbar__collpase">
          <div className="collpse__first__row">
            <NavLink
              strict
              to="/"
              isActive={checkActive}
              activeClassName="nav__active__collapse"
              id="navLink"
              onClick={() => setOpen(!open)}
            >
              <h6>Home</h6>
            </NavLink>
            <div
              className="collpase__login"
              type="button"
              onClick={() => setOpen(!open)}
            >
              <PermIdentityIcon
                id="collpase__login__icon"
                onClick={() => setShowLoginupModal(true)}
              />
              <p>{user ? "Sign Out" : "Sign In"} </p>
            </div>
          </div>

          <NavLink
            strict
            to="/categories"
            activeClassName="nav__active__collapse"
            id="navLink"
            onClick={() => setOpen(!open)}
          >
            <h6>Categories</h6>
          </NavLink>
          <NavLink
            to="/preorder"
            activeClassName="nav__active__collapse"
            id="navLink"
            onClick={() => setOpen(!open)}
          >
            <h6>Pre-order</h6>
          </NavLink>
          <NavLink
            to="/error"
            id="navLink"
            activeClassName="nav__active__collapse"
            onClick={() => setOpen(!open)}
          >
            <h6>IMPRINTs</h6>
          </NavLink>

          <NavLink
            to="/error"
            id="navLink"
            activeClassName="nav__active__collapse"
            onClick={() => setOpen(!open)}
          >
            <h6>Web magazine</h6>
          </NavLink>
          <NavLink
            activeClassName="nav__active__collapse"
            to="/authors"
            activeClassName="nav__active__collapse"
            id="navLink"
            onClick={() => setOpen(!open)}
          >
            <h6>Authors List</h6>
          </NavLink>
          <NavLink
            to="/offerZone"
            activeClassName="nav__active__collapse"
            a
            id="navLink"
            onClick={() => setOpen(!open)}
          >
            <h6>OFFERSZONE</h6>
          </NavLink>
        </div>
      </Collapse>

      {/*<<<<<<<<<<<<<<<<<<<<<<<< SIGN UP MODAL >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        show={showSignupModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => setShowSignupModal(false)}
        ></Modal.Header>
        <Modal.Body id="signup-model">
          <div className="body">
            <div className="container2">
              <div className="left">
                <img
                  className="signup-img"
                  src={process.env.PUBLIC_URL + "/images/signup.png"}
                  alt="edit-icon"
                />
              </div>
              <div className="right">
                <img
                  className="logo-img2"
                  src={process.env.PUBLIC_URL + "/images/signup03.png"}
                  alt="edit-icon"
                />
                <div className="form-container">
                {signup_errors.map((data) => {
                  
            return (
              <UncontrolledAlert color="danger">
                {data}!
              </UncontrolledAlert>
              );
          })}
          {showSuccess && (
           <UncontrolledAlert color="success">
                Success!
              </UncontrolledAlert>)}

                  <input
                    className="input"
                    type="text"
                    placeholder="  Name"
                    name="name"
                    required="required"
                    ref={nameRef}
                  />
                  <br></br>
                  <input
                    className="input"
                    type="email"
                    placeholder="  Email ID"
                    name="email"
                    required="required"
                    ref={emailRef}
                  />
                  <br></br>
                  <input
                    className="input"
                    type="password"
                    placeholder="  Password"
                    name="password"
                    required="required"
                    ref={passRef}

                  />
                  <button className="signup-btn" type="button" onClick={() => registerUser()}>
                    SIGN UP
                  </button>
                </div>

                <div className="link-container">
                  <p className="have-account" type="button">
                    Already have an account ?{" "}
                    <span onClick={() => setShowSignupModal(false)}>
                      {" "}
                      <a onClick={() => setShowLoginupModal(true)}>LOGIN NOW</a>
                    </span>
                  </p>
                  <p className="or-with">Or Login With</p>
                  <div className="social-container">
                    <div className="icon-google">
                      <a href="#">
                        <img
                          className="social-icon"
                          src={process.env.PUBLIC_URL + "/images/google.png"}
                          alt="edit-icon"
                        />
                      </a>
                    </div>
                    <div className="icon-fb">
                      <a href="#">
                        <img
                          className="social-icon"
                          src={process.env.PUBLIC_URL + "/images/fb.png"}
                          alt="edit-icon"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* <<<<<<<<<<<<<< LOGIN MODAL >>>>>>>>>>>>>>>>>>>>>>> */}
      <Modal
        show={showLoginModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => setShowLoginupModal(false)}
        ></Modal.Header>
        <Modal.Body id="signup-model">
          <div className="body">
            <div className="container2">
              <div className="left">
                <img
                  className="signup-img"
                  src={process.env.PUBLIC_URL + "/images/signup.png"}
                  alt="edit-icon"
                />
              </div>
              <div className="right">
                <img
                  className="logo-img2"
                  src={process.env.PUBLIC_URL + "/images/signup04.png"}
                  alt="edit-icon"
                />
                <div className="text-containere">
                  <p className="login__text">
                    To review and adjust your security settings and get
                    recommendations to help you keep your
                  </p>
                </div>
                {login_errors.map((data) => {
                  
                  return (
                    <UncontrolledAlert color="danger">
                      {data}!
                    </UncontrolledAlert>
                    );
                })}
                <div className="form-container2">
                  <input
                    className="log-input"
                    type="email"
                    placeholder="  Email ID"
                    name="email"
                    ref={usernameRef}
                  />
                  <br></br>
                  <input
                    className="log-input"
                    type="password"
                    placeholder="  Password"
                    name="password"
                    ref={passwordRef}
                  />
                  <div className="btn-container">
                    <p>
                       <Link
                       onClick={() => setShowLoginupModal(false)}
          to="/forgot"
          style={{ textDecoration: "none", color: "inherit" }}
        >Forgot Password?</Link>
                    </p>

                      <button className="signin-btn" type="button" onClick={() => LoginUser()}>
                        LOGIN
                      </button>
                  </div>
                </div>

                <div className="link-container2">
                  <p className="have-account">
                    Don't have an account ?{" "}
                    <span onClick={() => setShowLoginupModal(false)}>
                      {" "}
                      <a type="button" onClick={() => setShowSignupModal(true)}>
                        SIGNUP NOW
                      </a>
                    </span>
                  </p>
                  <p className="or-with">Or Login With</p>
                  <div className="social-container">
                    <div className="icon-google">
                    <LoginSocialGoogle
                    client_secret={'3Afh9IL48vOHvbm5D-zbElpz'}
    client_id={'969924030334-96ht0eu69uf5jm824mn72cveippkji2h'}
    onResolve={({ data }) => {
     fillForm(data,1);
    }}
    onReject={(err) => alert(err)}
   >
    <img
                          className="social-icon"
                          src={process.env.PUBLIC_URL + "/images/google.png"}
                          alt="edit-icon"
                        />
   </LoginSocialGoogle>
                      
                    </div>
                    <div className="icon-fb">
                    <LoginSocialFacebook
    appId={'152254387026476'}
    onResolve={({ data }) => {
     fillForm(data,2);
    }}
    onReject={(err) => alert(err)}
   >
                    <img
                          className="social-icon"
                          src={process.env.PUBLIC_URL + "/images/fb.png"}
                          alt="edit-icon"
                        />
   </LoginSocialFacebook>

                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  productToChange: state.cart.productToChange,
  cartTotal: state.total.data,
  user:state.user.profile,
});

export default connect(
  mapStateToProps,
  { loadCart, updateCart, removeProduct, changeProductQuantity,loginInit,logout,loadUser }
)(Header);