import "./../style/css/bestSellers.css";
import "./../style/css/justArrived.css";
import best1 from "../images/best/img1.jpg";
import best2 from "../images/best/img2.jpg";
import best3 from "../images/best/img3.jpg";
import best4 from "../images/best/img4.jpg";
import best5 from "../images/best/img5.jpg";
import best6 from "../images/best/img6.jpg";
import best7 from "../images/best/img7.jpg";
import best8 from "../images/best/img8.jpg";
import banner1 from "../images/best/banner1.png";
import banner2 from "../images/best/banner2.png";
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


function BestSellers() {
  const [bestSeller, setbestSeller] = useState([
    {
      image: best1,
      name: "My family ",
      author: "Mahadevi Varma",
      cutPrice: "654",
      price: "456",
    },
    {
      image: best2,
      name: "That night",
      author: "Nidhi Updhyay",
      cutPrice: "123",
      price: "321",
    },
    {
      image: best3,
      name: "The family firm",
      author: "Emily Oster",
      cutPrice: "777",
      price: "765",
    },
    {
      image: best4,
      name: "The best couple ever",
      author: "The best couple ever",
      cutPrice: "321",
      price: "321",
    },
  ]);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [show, setShow] = useState(false);
  useEffect(async () => { 
    fetch(apiBaseUrl + 'best_sellers')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.books.length){
            let bestSellerBook = [];
            result.data.books.map((book) => {
                console.log(book);
                bestSellerBook.push({
                  id:book.id,
                  image: book.featured_image_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.sale_price,
                  price:book.offer_price,
                })
            });
            setbestSeller(bestSellerBook);
            setbestSellerTwo(bestSellerBook);
            
          }
        } 
      }); 
 }, []);
  

  const [bestSellerTwo, setbestSellerTwo] = useState([
    {
      image: best5,
      name: "Right Between the ears",
      author: "Sandeep Dayal",
      cutPrice: "567",
      price: "565  ",
    },
    {
      image: best6,
      name: "Vichhoda",
      author: "Harinder Sinkka",
      cutPrice: "876",
      price: "654",
    },
    {
      image: best7,
      name: "The star of India",
      author: "Dina R. Chambersr",
      cutPrice: "888",
      price: "654",
    },
    {
      image: best8,
      name: "The Delhi",
      author: "Khusheanth Singh",
      cutPrice: "743",
      price: "789",
    },
  ]);
  return (
    <div className="best__seller">
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
              <img className="col-12" src={banner2} />
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
                    <div className="best__item">
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
                          onClick={() => setShow(true)}
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
              <img className="col-12" src={banner1} />
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
                    <div className="best__item">
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
                          onClick={() => setShow(true)}
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

export default BestSellers;
