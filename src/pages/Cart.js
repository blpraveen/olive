import "../style/css/cart.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import cart1 from "../images/cart/cart1.png";
import cart2 from "../images/cart/cart2.png";
import cart3 from "../images/cart/cart3.png";
import sample1 from "../images/cart/review.png";
import sample2 from "../images/cart/paulo.png";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Button, ButtonBase } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Featur from "../components/Featur";
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity,addProduct } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
const Cart = props => {
  const [promoCode, setPromocode] = useState(false);
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
  function removeProduct (product){
    const { cartProducts, updateCart} = props;

    const index = cartProducts.findIndex(p => p.id === product.id);
    if (index >= 0) {
      cartProducts.splice(index, 1);
      updateCart(cartProducts);
    }
  };
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
        {products.length && (
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
                          onClick={() => removeProduct(data)}
                          id="best___cart__icon"
                        />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
        )}
        {/* <<<<<<<<< TOTAL SECTOIN */}
        {products.length && (
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
                    <h6>Tax (18%) :</h6>
                    <div className="total__row__right">
                      <h6>
                        ₹<span>225</span>
                      </h6>
                    </div>
                  </div>
                  <div className="total__row">
                    <h6>Shipping Charge :</h6>
                    <div className="total__row__right">
                      <h6>
                        ₹<span>25</span>
                      </h6>
                    </div>
                  </div>
                  <div className="total__row">
                    <p>Amount to Pay :</p>
                    <div className="total__row__right">
                      <h5>
                        ₹<span>1500</span>
                      </h5>
                    </div>
                  </div>

                  <div className="promo__code">
                    <p onClick={() => setPromocode(!promoCode)} type="button">
                      Do you have a promo code ?
                    </p>
                    {promoCode ? (
                      <div className="promo__child">
                        <input placeholder="ENTER CODE" />
                        <Button id="promo__apply__button">APPLY</Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        )}
        {products.length && (
        <div className="cart__order">
          <Row>
            <Col id="button__col" sm>
              <button id="help__button">Get Help</button>
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
        )}
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
  cartTotal: state.total.data
});

export default connect(
  mapStateToProps,
  { loadCart, updateCart, removeProduct, changeProductQuantity }
)(Cart);
