import "../style/css/cart.css";
import "../style/css/orderDownload.css";
import cart1 from "../images/cart/cart1.png";
import cart2 from "../images/cart/cart2.png";
import { Button } from "@material-ui/core";
import Featur from "../components/Featur";
import React, { useState,useEffect } from "react";

import { Link ,useParams} from "react-router-dom";
const OrderDownload = props => {

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({address:{}});
  const [total, setTotal] = useState(0);
  const [cart] = useState([
    {
      name: "Rising Like a Storm",
      author: "Tanaz Bhathena",
      image: cart1,
      price: 450,
      quantity: 1,
      total: 450,
    },
    {
      name: "Conflicts of Intrest",
      author: "Sunita Narain",
      image: cart2,
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
  useEffect(async () => { 
    
    fetch(apiBaseUrl +  `get_order/${id}`)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
            setProducts(result.data.order.books);
            setOrder(result.data.order);
          }
      });
    
 }, []);
  return (
    <div className="order__down container">
      <div className="order__down__content">
        <div className="order__down__product">
          <div className="order__down__head">
            <span className="order__down__round">
              <p>1</p>
            </span>
            <h5>Products</h5>
          </div>

          {/* <<<<<<<<<<< PRODUCT TABLE >>>>>>>>>>> */}
          <div className="cart__table">
            <table>
              <tr className="table__row">
                <th id="product__th">Product</th>
                <th id="price__th">Price</th>
                <th id="qty__th">Qty</th>
                <th id="total__th">Total</th>
              </tr>

              {products.map((data) => {
                return (
                  <tr>
                    <td>
                      <div className="cart__item">
                        <img src={data.featured_image_large} />
                        <div>
                          <h6>{data.title}</h6>
                          <p>{data.author_name}</p>
                        </div>
                      </div>
                    </td>
                    <td id="table__td">
                      <h6>
                        ₹<span>{data.offer_price}</span>{" "}
                      </h6>
                    </td>
                    <td id="table__td">
                      <h6>{data.with.quantity}</h6>
                    </td>
                    <td id="table__td">
                      <h6>
                        ₹<span>{data.with.quantity * data.offer_price}</span>
                      </h6>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>

        {/* <<<<<<<< ADDRESS >>>>>>>>>>>>>> */}

        <div className="order__down__address">
          <div className="order__down__head">
            <span className="order__down__round">
              <p>2</p>
            </span>
            <h5>Address</h5>
          </div>

          <div className="order__down__adress__box">
            <div className="order__down__adress__content">
              <h6>{order.address.name}</h6>
              <p>House No: {order.address.house_no},</p>
              <p> {order.address.street_addres1}</p>
              <p> {order.address.city}</p>
              <p> {order.address.state} </p>
              <p>{order.address.country}, {order.address.pincode}</p>
            </div>
          </div>
        </div>
        {/* <<<<<<<<< Amount Breakdown >>>>>>>> */}
        <div className="order__down__amount">
          <div className="order__down__head">
            <span className="order__down__round">
              <p>3</p>
            </span>
            <h5>Amount Breakdown</h5>
          </div>

          <div className="order__down__amount__box">
            <div className="order__down__amount__content">
              <div className="order__down__amount__row">
                <div className="order__down__amount__left">
                  <p>Sub Total :</p>
                </div>
                <div className="order__down__amount__right">
                  <p>₹ {order.total}</p>
                </div>
              </div>
              <div className="order__down__amount__row">
                <div className="order__down__amount__left">
                  <p>Shipping Charge :</p>
                </div>
                <div className="order__down__amount__right">
                  <p>₹ {order.shipping}</p>
                </div>
              </div>
              <div className="order__down__amount__row">
                <div className="order__down__amount__left">
                  <h6>TOTAL</h6>
                </div>
                <div className="order__down__amount__right">
                  <h5> {order.grand_total}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <<<<<<<<<<<<< STATUS >>>>>>>>>>>> */}

        <div className="order__down__status">
          <div className="order__down__head">
            <span className="order__down__round">
              <p>4</p>
            </span>
            <h5>Status ({order.payment_method})</h5>
          </div>

          <div className="order__down__status__box">
            <div className="order__down__status__content">
              {order.order_date && (<div className="order__down__status__row">
                <div className="order__down__status__left">
                  <p>{order.order_date}</p>
                </div>
                <div className="order__down__status__right">
                  <p>Order Received</p>
                </div>
              </div>)}
              {order.shipping_date && (<div className="order__down__status__row">
                <div className="order__down__status__left">
                  <p>{order.shipping_date}</p>
                </div>
                <div className="order__down__status__right">
                  <p>Shipped</p>
                </div>
              </div>)}
              {order.delivery_date && (<div className="order__down__status__row">
                <div className="order__down__status__left">
                  <p>18-12-2020</p>
                </div>
                <div className="order__down__status__right">
                  <p>{order.delivery_date}</p>
                </div>
              </div>)}
            </div>
          </div>
        </div>
        {/* <<<<<<<<<<<<< DOWNLOAD BUTTON >>>>>>>>>>>>>>> */}
        
      </div>

      <Featur />
    </div>
  );
}

export default OrderDownload;
