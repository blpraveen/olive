import React, { useState,useEffect } from "react";

import Featur from "../components/Featur";
import "../style/css/orderConfirm.css";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import { connect } from 'react-redux';

import { loadCart, removeProduct, changeProductQuantity,addProduct} from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { updateBookMark } from '../services/bookmark/actions';

import { Link ,useParams} from "react-router-dom";

const OrderConfirm = props => {

  const { id } = useParams();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [orderNumber, setOrderNumner] = useState(false);
  const [userName, setUserName] = useState('');
  const [arrived, setArrived] = useState([
    {
      image: best1,
      name: "My family",
      author: "Mahadevi Varma  ",
      cutPrice: "654",
      price: "456",
    },
    {
      image: best2,
      name: "That night",
      author: "Nidhi Updhyay",
      cutPrice: "123",
      price: "321",
    },
    {
      image: best3,
      name: "The family firm",
      author: "Emily Oster",
      cutPrice: "777",
      price: "765",
    },
    {
      image: best4,
      name: "The best couple ever",
      author: "The best couple ever",
      cutPrice: "321",
      price: "321",
    },
    {
      image: best1,
      name: "My family",
      author: "Mahadevi Varma",
      cutPrice: "654",
      price: "456",
    },
    {
      image: best2,
      name: "That night",
      author: "Nidhi Updhyay",
      cutPrice: "123",
      price: "321",
    },
  ]);
  function addBookMark(id) {
    const { updateBookMark } = props;
    /*let bookmarks = props.bookmarks;
    if(bookMark){
    bookmarks.forEach((cp,index) => {
        if (cp === id) {
          bookmarks.slice(index,1);
        }
      });
    } else {
      if(props.bookmarks){
        bookmarks.push(id);
      } else {
        bookmarks = [];
        bookmarks.push(id);
      }
    }
    updateBookMark(bookmarks);*/
  }
  useEffect(async () => { 
    
    fetch(apiBaseUrl +  `get_order/${id}`)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
            setOrderNumner(result.data.order.order_number);
            setUserName(result.data.order.customer_name)
          }
      });
    fetch(apiBaseUrl + 'recent_books')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.books.length){
            let bestSellerBook = [];
            result.data.books.map((book) => {
                let bookmark = false
                if(props.bookmarks.includes(parseInt(book.id))){
                  bookmark = true;
                 }
                bestSellerBook.push({
                  id:book.id,
                  image: book.featured_image_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.sale_price,
                  price:book.offer_price,
                  bookmark:bookmark,
                })
            });
            setArrived(bestSellerBook);
            
          }
        } 
      }); 
 }, []);
  return (
    <div className="container">
      <div className="body">
        <div className="container9 container">
          <div className="confirm-container">
            <img
              className="confirm-img col-12"
              src={process.env.PUBLIC_URL + "/images/order-confirm.svg"}
              alt="confirm-image"
            />
            <p className="thanks">Thanks</p>
            <p className="confirmed">
              Your Order <span>Confirmed</span>!
            </p>
            <p className="con-message">
              We've received your order no : {orderNumber} and we well contact you as soon as your
              package is shipped. You can find your purchase information "My
              Account""
            </p>
          </div>
          <div className="confirm-middle">
            <p className="check-name">
              Hey <span>{userName}</span>,
            </p>
            <p className="check-text">
              meanwhile check this recommendations. Handcrafted for you
            </p>
          </div>

          <Container className="confirm__book__container">
            <Row>
              {arrived.map((data) => {
                return (
                  <Col xs="6" sm="6" md="4">
                    <div className="confirm__book__item">
                      <img src={data.image} />

                      <div className="confirm__item__name">
                        <h6>{data.name}</h6>
                        <p>{data.author}</p>
                      </div>
                      <div className="confirm__item__bookmark">
                        <BookmarkBorderIcon
                           onClick={() => addBookMark(data.id)}
                          id="confirm__book__mark__icon"
                          className={data.bookMark ? "bookMark" : "book__bookmark__icon"}
                        />
                        <h5 >ADD TO BOOKMARK</h5>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Container>
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
  bookmarks:state.bookmarks.bookmarks,
});

export default connect(
  mapStateToProps,
  { loadCart, updateCart, removeProduct, changeProductQuantity,updateBookMark }
)(OrderConfirm);
