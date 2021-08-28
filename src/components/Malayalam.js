import { useState } from "react";
import "./../style/css/malayalam.css";
import "./../style/css/justArrived.css";
import malayalam1 from "../images/malayalam/mal1.jpg";
import malayalam2 from "../images/malayalam/mal2.jpg";
import malayalam3 from "../images/malayalam/mal3.jpg";
import malayalam4 from "../images/malayalam/mal4.jpg";
import malayalam5 from "../images/malayalam/mal5.jpg";
import malayalam6 from "../images/malayalam/mal6.jpeg";
import malayalam7 from "../images/malayalam/mal7.jpg";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import sample from "../images/arrived/review.png";
import paulo from "../images/arrived/paulo.png";

import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import ArrowBackIosSharpIcon from "@material-ui/icons/ArrowBackIosSharp";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    //   slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    //   slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    //   slidesToSlide: 1
  },
};
function Malayalam() {
  const [show, setShow] = useState(false);
  const [arrived, setArrived] = useState([
    {
      image: malayalam1,
      name: "കളക്ടർ ബ്രോ",
      author: "പ്രശാന്ത് നായർ",
      cutPrice: "666",
      price: "334",
    },
    {
      image: malayalam2,
      name: "ഒറിജിൻ",
      author: "ഡാൻ ബ്രൗൺ",
      cutPrice: "654",
      price: "678",
    },
    {
      image: malayalam3,
      name: "പച്ച മഞ്ഞ ചുവപ്പ്",
      author: "ഡി രാമകൃഷ്ണൻ",
      cutPrice: "332",
      price: "113",
    },
    {
      image: malayalam4,
      name: "ബാൽക്കൻ ഡയറി",
      author: "ബെജു എൻ നായർ",
      cutPrice: "884",
      price: "756",
    },
    {
      image: malayalam5,
      name: "കേരള ഭക്ഷണ ചരിതം",
      author: "സുമ ശിവദാസ്",
      cutPrice: "445",
      price: "300",
    },
    {
      image: malayalam6,
      name: "നമ്പാടന്റെ നമ്പറുകൾ",
      author: "ലോനപ്പൻ",
      cutPrice: "199",
      price: "115",
    },
    {
      image: malayalam7,
      name: "നമ്പാടന്റെ നമ്പറുകൾ",
      author: "ലോനപ്പൻ",
      cutPrice: "199",
      price: "115",
    },
  ]);
  return (
    <div className="malayalam">
      <div className="malayalam__head__row ">
        <h5>Popular Malayalam Books</h5>
        {/* <p>View all</p> */}
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
                 
              
                
                 
                
                 </Alert> :''
              }  */}
      <div className="malayalam__row">
        <Carousel
          swipeable={true}
          // draggable={true}
          //   showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={2000}
          customTransition={"ease 2000ms"}
          containerClass="carousel-container"
          // removeArrowOnDeviceType={[ "mobile"]}
          //   deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="popular__ani"
        >
          {arrived.map((data) => {
            return (
              <div className="malayalam__item">
                <Link
                  to="/bookSingle"
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
                  to="/bookSingle"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="malayalam__item__name">
                    <h6>{data.name}</h6>
                    <p>{data.author}</p>
                  </div>
                </Link>

                <div className="malayalam__item__price">
                  <div className="malayalam__item__price__left">
                    <p className="malayalam__cut__price">₹{data.cutPrice}</p>
                    <p className="malayalam__price">₹{data.price}</p>
                  </div>

                  <AddShoppingCartIcon
                    type="button"
                    onClick={() => setShow(true)}
                    id="malayalam___cart__icon"
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

export default Malayalam;
