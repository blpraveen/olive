import "./../style/css/justArrived.css";

import placeholder from "../images/placeholder.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useState,useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import { connect } from 'react-redux';
import { Button } from "bootstrap";
import { ButtonGroup } from "@material-ui/core";
import { loadCart, removeProduct, changeProductQuantity,addProduct } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
  },
};
const JustArrived = props => {
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
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const [diableLinks, setDiableLinks] = useState(true);
  const [show, setShow] = useState(false);

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
  useEffect(async () => { 
    fetch(apiBaseUrl + 'recent_books')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.books.length){
            let bestSellerBook = [];
            result.data.books.map((book) => {
                let offerperc = Math.round((book.sale_price-book.offer_price)/book.sale_price *100);
                bestSellerBook.push({
                  id:book.id,
                  image: book.featured_image_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.offer_price,
                  price:book.sale_price,
                  offer_zone:book.offer_zone,
                  offerperc:offerperc,
                })
            });
            setArrived(bestSellerBook);
            
          } else {

          setArrived([]);
          }
        }  else {
          setArrived([]);
        }

        setDiableLinks(false);
      }); 
 }, []);
  return (
    <div className="arrived">
    <ToastContainer />
      <div className="arrived__head__row ">
        <h5>Just arrived</h5>
        <Link
          to="/justArrived"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <p>View all</p>
        </Link>
      </div>

      {/* CART ALERTS */}

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
                 
              
                
                 
                
       </Alert> :''  */}

      <div className="arrived__row">
        <Carousel
          swipeable={true}
          draggable={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          customTransition={"ease 1000ms"}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["mobile"]}
          centerMode={true}
          dotListClass="custom-dot-list-style"
          itemClass="popular__ani"
        >
          {arrived.map((data) => {
            return (
              <div className="arrived__item" style={diableLinks ? { pointerEvents: 'none' } : {}}>
                <Link
                  to={'/bookSingle/'+ data.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="arrived__item__off">
                     {(data.offerperc)? (<span>
                      <p>
                        {data.offerperc} % <br />
                        
                      </p>
                    </span>) : ''}
                    <img src={data.image} />
                  </div>

                  <div className="arrived__item__name">
                    <h6>{data.name}</h6>
                    <p>{data.author}</p>
                  </div>
                </Link>
                <div className="arrived__item__price">
                  <div className="arrived__item__price__left">
                    <p className="arrived__cut__price">₹{data.price}</p>
                    <p className="arrived__price">₹{data.cutPrice}</p>
                  </div>

                  <AddShoppingCartIcon
                    type="button"
                    onClick={() => addProduct(data)}
                    id="arrived___cart__icon"
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
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
)(JustArrived);
