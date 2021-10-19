import "../style/css/bookMark.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import  { Redirect,useParams } from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";

import placeholder from "../images/placeholder.png";
import { useState,useEffect} from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

import Featur from "../components/Featur";
import bookmark from "../images/bookmark/bookmark.png";

import UsePagination from "../components/Pagination";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import { updateBookMark } from '../services/bookmark/actions';

import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity,addProduct } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import Pagination from "react-js-pagination";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookMark = props => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const [isLoggedIn, seIsLoggedIn] = useState(false);
  const [show, setShow] = useState(false);
  const [active_page , setActivePage] = useState(1);

  const [total_items , settotalItems] = useState(0);
  const [books_count , setBookCount] = useState(0);
  const [markedBook,setMarkedBook] = useState([
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
    },
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "",
    },
  ]);
  function addProduct (product){
    const { cartProducts, updateCart } = props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += 1;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      product.quantity = 1;
      cartProducts.push(product);
    }
    updateCart(cartProducts);
    toast.info(product.name + " added to cart !");
    
  };
  function handlePageChange (pageNumber) {
    setActivePage(pageNumber);
  }
  useEffect(async () => { 
    let bookmarks;
    if(props.user  &&  props.user.token){
      bookmarks = props.bookmarks;
      bookmarks= bookmarks.filter(function(val) { return val !== null; });
    } else {
         seIsLoggedIn(true);
    }
    
    if(bookmarks){
    const data = {
          book_ids: bookmarks
        }
      const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization': 'Bearer '+ props.user.token },
      body: JSON.stringify(data)
    };
      fetch(apiBaseUrl + `book_marks_all`+`?page=${active_page}`, requestOptions)
    .then(response => {
      return response.json();
    }).then(result => {if(result.data.books.length){
            let markBook = [];

            result.data.books.map((book) => {
                        
                  setBookCount(result.books_count);
                  settotalItems(result.books_count);
                markBook.push({
                  id:book.id,
                  image: book.featured_image_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.offer_price,
                  price:book.sale_price,
                })
            });
            setMarkedBook(markBook);
            
          } else {
            setMarkedBook([])
          }});
    } 
  },[props.user,props.bookmarks,active_page]);
  return (
    <div className="bookmark container">
    <ToastContainer />
     {isLoggedIn && ( <Redirect to='/' />)}
      <div className="path">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Dashboard </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>My bookmarks</p>
      </div>

      <div className="bookmark__header">
        <h2>My Bookmarks</h2>
        <div className="bookmark__img">
          <img className="col-12" src={bookmark} />
        </div>
      </div>

      {/* <<<<<<<< CART ADDED ALERT >>>>>>>>>> */}
      {show ? (
        <Alert variant="success" id="alert">
          <CheckCircleIcon id="alert__success__icon" />

          <div className="alert__success__text">
            <p>Product added to your cart</p>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <h6>CHECKOUT NOW</h6>
            </Link>
          </div>

          <CloseIcon
            type="button"
            onClick={() => setShow(false)}
            id="alert__close__icon"
          />
        </Alert>
      ) : (
        ""
      )}

      {/* <<<<<<<< LOGIN ALERT >>>>>>>>>> */}

      {/* {show ? 
                 <Alert variant="primary" id='login__alert'>
                  
                 
                   <InfoIcon id='alert__success__icon'/>
                   
                 
                 <p>Please Login</p>
            
                 <h6 type='button' onClick={()=>setShow(false)}>OK</h6>
                 
              
               
                 </Alert> :''} */}

      {/* <<<<<<<<< WRONG ALERT >>>>>>>>> */}
      {/* {show? 
                 <Alert variant="danger" id='danger__alert'>
                  
                 
                   <CheckCircleIcon id='alert__success__icon'/>
                   
               
                 <p>Somthing went wrong</p>
               
                 <h6 type='button' onClick={()=>setShow(false)} >Refresh</h6>
                 
              
                
                 
                
                 </Alert> :''
              }  */}
      <div className="bookmark__content">
        <Container>
          <Row>
            {markedBook.map((data) => {
              return (
                <Col xs="6" sm="3" md="2">
                  <div className="book__item">
                    <Link
                          to={'/bookSingle/'+ data.id}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img src={data.image} />
                        </Link>
                         <Link
                          to={'/bookSingle/'+ data.id}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                    <div className="book__item__name">
                      <h6>{data.name}</h6>
                      <p>{data.author}</p>
                    </div>
                    </Link>
                    <div className="book__item__price__div">
                      <div className="book__item__price__left">
                        <p className="book__item__cut__price">
                          ₹{data.cutPrice}
                        </p>
                        <p className="book__item__price">₹{data.price}</p>
                      </div>

                      <AddShoppingCartIcon
                        type="button"
                        onClick={() => addProduct(data)}
                        id="book__item___cart__icon"
                      />
                    </div>
                  </div>
                </Col>
              );
            })}
            <div className="pagination__div">
             <Pagination
                  activePage={active_page}
                  itemsCountPerPage={10}
                  totalItemsCount={total_items}
                  pageRangeDisplayed={5}
                  prevPageText ='previous'
                  lastPageText ='next'
                  innerClass='makeStyles-ul-1'
                  onChange={(e)=>handlePageChange(e)}
                />
            </div>
          </Row>
        </Container>
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
  bookmarks:state.bookmarks.bookmarks,
});

export default connect(
  mapStateToProps,
  { loadCart,updateCart,removeProduct, changeProductQuantity,updateBookMark}
)(BookMark);
