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
import pop1 from "../images/popular/pop1.jpg";
import pop2 from "../images/popular/pop2.jpg";
import pop3 from "../images/popular/pop3.jpg";
import pop4 from "../images/popular/pop4.jpg";
import pop6 from "../images/popular/pop6.jpg";
import pop8 from "../images/popular/pop8.jpg";
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


const Cancellation = props => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [show, setShow] = useState(false);
  const [catgory_name , setCategoryName] = useState(false);
  const [active_page , setActivePage] = useState(1);
  const [total_items , settotalItems] = useState(0);
  const [category_count , setCategoryCount] = useState(0);
  const [openFilter, setOpenFilter] = useState(false);
  const [categories,setCategories] =useState([]);
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


  useEffect(async () => { 
   fetch(apiBaseUrl + 'categories')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.categories.length){
            let category_list = [];
            result.data.categories.map((category) => {
                category_list.push({
                  label: category.name,
                  value: category.id,
                  image: category.featured_image_large,
                  count: category.books_count,
                })
            });
            setCategoryCount(category_list.length);
            setCategories(category_list);
            
          }
        } 
      }); 
     
 }, [active_page]);
  return (
    <div className="categories container">
    <ToastContainer />
      <div className="path ">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <p>Home </p>
        </Link>

      </div>

      <div className="categories__content">
        <Row>
          {/* <<<<<<<<<<<<<<< FILTER SEARCH >>>>>>>>>>>>>>>>>>> */}

          {/* Categries right Column */}
          <Col lg="10">
            <div className="categories__right">
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

            <h1>Cancellation</h1>
<p>If the buyer fails to receive an item shipped on account of providing a partial or wrong shipping address or non-availability of the buyer at the address provided or failure to make required payment at the time of delivery, the Transaction will be canceled and the item will be returned to the seller and the Company. Subsequently, the seller will be entitled to recover reasonable compensation for services provided and costs incurred for shipping, handling, couriering, processing your order and any other services provided to you.</p>
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
)(Cancellation);
