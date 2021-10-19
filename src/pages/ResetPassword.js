import React, { useState ,useEffect} from "react";
import "../style/css/editAdress.css";
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { loginInit ,logout,loadUser} from '../services/user/actions';
import { Link, NavLink,useParams } from "react-router-dom";
import { UncontrolledAlert } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = props => {
  const { token } = useParams();
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [login_errors, setLoginErrors] = useState([]);
const [showSuccess, setShowSuccess] = useState(false);
const [showForm, setShowForm] = useState(false);
const [isLoggedIn, setIsLoggedIn] = useState(false);


const [isSent, setIsSent] = useState(false);
function addLogin(user){
  const { loginInit  } = props;
  loginInit(user);
 }
 useEffect(async () => { 
  if(props.user  &&  props.user.token){

    setIsLoggedIn(true);
  } else {
    const data = {
          token: token,
      };

      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
      fetch(apiBaseUrl + 'check_token', requestOptions)
    .then(response => {
      return response.json();
    }).then(result => {
        if(result.status){
              setEmail(result.data.email);
              setShowForm(true);
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
},[])
function ResetPassword(){
  const data = {
          email: email,
          password:password
      };

      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
      fetch(apiBaseUrl + 'reset', requestOptions)
    .then(response => {
      return response.json();
    }).then(result => {
        if(result.status){
          setTimeout(function(){setIsSent(true); }, 3000);
           toast.info("Password reset successfully !");
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
    <ToastContainer />
           {isLoggedIn && ( <Redirect to='/' />)}
            {isSent && ( <Redirect to='/login' />)}
      <div className="body">
        <div className="container7">
          <div className="title-container7">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <p className="address-title">Reset Password</p>
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
          {showForm && (

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
          </div>)}
          <hr className="underline2" />

          {showForm && ( <div className="btn-container">
            <div className="row">
              
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <button className="save-btn"  onClick={() => ResetPassword()}>Reset Password</button>
              </div>
              
            </div>
          </div>)}
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
)(ResetPassword);