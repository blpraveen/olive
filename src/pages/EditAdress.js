import React, { useState ,useEffect} from "react";

import  { Redirect } from 'react-router-dom';
import Featur from "../components/Featur";
import "../style/css/editAdress.css";
import { useParams} from "react-router-dom";
import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { updateProfile ,logout,loadUser} from '../services/user/actions';
import { UncontrolledAlert } from 'reactstrap';
const EditAddress = props => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [isLoggedIn, seIsLoggedIn] = useState(false);
  const [succesRedirect, setSuccesRedirect] = useState(false);
  
  const { id,show } = useParams();
  const [address_errors, setAddessErrors] = useState([]);
  function updateUser(user){
  const { updateProfile  } = props;

  updateProfile(user);
 }
 useEffect(async () => { 
    
    if(props.user  &&  props.user.token){
      if(id > 0 ){
        props.user.address.map((data) => {
            if(data.id == id){
                  setEmail(data.email);
                  setPhone(data.phone);
                  setPin(data.pincode);
                  setState(data.state);
                  setDistrict(data.district);
                  setCountry(data.country);
                  setTown(data.city);
                  setAddressLine(data.street_addres2);
                  setAddress(data.street_addres1);
                  setHouseNo(data.house_no);
                  setName(data.name);
                  setType(data.type);
            }
        })
      }
    } else {
       seIsLoggedIn(true);
    }
  },[ props.user])
  function saveAddress(){

  const data = {
          name: name,
            house_no: house,
            street_addres1: address,
            street_addres2: address_line,
            city: town,
            state: state,
            district:district,
            pincode: pin,
            phone: phone,
            email: email,
            type: type,
            country:country,
      };
      if(id > 0 ){
          data.id = id;
      }
      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+ props.user.token },
      body: JSON.stringify(data)
    };
      fetch(apiBaseUrl + 'store_address', requestOptions)
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
           data.country = user.country;
           data.image = user.profileImage;
           data.orders = user.orders;
           data.token = props.user.token;
          updateUser(data);
          setSuccesRedirect(true);
          console.log(show);
        } else {
          let error_msg = [];
          if(result.errors){
            
            for(let error in result.errors){
              console.log(result.errors[error][0]);
                error_msg.push(result.errors[error][0])
            }   

          }
          if(result.error){
              for(let err in result.error){
                  error_msg.push(result.error[err])
              }
             }
            setAddessErrors(error_msg);
        }
      });
}

  const [name, setName] = useState("");
  const [house, setHouseNo] = useState("");
  const [address, setAddress] = useState("");
  const [address_line, setAddressLine] = useState("");
  const [addresstwo, setAddresstwo] = useState("");
  const [town, setTown] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");
  return (
    <div className="container">
         {isLoggedIn && ( <Redirect to='/' />)}
         {succesRedirect && !show  && ( <Redirect to='/addAddress' />)}
         {succesRedirect && show  && ( <Redirect to='/confirm' />)}
      <div className="body">
        <div className="container7">
          <div className="title-container7">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                {id > 0 && ( <p className="address-title">Edit Address</p>)}
                {id == 0 && ( <p className="address-title">Add Address</p>)}
                <hr className="underline1"></hr>
              </div>
            </div>
                
          </div>
          {address_errors.map((data) => {
                  
                  return (
                    <UncontrolledAlert color="danger">
                      {data}!
                    </UncontrolledAlert>
                    );
                })}
          <div className="form-container7 mt-5">
            <div className="details">
              <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="input-container">
                  <p className="label">Full Name <span style={{color:'red'}}>*</span></p>
                  <input
                    className="in"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div className="input-container">
                  <p className="label">House / Office No</p>
                  <input
                    className="in"
                    type="text"
                    name="house"
                    value={house}
                    onChange={(event) => setHouseNo(event.target.value)}
                  />
                </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Street Address</p>
                    <input
                      className="in"
                      type="text"
                      name="address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Street Address 2</p>
                     <input
                      className="in"
                      type="text"
                      name="address_line"
                      value={address_line}
                      onChange={(event) => setAddressLine(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Town / City</p>
                    <input
                      className="in"
                      type="text"
                      name="town"
                      value={town}
                      onChange={(event) => setTown(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">District</p>
                    <input
                      className="in"
                      type="text"
                      name="district"
                      value={district}
                      onChange={(event) => setDistrict(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">State</p>
                    <input
                      className="in"
                      type="text"
                      name="state"
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Pin code <span style={{color:'red'}}>*</span></p>
                    <input
                      className="in"
                      type="text"
                      name="pin"
                      value={pin}
                      onChange={(event) => setPin(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Phone <span style={{color:'red'}}>*</span></p>
                    <input
                      className="in"
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Email <span style={{color:'red'}}>*</span></p>
                    <input
                      className="in"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Country <span style={{color:'red'}}>*</span></p>
                     <input
                      className="in"
                      type="text"
                      name="country"
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                    />
                    
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                  <div className="input-container">
                    <p className="label">Shipping/Billing <span style={{color:'red'}}>*</span></p>
                    <select className="in" name="type" value={type} onChange={(event) => setType(event.target.value)} required>
                      <option value="">Select Address Type</option>
                      <option value="Shipping" >Shipping Address</option>
                      <option value="Billing" >Billing Address</option>
                    </select>
                    
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
                <button className="save-btn"  onClick={() => saveAddress()}>Save</button>
              </div>
            </div>
          </div>
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
)(EditAddress);
