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
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import PopularList from "../components/PopularList";
import UsePagination from "../components/Pagination";
import { useState,useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import FilterSearch from "../components/FilterSearch";
import Pagination from "react-js-pagination";

function OfferZone() {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [active_page , setActivePage] = useState(1);
  const [total_items , settotalItems] = useState(0);
  const [books_count , setBookCount] = useState(0);
  const [show, setShow] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [books,setBooks] = useState([
    {
      image: best1,
      name: "My family",
      author: "Mahadevi Varma  ",
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
    {
      image: best1,
      name: "My family",
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
    {
      image: best1,
      name: "My family",
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
   function handlePageChange (pageNumber) {
    setActivePage(pageNumber);
  }
  useEffect(async () => { 
    fetch(apiBaseUrl + `books`+`?page=${active_page}`)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          setBookCount(result.books_count);
          settotalItems(result.books_count);
          if(result.data.books.length){
            let allbooks = [];

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
          
        } 
      }); 
 }, [active_page]);
  return (
    <div className="offer__zone container">
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
          <FilterSearch />

          {/* Categries right Column */}
          <Col md="10">
            <div className="categories__right">
              <div className="offer__image__div">
                <img className="col-12 col-md-10" src={offer} />

                <p>
                  You are <span>3</span> books away from this offer{" "}
                </p>

                {/*  if not logd in */}
                {/* <p>Please login to view your parchase histor</p> */}
                {/* if eligaible for offer */}
                {/* <p>Congrates you are elgiable for this offer</p> */}
              </div>

              <div className="offerzone__head__row ">
                <h5>Offerzone</h5>

                <p>5000 Books</p>
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
                    <div className="book__item">
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
                          onClick={() => setShow(true)}
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

export default OfferZone;
