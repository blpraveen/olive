import "./../style/css/justArrived.css";
import arrived1 from "../images/arrived/arrived1.png";
import arrived2 from "../images/arrived/arrived2.png";
import arrived3 from "../images/arrived/arrived3.png";
import arrived4 from "../images/arrived/arrived4.png";
import arrived5 from "../images/arrived/arrived5.png";
import arrived6 from "../images/arrived/arrived6.png";
import sample from "../images/arrived/review.png";
import paulo from "../images/arrived/paulo.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
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
function JustArrived() {
  const [show, setShow] = useState(false);
  const [arrived, setArrived] = useState([
    {
      image: paulo,
      name: "Rising Like a Stome",
      author: "Tanaz Bhathena",
      cutPrice: "234",
      price: "165",
    },
    {
      image: arrived2,
      name: "Sinbad and theTrump...",
      author: "Kevin Missal",
      cutPrice: "234",
      price: "157",
    },
    {
      image: arrived3,
      name: "Notes of AR Rahman",
      author: "Krishna Trilok",
      cutPrice: "675",
      price: "675",
    },
    {
      image: arrived4,
      name: "1971 IAN cardoz",
      author: "Vivan Marwaha",
      cutPrice: "432",
      price: "321",
    },
    {
      image: arrived5,
      name: "Hisila Yami",
      author: "Hisila Yami",
      cutPrice: "987",
      price: "879",
    },
    {
      image: arrived6,
      name: "Conflicts of Interest",
      author: "Sunitha Narain",
      cutPrice: "432",
      price: "765",
    },
  ]);
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
                 
              
                
                 
                
                 </Alert> :''
              }  */}

      <div className="arrived__row">
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
          // removeArrowOnDeviceType={[ "mobile"]}
          //   deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="popular__ani"
        >
          {arrived.map((data) => {
            return (
              <div className="arrived__item">
                <Link
                  to="/bookSingle"
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
