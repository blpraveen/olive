import "../style/css/offerZone.css";
import "../style/css/categories.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import offer from "../images/offer.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";

import placeholder from "../images/placeholder.png";
import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";
import { useState,useEffect,useCallback } from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import FilterSearch from "../components/FilterSearch";
import Pagination from "react-js-pagination";

import { loadCart, removeProduct, changeProductQuantity,addProduct } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { connect } from 'react-redux';

const OfferZone = props => {

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [active_page , setActivePage] = useState(1);
  const [total_items , settotalItems] = useState(0);
  const [books_count , setBookCount] = useState(0);
  const [show, setShow] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [booksCount, setBooksCount] = useState(0);
  const [offerCount, setOfferCount] = useState(0);

  const [diableLinks, setDiableLinks] = useState(true);
  const [books,setBooks] = useState([
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
    if(props.user.offer_count){
      setOfferCount(5-props.user.offer_count);  
    }
    
    fetch(apiBaseUrl + `offer_zone_books`+`?page=${active_page}`)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          setBookCount(result.books_count);
          settotalItems(result.books_count);
          if(result.data.books.length){
            let allbooks = [];
            setBooksCount(result.data.books_count);
            result.data.books.map((book) => {
                
                allbooks.push({
                  id:book.id,
                  image: book.featured_image_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.offer_price,
                  price:book.sale_price,
                })
            });
            setBooks(allbooks);
            
          } else {
            setBooks([])
          }
          
        } else {
           setBooks([])
        }

         setDiableLinks(false);
      }); 
 }, [active_page]);
  const searchCategory = useCallback((search) => {
  const data = {
          search: search,
           
      }
      const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data)
    };
      fetch(apiBaseUrl + `category/search/0`, requestOptions)
    .then(response => {
      return response.json();
    }).then(result => {
       if(result.status){
          setBookCount(result.books_count);
          if(result.data.books.length){
            let catBook = [];

            result.data.books.map((book) => {
                
                catBook.push({
                  id:book.id,
                  image: book.featured_image_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.offer_price,
                  price:book.sale_price,
                  offer_zone:book.offer_zone,
                })
            });
            setBooks(catBook);
            
          } else {
            setBooks([])
          }
          
        }  else {
           setBooks([])
        }

         setDiableLinks(false);
      });
});
const filterCategory = useCallback((filter) => {
     
    const data = {
          filter: filter,
           
      }
      const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data)
    };
      fetch(apiBaseUrl + `category/filter/0`, requestOptions)
    .then(response => {
      return response.json();
    }).then(result => {
       if(result.status){
          setBookCount(result.books_count);
          if(result.data.books.length){
            let catBook = [];

            result.data.books.map((book) => {
                
                catBook.push({
                  id:book.id,
                  image: book.featured_image_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.offer_price,
                  price:book.sale_price,
                  offer_zone:book.offer_zone,
                })
            });
            setBooks(catBook);
            
          } else {
            setBooks([])
          }
          
        }  else {
           setBooks([])
        }

         setDiableLinks(false);
      });

  });
  return (
    <div className="offer__zone container">
    <ToastContainer />
      <div className="path ">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Home </p>
        </Link>
        <ArrowForwardIosIcon id="path__icon" />
        <Link
          to="/offerZone"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>Offerszone</p>
        </Link>
      </div>

      <div className="categories__content">
        <Row>
          <FilterSearch params={{data:filterCategory,search:searchCategory}}/>

          {/* Categries right Column */}
          <Col md="10">
            <div className="categories__right">
              <div className="offer__image__div">
                <img className="col-12 col-md-10" src={offer} />

                <p>
                  You are <span>{offerCount}</span> books away from this offer{" "}
                </p>

                {/*  if not logd in */}
                {/* <p>Please login to view your parchase histor</p> */}
                {/* if eligaible for offer */}
                {/* <p>Congrates you are elgiable for this offer</p> */}
              </div>

              <div className="offerzone__head__row ">
                <h5>Offerzone</h5>

                <p>{booksCount} Books</p>
              </div>
            </div>

            {/* <<<<<<<< LOGIN ALERT >>>>>>>>>> */}

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
            <Row>
              {books.map((data) => {
                return (
                  <Col xs="6" sm="4" md="2">
                    <div className="book__item" style={diableLinks ? { pointerEvents: 'none' } : {}}>
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
          </Col>
        </Row>
      </div>

      <PopularList />
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
  user:state.user.profile
});

export default connect(
  mapStateToProps,
   { loadCart, updateCart, removeProduct, changeProductQuantity }
)(OfferZone);
