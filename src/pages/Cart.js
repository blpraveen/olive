import "../style/css/cart.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import cart1 from "../images/cart/cart1.png";
import cart2 from "../images/cart/cart2.png";
import cart3 from "../images/cart/cart3.png";
import sample1 from "../images/cart/review.png";
import sample2 from "../images/cart/paulo.png";
import React, { useState ,useEffect,useRef} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button, ButtonBase } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import Featur from "../components/Featur";
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity,addProduct } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { addPromo,removePromo ,addPromoType} from '../services/promocode/actions';
const Cart = props => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [promoCode, setPromocode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [couponMessage, setCouponMessage] = useState([]);
  const [couponSuccessMessage, setCouponSuccessMessage] = useState([]);
  const [promo, setPromo] = useState('');
  const [appliedPromo,setAppliedPromo] = useState([]);
  const [shipping,setShipping] = useState(0);
  const [showPromoCode,setShowPromoCode] = useState(false);
  const [cart] = useState([
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
  function removePromo(promo) {
        const { addPromo , promocodes} = props;
        console.log(promo);
          let procode = promocodes;
          let newCode = [];
          if(procode){
            for(let item in procode){
              if(procode[item] == promo){
                procode.slice(item,1);
              } else {
                newCode.push(procode[item]);
              }
            }
            addPromo(newCode);
            setAppliedPromo(newCode);
          }
  }
  function scrollToBottom(){
     document.getElementById('footer').scrollIntoView();
  }
  function verifyPromo(){
    const { addPromo , promocodes,addPromoType} = props;
          let procod = promocodes;
          let existsPromo = false;
          if(promocodes){
            for(let item in promocodes){
              if(promocodes[item] == promo){
                existsPromo = true;
              }
            }
          }
          if(existsPromo){
              setCouponMessage(['Coupon already Added']);
              setTimeout(function(){
                    setCouponMessage([]);
                  },5000);
          } else {
          const data = {
                coupon: promo
            };
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+ props.user.token },
            body: JSON.stringify(data)
          };
            fetch(apiBaseUrl + 'verify_coupon', requestOptions)
          .then(response => {
            return response.json();
          }).then(result => {
            if(result.status){
                  if(result.data.type && result.data.type == 'offerZone'){
                      addPromoType(['offerZone']);
                  }
                  if(procod){
                    procod.push(promo);
                  }
                  setShowPromoCode(false);
                  addPromo(procod);
                  setAppliedPromo(procod);
                  setCouponSuccessMessage([result.message]);
                  setTimeout(function(){
                    setCouponSuccessMessage([]);
                  },5000);
               
            } else {
                setCouponMessage([result.message]);
                setTimeout(function(){
                    setCouponMessage([]);
                  },5000);
            }
          });  
        } 
  }
  function removeCartProduct (product){
    const { cartProducts, updateCart} = props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  }
  useEffect(async () => { 
     let cartTotal = props.cartTotal;
    if(props.promocodes && props.promocodes.length > 0){
      setShowPromoCode(false);
      setAppliedPromo(props.promocodes);
    } else {
      setShowPromoCode(true);
    }
    if(props.user  &&  props.user.token){
      setIsLoggedIn(true);
    } else {
       setIsLoggedIn(false);
    }

    if(cartTotal.totalPrice < 750){
        setShipping(50);  
    }
    
  },[props.cartTotal, props.user,showPromoCode,props.promocodes])
  //const products = [];
  let products = props.cartProducts;
  let cartTotal = props.cartTotal;
  return (
    <div className="cart container">
      <div className="path ">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Home </p>
        </Link>
        <ArrowForwardIosIcon id="path__icon" />
        <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Cart </p>
        </Link>
      </div>
      <div className="cart__content">
        <div className="cart__header">
          <h3>
            Your Cart <span>{products.length }</span> Items
          </h3>
        </div>
        <div className="float-cart__shelf-container">
            {!products.length && (
              <p className="shelf-empty">
                Add some books in the cart <br />
              </p>
            )}
          </div>
        {(products.length) ? (
        <div className="cart__table">
          <table>
            <tr className="table__row">
              <th id="product__th">Product</th>
              <th id="price__th">Price</th>
              <th id="qty__th">Qty</th>
              <th id="total__th">Total</th>
              <th id="total__th">Action</th>
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
                  <td id="table__td">
                   <DeleteIcon
                          type="button"
                          onClick={() => removeCartProduct(data)}
                          id="best___cart__icon"
                        />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        ) :''}
        {/* <<<<<<<<< TOTAL SECTOIN */}
        {(products.length) ? (
        <div className="total__section">
          <Container>
            <Row>
              <Col md="4"></Col>
              <Col id="total__col">
                <div className="cart__total">
                  <div className="total__row">
                    <h6>Sub Total :</h6>
                    <div className="total__row__right">
                      <h6>
                        ₹<span>{ cartTotal.totalPrice}</span>
                      </h6>
                    </div>
                  </div>
                  <div className="total__row">
                    <h6>Shipping Charge :</h6>
                    <div className="total__row__right">
                      <h6>
                        ₹<span>{shipping}</span>
                      </h6>
                    </div>
                  </div>
                  <div className="total__row">
                    <p>Amount to Pay :</p>
                    <div className="total__row__right">
                      <h5>
                        ₹<span>{ cartTotal.totalPrice + shipping}</span>
                      </h5>
                    </div>
                  </div>
                       
                 <div class="d-flex flex-column col-md-6">
                  {appliedPromo.map((data,index) =>{
                    return (
                  <span class="btn btn-success mb-2 ">{data} <CloseIcon
                          type="button"
                          onClick={() => removePromo(data)}
                          id="best___cart__icon"
                        /></span>
                      );
                    })}
                    </div>
                  {showPromoCode && (
                    <div className="promo__code">
                    <p onClick={() => setPromocode(!promoCode)} type="button">
                      Do you have a promo code ?
                    </p>
                    {isLoggedIn ? (promoCode ? (
                      <div className="promo__child">
                        <input placeholder="ENTER CODE" onChange={(event) => setPromo(event.target.value)}/>
                        <Button id="promo__apply__button" onClick={() => verifyPromo() }>APPLY</Button>
                      </div>
                    ) : (
                      ""
                    )) : ( 'Please login to redeem coupon codes') }
                    {couponMessage.map((data) => { 
                      return (
                        <p class="alert alert-danger mt-2 text-decoration-none">{data}</p>
                      );
                    })}
                    {couponSuccessMessage.map((data) => { 
                      return (
                        <p class="alert alert-success mt-2 text-decoration-none">{data}</p>
                      );
                    })}
                    
                  </div>)}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        ):''}
        {(products.length) ? (
        <div className="cart__order">
          <Row>
            <Col id="button__col" sm>
              <button id="help__button" onClick={scrollToBottom}  >Get Help</button>
            </Col>
            <Col id="button__col" sm>
              <Link
                to="/confirm"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Button id="order__button">ORDER NOW</Button>
              </Link>
            </Col>
          </Row>
        </div>
        ):''}
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
});

export default connect(
  mapStateToProps,
  { loadCart, updateCart,addPromo,addPromoType, removePromo,removeProduct, changeProductQuantity }
)(Cart);
