import React, { useState ,useEffect} from "react";

import  { Redirect } from 'react-router-dom';
import Featur from "../components/Featur";
import "../style/css/dashboard.css";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { loginInit ,logout,loadUser} from '../services/user/actions';
const Dashboard = props => {
  
const [isLoggedIn, seIsLoggedIn] = useState(false);
  useEffect(async () => { 
    if(props.user  &&  props.user.token){
  
     
    } else {
       seIsLoggedIn(true);
    }
  })
  return (
    <div className="container">
       {isLoggedIn && ( <Redirect to='/' />)}
      <div className="body">
        <div className="dashboard-container ">
          <div className="path ">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <p>Home </p>
            </Link>
            <ArrowForwardIosIcon id="path__icon" />
            <Link
              to="dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <p>Dashboard</p>
            </Link>
          </div>
          <div className="dashboard-title">
            <p>DASHBOARD</p>
          </div>
          <div className="box-container">
            <div className="row">
              <Row>
                <Col md>
                  <Link
                    to="/allOrder"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="dashboard-box"
                      style={{
                        background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                      }}
                    >
                      <p>My Orders</p>
                      <img
                        className="dashboard-img1"
                        src={process.env.PUBLIC_URL + "/images/imoji01.svg"}
                        alt="my order"
                      />
                    </div>
                  </Link>
                </Col>
                <Col md>
                  <Link
                    to="/bookMark"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="dashboard-box"
                      style={{
                        background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                      }}
                    >
                      <p>Bookmark</p>
                      <img
                        className="dashboard-img2"
                        src={process.env.PUBLIC_URL + "/images/imoji02.svg"}
                        alt="bookmark"
                      />
                    </div>
                  </Link>
                </Col>
                <Col md>
                  <Link
                    to="/addAddress"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="dashboard-box"
                      style={{
                        background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                      }}
                    >
                      <p>Address</p>
                      <img
                        className="dashboard-img3"
                        src={process.env.PUBLIC_URL + "/images/imoji03.svg"}
                        alt="address"
                      />
                    </div>
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col md>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="dashboard-box"
                      style={{
                        background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                      }}
                    >
                      <p>Profile</p>
                      <img
                        className="dashboard-img4"
                        src={process.env.PUBLIC_URL + "/images/imoji04.svg"}
                        alt="profile"
                      />
                    </div>
                  </Link>
                </Col>
                <Col md>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="dashboard-box"
                      style={{
                        background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                      }}
                    >
                      <p>Support</p>
                      <img
                        className="dashboard-img5"
                        src={process.env.PUBLIC_URL + "/images/imoji05.svg"}
                        alt="support"
                      />
                    </div>
                  </Link>
                </Col>
                <Col md>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      className="dashboard-box"
                      style={{
                        background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                      }}
                    >
                      <p>Password</p>
                      <img
                        className="dashboard-img6"
                        src={process.env.PUBLIC_URL + "/images/imoji06.svg"}
                        alt="password"
                      />
                    </div>
                  </Link>
                </Col>
              </Row>
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
  { loadCart, updateCart, removeProduct, changeProductQuantity,loginInit,logout,loadUser }
)(Dashboard);
