import "./../style/css/justArrived.css";
import pop1 from "../images/popular/pop1.jpg";
import pop2 from "../images/popular/pop2.jpg";
import pop3 from "../images/popular/pop3.jpg";
import pop4 from "../images/popular/pop4.jpg";
import pop6 from "../images/popular/pop6.jpg";
import pop8 from "../images/popular/pop8.jpg";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useState,useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import { Button } from "bootstrap";
import { ButtonGroup } from "@material-ui/core";
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
function JustArrived() {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [show, setShow] = useState(false);

  const [arrived, setArrived] = useState([
    {
      image: pop8,
      name: "Rising Like a Stome",
      author: "Tanaz Bhathena",
      cutPrice: "234",
      price: "165",
    },
    {
      image: pop1,
      name: "Sinbad and theTrump...",
      author: "Kevin Missal",
      cutPrice: "234",
      price: "157",
    },
    {
      image: pop8,
      name: "Rising Like a Stome",
      author: "Tanaz Bhathena",
      cutPrice: "234",
      price: "165",
    },
    {
      image: pop1,
      name: "Sinbad and theTrump...",
      author: "Kevin Missal",
      cutPrice: "234",
      price: "157",
    },
    {
      image: pop6,
      name: "Notes of AR Rahman",
      author: "Krishna Trilok",
      cutPrice: "675",
      price: "675",
    },
    {
      image: pop3,
      name: "1971 IAN cardoz",
      author: "Vivan Marwaha",
      cutPrice: "432",
      price: "321",
    },
    {
      image: pop2,
      name: "Hisila Yami",
      author: "Hisila Yami",
      cutPrice: "987",
      price: "879",
    },
    {
      image: pop4,
      name: "Conflicts of Interest",
      author: "Sunitha Narain",
      cutPrice: "432",
      price: "765",
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

                bestSellerBook.push({
                  id:book.id,
                  image: book.featured_image_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.offer_price,
                  price:book.sale_price,
                })
            });
            setArrived(bestSellerBook);
            
          }
        } 
      }); 
 }, []);
  return (
    <div className="arrived">
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
              <div className="arrived__item">
                <Link
                  to={'/bookSingle/'+ data.id}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="arrived__item__off">
                    <span>
                      <p>
                        25% <br />
                        off
                      </p>
                    </span>
                    <img src={data.image} />
                  </div>

                  <div className="arrived__item__name">
                    <h6>{data.name}</h6>
                    <p>{data.author}</p>
                  </div>
                </Link>
                <div className="arrived__item__price">
                  <div className="arrived__item__price__left">
                    <p className="arrived__cut__price">₹{data.cutPrice}</p>
                    <p className="arrived__price">₹{data.price}</p>
                  </div>

                  <AddShoppingCartIcon
                    type="button"
                    onClick={() => setShow(true)}
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

export default JustArrived;
