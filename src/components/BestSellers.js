import "./../style/css/bestSellers.css";
import "./../style/css/justArrived.css";
import banner1 from "../images/best/banner1.png";
import banner2 from "../images/best/banner2.png";

import placeholder from "../images/placeholder.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState ,useEffect} from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity,addProduct } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

const BestSellers = props => {
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
  const [bestSeller, setbestSeller] = useState([
    {
      image: placeholder,
      name: " ",
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
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const [diableLinks, setDiableLinks] = useState(true);
  const [imageOne, setImageOne] = useState(banner2);
  const [imageTwo, setImageTwo] = useState(banner1);
  const [bestOne, setBestOne] = useState(0);
  const [bestTwo, setBestTwo] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(async () => { 
    fetch(apiBaseUrl + 'best_sellers')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.image_1){
            setImageOne(result.image_1);  
          }
          if(result.image_2){
              setImageTwo(result.image_2);
          }
          
          setBestOne(result.best_seller_1);
          setBestTwo(result.best_seller_2);
          if(result.data.books.length){
            let bestSellerBook = [];
            result.data.books.map((book) => {
                bestSellerBook.push({
                  id:book.id,
                  image: book.featured_image_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.sale_price,
                  price:book.offer_price,
                  offer_zone:book.offer_zone,
                })
            });
            setbestSeller(bestSellerBook);
            setbestSellerTwo(bestSellerBook);
            
          } else {
            setbestSeller([]);
            setbestSellerTwo([]);
          }
        } else {
          setbestSeller([]);
          setbestSellerTwo([]);
        }

        setDiableLinks(false);
      }); 
 },[]);
  

  const [bestSellerTwo, setbestSellerTwo] = useState([
    {
      image: placeholder,
      name: "",
      author: "",
      cutPrice: "",
      price: "  ",
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
  return (

    <div className="best__seller">
      <ToastContainer />
      <div className="best__seller__head__row ">
        <h5>Best Sellers</h5>
        <Link
          to="/bestSeller"
          style={{ textDecoration: "none", color: "inherit" }}>
          <p>View all</p>
        </Link>
      </div>

      <div className="best__seller__first__row">
        <Row>
          <Col>
            <div className="best__seller__banner">
              {(bestOne)? (   <Link to={'/bookSingle/'+bestOne}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img className="col-12" src={imageOne} />
                      </Link>) :
              (<img className="col-12" src={imageOne} />)
              }
            </div>
          </Col>
          <Col lg="8">
            <div className="best__seller__first__row__right">
              <Carousel
                swipeable={true}
                draggable={false}
                //   showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                keyBoardControl={true}
                // customTransition="all .5"
                // transitionDuration={2000}
                customTransition={"ease 1000ms"}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                centerMode={true}
                dotListClass="custom-dot-list-style"
                itemClass="popular__ani"  >
                {bestSeller.map((data) => {
                  return (
                    <div className="best__item" style={diableLinks ? { pointerEvents: 'none' } : {}}>
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
                        <div className="best__item__name">
                          <h6>{data.name}</h6>
                          <p>{data.author}</p>
                        </div>
                      </Link>

                      <div className="best__item__price">
                        <div className="best__item__price__left">
                          <p className="best__cut__price">₹{data.cutPrice}</p>
                          <p className="best__price">₹{data.price}</p>
                        </div>

                        <AddShoppingCartIcon
                          type="button"
                           onClick={() => addProduct(data)}
                          id="best___cart__icon"
                        />
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </Col>
        </Row>
      </div>

      {/*  SECOND ROW */}
      <div className="best__seller__first__row">
        <Row>
          <Col>
            <div className="best__seller__banner">
               {(bestTwo)? (  <Link  to={'/bookSingle/'+bestTwo}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <img className="col-12" src={imageTwo} />
                      </Link>) :
              (<img className="col-12" src={imageTwo} />)
              }
            </div>
          </Col>
          <Col lg="8">
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
            <div className="best__seller__first__row__right">
              <Carousel
                swipeable={true}
                draggable={false}
                //   showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                // autoPlaySpeed={1000}
                keyBoardControl={true}
                // customTransition="all .5"
                // transitionDuration={2000}
                customTransition={"ease 1000ms"}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["mobile"]}
                centerMode={true}
                dotListClass="custom-dot-list-style"
                itemClass="popular__ani"
              >
                {bestSellerTwo.map((data) => {
                  return (
                    <div className="best__item" style={diableLinks ? { pointerEvents: 'none' } : {}}>
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
                        <div className="best__item__name">
                          <h6>{data.name}</h6>
                          <p>{data.author}</p>
                        </div>
                      </Link>

                      <div className="best__item__price">
                        <div className="best__item__price__left">
                          <p className="best__cut__price">₹{data.cutPrice}</p>
                          <p className="best__price">₹{data.price}</p>
                        </div>

                        <AddShoppingCartIcon
                          type="button"
                           onClick={() => addProduct(data)}
                          id="best___cart__icon"
                        />
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </Col>
        </Row>
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
)(BestSellers);
