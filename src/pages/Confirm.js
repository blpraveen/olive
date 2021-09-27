import React, { useState ,useEffect,useCallback } from "react";
import Featur from "../components/Featur";
import "../style/css/confirm.css";
import { Link } from "react-router-dom";
import cart1 from "../images/cart/cart1.png";
import cart2 from "../images/cart/cart2.png";
import cart3 from "../images/cart/cart3.png";
import sample1 from "../images/cart/review.png";
import sample2 from "../images/cart/paulo.png";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { connect } from 'react-redux';
import { loginInit ,updateProfile,logout,loadUser} from '../services/user/actions';
import { loadCart, removeProduct, emptyCart,changeProductQuantity,addProduct } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import  displayRazorpay from '../components/displayRazorpay';
import { addPromo,removePromo,addPromoType } from '../services/promocode/actions';
import { UncontrolledAlert } from 'reactstrap';

import  { Redirect } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

const Confirm = props => {
const cartTotal = props.cartTotal; 
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [showSuccess, setShowSuccess] = useState(false);
const [login_errors, setLoginErrors] = useState([]);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [address,setAddress] =useState([]);
const [isDelete,setIsDelete] =useState(false);
const [address_errors,setAddressErrors] =useState([]);
const [hideAddress,setHideAddAddress] = useState(false);
const [shippingAddress,setShippingAddress] = useState(false);
const [appliedPromo,setAppliedPromo] = useState([]);
const [payment,setPayment] = useState("");
const [orderErrors,setOrderErrors] = useState([]);
const [shipping,setShipping] = useState(0);
const [orderConfirmed,setOrderConfirmed] = useState(false);
const [orderId,setOrderId] = useState(0);
const [showOfferRadio,setShowOfferRadio] = useState(0);
const [offerBook,setOfferBook] = useState(0);
const [payDetails,setPayDetails] = useState(0);
const [cartTot,setCartTot] = useState([]);
function updateUser(user){
  const { updateProfile  } = props;
  updateProfile(user);
 }
  function addLogin(user){
  const { loginInit  } = props;
  loginInit(user);
 }
  const [review] = useState([
    {
      name: "Rising Like a Storm ",
      author: "Tanaz Bhathena",
      image: sample1,
      price: 450,
      quantity: 1,
      total: 450,
    },
    {
      name: "Conflicts of Intrest",
      author: "Sunita Narain",
      image: sample2,
      price: 150,
      quantity: 2,
      total: 300,
    },
    {
      name: "Right Between the Ears",
      author: "Sandeep Dayal",
      image: cart2,
      price: 510,
      quantity: 1,
      total: 510,
    },
  ]);
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
  const paymentSuccess = useCallback((payment_response) => {
     let errors = [];
    if(payment == ''){
        errors.push("Payment option select");
    }
    if(shippingAddress == ''){
        errors.push("Select Shipping Address");
    }
    if(showOfferRadio){
      if(offerBook){

      } else {
        errors.push("Please select free book");
      }
    }
    if(errors.length){
        setOrderErrors(errors);
        return false;
    } else {
      setOrderErrors(errors);
    }

    let products = props.cartProducts;
    let promocodes = props.promocodes
    const data = {
          products: products,
            shipping: shippingAddress,
            payment: payment,
            promocodes: promocodes,
            offerBook:offerBook,
            payment_succes:1,
            payment_details:payment_response
      }
      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+ props.user.token },
      body: JSON.stringify(data)
    };
      fetch(apiBaseUrl + 'submit_order', requestOptions)
    .then(response => {
      return response.json();
    }).then(result => {
      if(result.status){
        const { addPromo, updateCart,updateProfile,emptyCart,addPromoType} = props;
        updateCart([]);
        addPromo([]);
        addPromoType([]);
        emptyCart([]);
        setOrderId(result.data.order.id)
        let user = result.data.user;
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
           data.token = props.user.token;
        updateProfile(data)
        setOrderConfirmed(true);
        setOrderErrors([result.message]);
      } else {
        if(result.errors){
            let error_msg = [];
            for(let error in result.errors){
              console.log(result.errors[error][0]);
                error_msg.push(result.errors[error][0])
            }   
            setOrderErrors(error_msg);
          } else {
            setOrderErrors(["Something went wrong please try after some time"]);
          }

      }
      });

  });
  function submitOrder(){
    let errors = [];
    if(payment == ''){
        errors.push("Payment option select");
    }
    if(shippingAddress == ''){
        errors.push("Select Shipping Address");
    }
    if(showOfferRadio){
      if(offerBook){

      } else {
        errors.push("Please select free book");
      }
    }
    if(errors.length){
        setOrderErrors(errors);
        return false;
    } else {
      setOrderErrors(errors);
    }

    let products = props.cartProducts;
    let promocodes = props.promocodes
    const data = {
          products: products,
            shipping: shippingAddress,
            payment: payment,
            promocodes: promocodes,
            offerBook:offerBook
      }
      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+ props.user.token },
      body: JSON.stringify(data)
    };
      fetch(apiBaseUrl + 'submit_order', requestOptions)
    .then(response => {
      return response.json();
    }).then(result => {
      if(result.status){
        const { addPromo, updateCart,updateProfile,emptyCart,addPromoType} = props;
        updateCart([]);
        addPromo([]);
        addPromoType([]);
        emptyCart([]);
        setOrderId(result.data.order.id)
        let user = result.data.user;
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
           data.token = props.user.token;
        updateProfile(data)
        setOrderConfirmed(true);
        setOrderErrors([result.message]);
      } else {
        if(result.errors){
            let error_msg = [];
            for(let error in result.errors){
              console.log(result.errors[error][0]);
                error_msg.push(result.errors[error][0])
            }   
            setOrderErrors(error_msg);
          } else {
            setOrderErrors(["Something went wrong please try after some time"]);
          }

      }
      });
  }
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
     document.body.appendChild(script);
   });
};


  useEffect(async () => { 
    
    loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if(offerBook){
        let products = props.cartProducts;
        let cartTotl = cartTotal;
        let totalPrice = 0
         for(let product in products){
              if(products[product].id ==offerBook){
                   totalPrice +=  products[product].cutPrice *( products[product].quantity-1);
                 
              } else {
                totalPrice +=  products[product].cutPrice * products[product].quantity;
              }

         }
         cartTotl.totalPrice = totalPrice;
          setCartTot(cartTotl);
          if(cartTotl.totalPrice < 750){
                  setShipping(50); 
          }
    } else {
      if(cartTotal.totalPrice < 750){
          setShipping(50);  
      }
      setCartTot(cartTotal)
    }
    if(props.promotype && props.promotype[0] == 'offerZone'){
        setShowOfferRadio(true);
    }
    if(props.promocodes){
      setAppliedPromo(props.promocodes);
    }
    if(props.user  &&  props.user.token){
      if(props.user.address.length >= 2){
        setHideAddAddress(true);
      } 
      setAddress(props.user.address)
      setIsLoggedIn(true);
    } else {
       setIsLoggedIn(false);
    }
    
  },[props.user,isDelete,shippingAddress,offerBook,payment])
  let products = props.cartProducts;
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
  function showRazorpay(){
    let errors = [];
    if(shippingAddress == ''){
        errors.push("Select Shipping Address");
    } 
    if(showOfferRadio){
      if(offerBook){

      } else {
        errors.push("Please select free book");
      }
    }
    if(errors.length){
        setOrderErrors(errors);
        return false;
    } else {
      setOrderErrors(errors);
    }
    const pay = {
      receipt:"Receipt No",
      amount: cartTot.totalPrice + shipping,
      currency: 'INR',
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pay)
    };
    fetch(apiBaseUrl + 'create_order',requestOptions)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          console.log(result);
          let data ={};
          data.id =result.data.order; 
          data.amount = cartTot.totalPrice + shipping; 
          data.email = props.user.email; 
          data.phone = props.user.phone; 
          data.name = props.user.name; 
          data.callback = paymentSuccess;
          displayRazorpay(data);
        } 
      }); 
  }
  return (
    <div className="container">
      <div className="fullbody">
      <div class="row">
      <div class="col-md-6">

      {orderConfirmed && ( <Redirect  to={'/orderConfirm/'+ orderId} />)}
      {orderErrors.map((data) => {
                  
                  return (
                    <UncontrolledAlert color="danger">
                      {data}!
                    </UncontrolledAlert>
                    );
                })}
        </div>
      </div>
      {!isLoggedIn && (
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
          )}
        <div className="total-container container">
          <div className="review-container">
            <div className="review-list">
              <img
                className="list-icon"
                src={process.env.PUBLIC_URL + "/images/list1.svg"}
                alt="list_icon"
              />
              <p className="review-title">Review Products</p>
            </div>
            <div className="cart__table">
              <table>
                <tr className="table__row">
                  <th id="product__th">Product</th>
                  <th id="price__th">Price</th>
                  <th id="qty__th">Qty</th>
                  <th id="total__th">Total</th>
                  {(showOfferRadio) ? (
                    <th id="total__th">Free Book</th>
                    ):''}
                </tr>

                {products.map((data) => {
                  return (
                    <tr>
                      <td id="cart__td">
                        <div className="cart__item">
                          <img src={data.image} />
                          <div className="cart__item__name">
                            <h6>{data.name}</h6>
                            <p>{data.author}</p>
                          </div>
                        </div>
                      </td>
                      <td id="table__td">
                        <h6>
                          ₹<span>{data.cutPrice}</span>{" "}
                        </h6>
                      </td>
                      <td id="table__td">
                        <h6>{data.quantity}</h6>
                      </td>
                      <td id="table__td">
                        <h6>
                          ₹<span>{data.cutPrice * data.quantity}</span>
                        </h6>
                      </td>
                      {(showOfferRadio) ? (
                        <td id="table__td">
                            {data.offer_zone && (
                              <input type="radio"
                                 value={data.id}
                      checked={offerBook}
                      onChange={(event) => setOfferBook(event.target.value)}
                                   />
                              )}
                        </td>
                      ):''}
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
          {isLoggedIn && (
            <div className="shipping-container">
            <div className="review-list">
              <img
                className="list-icon"
                src={process.env.PUBLIC_URL + "/images/list2.svg"}
                alt="list_icon"
              />
              <p className="review-title">Shipping Address</p>
            </div>
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
                      to={'/editAdress/'+ data.id}
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
                    <a href="#">
                     <input
                      type="radio"
                      value={data.id}
                      checked={shippingAddress}
                      onChange={(event) => setShippingAddress(event.target.value)}
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
                      to="/editAdress/0"
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
            )}
          

          <div className="amount-container">
            <div className="review-list">
              <img
                className="list-icon"
                src={process.env.PUBLIC_URL + "/images/list3.svg"}
                alt="list_icon"
              />
              <p className="review-title">Amount Breakdown</p>
            </div>
            <div class="row">
            {appliedPromo.map((data,index) =>{
                    return (
                  <span class="btn btn-success mb-2" style={{width:"150px"}}>{data} <CloseIcon
                          type="button"
                          onClick={() => removePromo(data)}
                          id="best___cart__icon"
                        /></span>
                      );
                    })}
            </div>
            <div className="all-amount">
              
              <div className="amount-title1">

                <p className="amount-title2">Sub Total :</p>
                <p className="amount-title2">Shipping Charge :</p>
                <p className="amount-total1">TOTAL</p>
              </div>
              <div className="amount-price1">
                <p className="amount-price2">₹ { cartTot.totalPrice}</p>
                <p className="amount-price2">₹ {shipping}</p>
                <p className="amount-total2">₹ { cartTot.totalPrice + shipping}</p>
              </div>
            </div>
          </div>
{isLoggedIn && (
          <>
          <div className="payment-container">
            <div className="review-list">
              <img
                className="list-icon"
                src={process.env.PUBLIC_URL + "/images/list4.svg"}
                alt="list_icon"
              />
              <p className="review-title">Payment Mode</p>
            </div>
            <div className="radio-container">
              <input type="radio" name="mode" id="cod" value="cod" onChange={(event) => setPayment(event.target.value)}></input>
              <label for="cod">Cash On delivery</label>
              <br></br>

              <input type="radio" name="mode" id="online" value="online" onChange={(event) => setPayment(event.target.value)}></input>
              <label for="online">Online</label>
            </div>
            <div>
                {(payment=='online') ?(<button  onClick={showRazorpay} class="btn btn-info">
                  Pay Now
                </button>):''}
            </div>
          </div>

          <div className="confirmbtn-container">
 
              <button className="confirm-btn" type="button" onClick={() => submitOrder()}>
                CONFIRM
              </button>
          </div></>)}
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
  promocodes:state.promocodes.promocodes,
  promotype:state.promocodes.promoType,
});

export default connect(
  mapStateToProps,
  { loadCart, updateCart,addPromo,addPromoType, removePromo,removeProduct,emptyCart, changeProductQuantity,loginInit,logout,updateProfile,loadUser}
)(Confirm);
