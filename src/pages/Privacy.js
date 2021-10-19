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


const Privacy = props => {
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

             <h1>
             Privacy Policy
             </h1>
             <h2>
             Who we are
             </h2>
              <p>Our website address is: https://olivebooks.in.</p>
             <h2>
             
                What personal data we collect and why we collect it
             </h2>
             <h2>
             Comments
             </h2>
             <p>
             By using the Website and/or by providing your information, you consent to the collection and use of such information disclosed by you on the Website by the Company. The personal information / data including but not limited to the Information You provide to the Website/ Online payment Facility during the course of a Transaction shall be treated as strictly confidential and retained in accordance with the Privacy Policy which is incorporated herein by reference and applicable laws and regulations including but not limited to Information Technology Act, 2000 and rules there under. The Company does not sell or rent or otherwise disclose your personal information to third parties for their marketing purposes without your explicit consent and the Company only uses your information in the manner described in the Privacy Policy. If you do not agree to your Information being transferred or used in this way please do not use the Website. The Company stores and processes the information provided by you in computers located in India that are protected by physical as well as reasonable technological security measures and procedures in compliance with the provisions of the Information Technology Act, 2000 and rules made there under.
             </p>
              <h2>
             Media
             </h2>
             <p>

If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.
             </p>
               <h2>
             Contact forms
             </h2>
             <h2>
             Cookies
             </h2>
             <p>

If you leave a comment on our site you may opt in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year.
             </p>
             <p>

If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.

             </p>
             <p>

When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login cookies will be removed.

             </p>
             <p>

If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.
             </p>
             <h2>

Embedded content from other websites
             </h2>
             <p>

Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.
             </p>
             <p>

These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.
             </p>
             <h2>

              Analytics
             </h2>
             <h2>

                Who we share your data with
             </h2>
             <h2>

How long we retain your data
             </h2>
             <p>

If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognise and approve any follow-up comments automatically instead of holding them in a moderation queue.
             </p>
             <p>

For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.
             </p>
             <p>

This website designed and developed by best it company in calicut mentegoz technologies

             </p>
             <h2>

What rights you have over your data
             </h2>
             <p>

If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.
             </p>
             <h2>

Where we send your data
             </h2>
             <p>

Visitor comments may be checked through an automated spam detection service.
             </p>

<h2>Your contact information</h2>
<h2>Additional information</h2>
<h2>How we protect your data</h2>
<h2>What data breach procedures we have in place</h2>
<h2>What third parties we receive data from</h2>
<h2>What automated decision making and/or profiling we do with user data</h2>
<h2>Industry regulatory disclosure requirements</h2>
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
)(Privacy);
