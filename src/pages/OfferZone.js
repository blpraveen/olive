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
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
function OfferZone() {
  const [show, setShow] = useState(false);
  const [item] = useState([
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
  return (
    <div className="offer__zone container">
      <div className="path ">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Offerszone</p>
      </div>

      <div className="categories__content">
        <Container>
          <Row>
            <Col className="search__items_col" md="3">
              {/* SEARCH OPTIONS LEFT OF THE PAGE */}
              <div className="search__items">
                <div className="search__items__head">
                  <h5>Search Author</h5>
                  <div className="search__items__input ">
                    <input />
                    <div className="search__items__icon__div">
                      <SearchIcon
                        type="button"
                        onClick={""}
                        id="search__items__icon"
                      />
                    </div>
                  </div>
                </div>

                {/*  Language */}
                <Dropdown id="search__dropdown">
                  <Dropdown.Toggle variant="none" id="dropdown-basic">
                    Language
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="search__item">
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>English</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>Malayalam</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>Hindi</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>Hindi</p>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                {/* FORMAT */}
                <Dropdown id="search__dropdown">
                  <Dropdown.Toggle variant="none" id="dropdown-basic">
                    Format
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="search__item">
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>Paperback</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>Hard cover</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>E books</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>Audio Books</p>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                {/* FILTER BY PRICE */}

                <Dropdown id="search__dropdown">
                  <Dropdown.Toggle variant="none" id="dropdown-basic">
                    Filter By Price
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="search__item">
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>Low - High</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>High - Low</p>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                {/* BY DATE */}

                <Dropdown id="search__dropdown">
                  <Dropdown.Toggle variant="none" id="dropdown-basic">
                    Filter By Price
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="search__item">
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>Low - High</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>High - Low</p>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                {/* BY REVIEW */}

                <Dropdown id="search__dropdown">
                  <Dropdown.Toggle variant="none" id="dropdown-basic">
                    By Reviews
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="search__item">
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>5 Star</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>4 Star</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>3 Star</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>2 Star</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>1 Star</p>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>

                {/* BY PUBLISHER */}

                <Dropdown id="search__dropdown">
                  <Dropdown.Toggle variant="none" id="dropdown-basic">
                    By Publisher
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="search__item">
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>DC BOOKS</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>PUBLISHER 1</p>
                      </div>
                      <div className="search__item__row">
                        <input type="checkbox" /> <p>PUBLISHER 3</p>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>

            {/* Categries right Column */}
            <Col md="8">
              <div className="categories__right">
                <div className="offer__image__div">
                  <img className="col-12" src={offer} />

                  <p>
                    You are <span>3</span> books away from this offer{" "}
                  </p>

                  {/*  if not logd in */}
                  {/* <p>Please login to view your parchase histor</p> */}
                  {/* if eligaible for offer */}
                  {/* <p>Congrates you are elgiable for this offer</p> */}
                </div>

                <div className="offerzone__head__row ">
                  <h5>OFFERZONE</h5>

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
                {item.map((data) => {
                  return (
                    <Col xs="6" sm="4" md="3">
                      <div className="book__item">
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
                  <UsePagination />
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      <PopularList />
      <Featur />
    </div>
  );
}

export default OfferZone;
