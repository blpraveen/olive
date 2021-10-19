import React, { useState ,useEffect} from "react";

import { } from "react-router-dom";
import  { Redirect,useParams } from 'react-router-dom';
import Featur from "../components/Featur";
import "../style/css/addAdress.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { UncontrolledAlert } from 'reactstrap';
import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { updateProfile ,logout,loadUser} from '../services/user/actions';
const AddAddress = props => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const { show } = useParams();
  const [isLoggedIn, seIsLoggedIn] = useState(false);
  const [address,setAddress] =useState([]);
  const [address_errors,setAddressErrors] =useState([]);
  const [isDelete,setIsDelete] =useState(false);
  const [hideAddress,setHideAddAddress] = useState(false);
  useEffect(async () => { 
    if(props.user  &&  props.user.token){
      if(props.user.address.length >= 2){
        setHideAddAddress(true);
      } 
      setAddress(props.user.address)
    } else {
       seIsLoggedIn(true);
    }
  },[props.user,isDelete]);
  function updateUser(user){
  const { updateProfile  } = props;
  updateProfile(user);
 }
  function deleteAddress(id){

    

      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+ props.user.token },
      body: JSON.stringify({})
    };
      fetch(apiBaseUrl + `delete_address/${id}`, requestOptions)
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
           data.address = user.address;
           data.offer_count = user.offer_count;
           data.country = user.country;
           data.image = user.profileImage;
           data.orders = user.orders;
           data.token = props.user.token;
          updateUser(data);
          setIsDelete(true)
          setHideAddAddress(false);
        } else {
          if(result.errors){
            let error_msg = [];
            for(let error in result.errors){
              console.log(result.errors[error][0]);
                error_msg.push(result.errors[error][0])
            }   
             
            setAddressErrors(error_msg);
          }
        }
      });

  }
  return (
    <div className=" container">
      {isLoggedIn && ( <Redirect to='/' />)}
      <div className="container1">
        <div className="path" style={{ marginLeft: "-10px" }}>
          <p>Home </p>
          <ArrowForwardIosIcon id="path__icon" />
          <p>Dashboard </p>
          <ArrowForwardIosIcon id="path__icon" />
          <p>Address</p>
        </div>
         {address_errors.map((data) => {
                  
                  return (
                    <UncontrolledAlert color="danger">
                      {data}!
                    </UncontrolledAlert>
                    );
                })}
        <div className="address__details">
          <Row>
          {address.map((data) => {
            return (
            <Col md>
              <div
                className="data-container"
                style={{
                  background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                }}
              >
                <div className="name-header">
                  <div className="name-container">
                    <p className="name">{data.name}</p>
                  </div>
                  <div className="icon-container">
                    <Link
                      to={'/editAdress/'+ data.id+'/0'}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        className="edit-icon"
                        src={process.env.PUBLIC_URL + "/images/edit_icon.png"}
                        alt="edit-icon"
                      />
                    </Link>

                    <a href="#">
                      <img
                        className="delete-icon"  onClick={() => deleteAddress( data.id)}
                        src={process.env.PUBLIC_URL + "/images/delete_icon.png"}
                        alt="delete-icon"
                      />
                    </a>
                    
                  </div>
                </div>
                <div className="data-box">
                  <p className="data">{data.house_no}</p>
                  <p className="data">{data.street_addres1}</p>
                  <p className="data">{data.street_addres2}</p>
                  <p className="data">{data.city}</p>
                  <p className="data">{data.state}</p>
                  <p className="data">{data.country},{data.pincode}</p>
                </div>
              </div>
            </Col>
            );
              })}
            {!hideAddress && (
              <Col md-add>
              <div
                className="add-container"
                style={{
                  background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                }}
              >
                <Link
                      to="/editAdress/0/0"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                  <img
                    className="add-image"
                    src={process.env.PUBLIC_URL + "/images/add.png"}
                    alt="add-icon"
                  />
                </Link>
                <p>ADD ADDRESS</p>
              </div>
            </Col>
              )}
            
          </Row>
        </div>
      </div>

      <Featur />
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
  { loadCart, updateCart, removeProduct, changeProductQuantity,updateProfile,logout,loadUser }
)(AddAddress);
