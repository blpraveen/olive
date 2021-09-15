import React, { useState ,useEffect} from "react";
import "../style/css/editAdress.css";
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { loginInit ,logout,loadUser} from '../services/user/actions';
import { UncontrolledAlert } from 'reactstrap';
const Login = props => {
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [login_errors, setLoginErrors] = useState([]);
const [showSuccess, setShowSuccess] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);
function addLogin(user){
  const { loginInit  } = props;
  loginInit(user);
 }
 useEffect(async () => { 
  if(props.user  &&  props.user.token){

    setIsLoggedIn(true);
  }
})
function LoginUser(){
  const data = {
          email: email,
          password: password,
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
          setIsLoggedIn(true);
        } else {
          if(result.errors){
            let error_msg = [];
            for(let error in result.errors){
              console.log(result.errors[error][0]);
                error_msg.push(result.errors[error][0])
            }   
            setLoginErrors(error_msg);
          }
      }
  });
}
	 return (


    <div className="container">
           {isLoggedIn && ( <Redirect to='/' />)}
      <div className="body">
        <div className="container7">
          <div className="title-container7">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <p className="address-title">Login</p>
              </div>
            </div>
          </div>

          {login_errors.map((data) => {
                  
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
          <div className="form-container7">
            <div className="details">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Email</p>
                    <input
                      className="in"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div className="form-container7">
            <div className="details">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Password</p>
                    <input
                      className="in"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <hr className="underline2" />

          <div className="btn-container">
            <div className="row">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <button className="cancel-btn">Cancel</button>
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <button className="save-btn"  onClick={() => LoginUser()}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
)(Login);