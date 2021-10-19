import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import book from "../images/book-read.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import { useState,useEffect ,useCallback} from "react";

import placeholder from "../images/placeholder.png";
import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link,useParams } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import FilterSearch from "../components/FilterSearch";
import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity,addProduct } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import Pagination from "react-js-pagination";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PreOrder = props => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [show, setShow] = useState(false);
  const [catgory_name , setCategoryName] = useState(false);
  const [active_page , setActivePage] = useState(1);
  const [total_items , settotalItems] = useState(0);
  const [books_count , setBookCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [diableLinks, setDiableLinks] = useState(true);
  const [categoryBook,setCategoryBook] = useState([
    {
      image: placeholder,
      name: "",
      author: " ",
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
      author: "r",
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
    console.log(cartProducts);
    updateCart(cartProducts);
    
    toast.info(product.name + " added to cart !");
    
  };
  function handlePageChange (pageNumber) {
    setActivePage(pageNumber);
  }
const searchCategory = useCallback((search) => {
  const data = {
          search: search,
           
      }
      const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data)
    };
      fetch(apiBaseUrl + `pre_order/search/`, requestOptions)
    .then(response => {
      return response.json();
    }).then(result => {
       if(result.status){
          setBookCount(result.books_count);
          settotalItems(result.books_count);
          setCategoryName(result.category);
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
            setCategoryBook(catBook);
            
          } else {
            setCategoryBook([])
          }
          setDiableLinks(false);
        } 
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
      fetch(apiBaseUrl + `pre_order/filter/`, requestOptions)
    .then(response => {
      return response.json();
    }).then(result => {
       if(result.status){
          setBookCount(result.books_count);
          settotalItems(result.books_count);
          setCategoryName(result.category);
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
            setCategoryBook(catBook);
            
          } else {
            setCategoryBook([])
          }
          
        } 

        setDiableLinks(false);
      });

  });

  useEffect(async () => { 
    fetch(apiBaseUrl + `pre_order`+`?page=${active_page}`)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          setBookCount(result.books_count);
          settotalItems(result.books_count);
          setCategoryName(result.category);
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
            setCategoryBook(catBook);
            
          } else {
            setCategoryBook([])
          }
          
        } 

          setDiableLinks(false);
      }); 
 }, [active_page]);
  return (
    <div className="categories container">
    <ToastContainer />
      <div className="path ">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Home </p>
        </Link>

        <ArrowForwardIosIcon id="path__icon" />
        <Link
          to="/categories"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>Categories </p>
        </Link>

        <ArrowForwardIosIcon id="path__icon" />
        <p> {catgory_name}</p>
      </div>

      <div className="categories__content">
        <Row>
          {/* <<<<<<<<<<<<<<< FILTER SEARCH >>>>>>>>>>>>>>>>>>> */}
          <FilterSearch params={{data:filterCategory,search:searchCategory}}/>

          {/* Categries right Column */}
          <Col lg="10">
            <div className="categories__right">
              <img id="categories__right__img" className="col-12" src={book} />

              <div className="categories__head__row ">
                <h5>{catgory_name}</h5>
                <p>{books_count} Books</p>
              </div>
              {/* </div> */}
              {/* CART ALERTS */}

              {/* {show ? 
                 <Alert variant="success" id='alert'>
                  
                 
                   <CheckCircleIcon id='alert__success__icon'/>
                   
                 <div className='alert__success__text'>
                 <p>Product added to your cart</p>
                 <Link to='/cart' style={{textDecoration:'none'}}>
                 <h6>CHECKOUT NOW</h6>
                 </Link>
              
                 </div>
                 
                 <CloseIcon type='button' onClick={()=>setShow(false)} id='alert__close__icon' />
                 </Alert> :''
              } */}

              {/* <<<<<<<< LOGIN ALERT >>>>>>>>>> */}

              {/* {show ? 
                 <Alert variant="primary" id='login__alert'>
                  
                 
                   <InfoIcon id='alert__success__icon'/>
                   
                 
                 <p>Please Login</p>
            
                 <h6 type='button' onClick={()=>setShow(false)}>OK</h6>
                 
              
               
                 </Alert> :''} */}

              {/* <<<<<<<<< WRONG ALERT >>>>>>>>> */}
              {show ? (
                <Alert variant="danger" id="danger__alert">
                  <CheckCircleIcon id="alert__success__icon" />

                  <p>Somthing went wrong</p>

                  <h6 type="button" onClick={() => setShow(false)}>
                    Refresh
                  </h6>
                </Alert>
              ) : (
                ""
              )}

              <Row>
                {categoryBook.map((data) => {
                  return (
                    <Col xs="6" sm="4" md="2">
                      <div className="book__item" style={diableLinks ? { pointerEvents: 'none' } : {}} >
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
            </div>
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
  cartTotal: state.total.data
});

export default connect(
  mapStateToProps,
  { loadCart, updateCart, removeProduct, changeProductQuantity }
)(PreOrder);
