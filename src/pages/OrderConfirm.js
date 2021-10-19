import React, { useState,useEffect } from "react";

import Featur from "../components/Featur";
import "../style/css/orderConfirm.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import placeholder from "../images/placeholder.png";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

import { connect } from 'react-redux';

import { loadCart, removeProduct, changeProductQuantity,addProduct} from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { updateBookMark } from '../services/bookmark/actions';

import { Link ,useParams} from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderConfirm = props => {

  const { id } = useParams();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [orderNumber, setOrderNumner] = useState(false);
  const [bookMark, setBookMark] = useState({});
  const [userName, setUserName] = useState('');
  const [arrived, setArrived] = useState([
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
      offerperc:0,
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
      offerperc:0,
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
      offerperc:0,
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
      offerperc:0,
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
      offerperc:0,
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
      offerperc:0,
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
      offerperc:0,
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
      offerperc:0,
    },
  ]);
  function addBookMark(data) {
    const { updateBookMark } = props;
    let bookmarks = props.bookmarks;

    if(bookMark[data.id]){
    bookmarks.forEach((cp,index) => {
        if (cp === data.id) {
          bookmarks.slice(index,1);
        }
      });
    } else {
      if(props.bookmarks){
        bookmarks.push(data.id);
      } else {
        bookmarks = [];
        bookmarks.push(data.id);
      }
    }
    updateBookMark(bookmarks);
    if(bookMark[data.id]){
        bookMark[data.id] = ! bookMark[data.id];
    } else {
         bookMark[data.id] = true;
    }
    setBookMark(bookMark);
   var title = data.name;
    var url = window.location.href;
    
    if(window.sidebar && window.sidebar.addPanel){
        /* Mozilla Firefox Bookmark - works with opening in a side panel only � */
        window.sidebar.addPanel(title, url, "");
        window.location.reload(false)
    }else if(window.opera && window.print) {
        /* Opera Hotlist */
        
        toast.info("Press Control + D to bookmark");
        window.location.reload(false)
        return true;
    }else if(window.external){
        /* IE Favorite */
        try{
            window.external.AddFavorite(url, title);
            window.location.reload(false)
        }catch(e){
                       
        toast.info("Press Control + D to bookmark");
                        window.location.reload(false)
                }            
    }else{
        /* Other */
        
        toast.info("Press Control + D to bookmark");
        window.location.reload(false)
    }
    
  }
  useEffect(async () => { 
    let bookmarks = props.bookmarks;
    if(bookMark){
    bookmarks.forEach((cp,index) => {
        bookMark[cp] = true;
      });
    }
     setBookMark(bookMark);
     console.log(bookMark);
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
    <ToastContainer />
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
                      {bookMark[data.id]}
                        <BookmarkBorderIcon
                           onClick={() => addBookMark(data)}
                          id="confirm__book__mark__icon "
                          className={bookMark[data.id] ? "bookMark" : "book__bookmark__icon"}
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
