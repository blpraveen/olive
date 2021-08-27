import React, { useState } from "react";

import Featur from "../components/Featur";
import "../style/css/orderConfirm.css";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
function OrderConfirm() {
    const [bookMark, setBookMark] = useState(false);
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
      
      ]);
  return (
    <div>
      <div className="body">
        <div className="container9">
          <div className="confirm-container">
            <img
              className="confirm-img"
              src={process.env.PUBLIC_URL + "/images/order-confirm.svg"}
              alt="confirm-image"
            />
            <p className="thanks">Thanks</p>
            <p className="confirmed">
              Your Order <span>Confirmed</span>!
            </p>
            <p className="con-message">
              We've received your order and we well contact you as soon as your
              package is shipped. You can find your purchase information "My
              Account""
            </p>
          </div>
          <div className="confirm-middle">
            <p className="check-name">
              Hey <span>Alex</span>,
            </p>
            <p className="check-text">
              meanwhile check this recommendations. Handcrafted for you
            </p>
          </div>
          {/* <div className="confirm-book">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div className="confirm-single1">
                  <img
                    className="single-book"
                    src={process.env.PUBLIC_URL + "/images/confirmed1.svg"}
                    alt="confirm-book"
                  />
                  <div className="about-book">
                    <p className="books-title1">Rising Like a Stome</p>
                    <p className="author-name1">Tanaz Bhathena</p>
                  </div>

                  <button className="bookmark-box">
                    <img
                      className="bookmark-icon"
                      src={process.env.PUBLIC_URL + "/images/bookmark-icon.svg"}
                      alt="bookmark-icon"
                    />
                    <p className="add-bookmark">ADD TO BOOKMARK</p>
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div className="confirm-single1">
                  <img
                    className="single-book"
                    src={process.env.PUBLIC_URL + "/images/confirmed2.svg"}
                    alt="confirm-book"
                  />
                  <div className="about-book">
                    <p className="books-title1">Sinbad and theTrump...</p>
                    <p className="author-name1">Kevin Missal</p>
                  </div>

                  <button className="bookmark-box">
                    <img
                      className="bookmark-icon"
                      src={process.env.PUBLIC_URL + "/images/bookmark-icon.svg"}
                      alt="bookmark-icon"
                    />
                    <p className="add-bookmark">ADD TO BOOKMARK</p>
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
                <div className="confirm-single1">
                  <img
                    className="single-book"
                    src={process.env.PUBLIC_URL + "/images/confirmed3.svg"}
                    alt="confirm-book"
                  />
                  <div className="about-book">
                    <p className="books-title1">Notes of AR Rahman</p>
                    <p className="author-name1">Krishna Trilok</p>
                  </div>

                  <button className="bookmark-box">
                    <img
                      className="bookmark-icon"
                      src={process.env.PUBLIC_URL + "/images/bookmark-icon.svg"}
                      alt="bookmark-icon"
                    />
                    <p className="add-bookmark">ADD TO BOOKMARK</p>
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <div className="confirm-single2">
                  <img
                    className="single-book"
                    src={process.env.PUBLIC_URL + "/images/confirmed4.svg"}
                    alt="confirm-book"
                  />
                  <div className="about-book">
                    <p className="books-title2">Rising Like a Stome</p>
                    <p className="author-name2">Tanaz Bhathena</p>
                  </div>

                  <button className="bookmark-box">
                    <img
                      className="bookmark-icon"
                      src={process.env.PUBLIC_URL + "/images/bookmark-icon.svg"}
                      alt="bookmark-icon"
                    />
                    <p className="add-bookmark2">ADD TO BOOKMARK</p>
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <div className="confirm-single2">
                  <img
                    className="single-book"
                    src={process.env.PUBLIC_URL + "/images/confirmed5.svg"}
                    alt="confirm-book"
                  />
                  <div className="about-book">
                    <p className="books-title2">Sinbad and theTrump...</p>
                    <p className="author-name2">Kevin Missal</p>
                  </div>

                  <button className="bookmark-box">
                    <img
                      className="bookmark-icon"
                      src={process.env.PUBLIC_URL + "/images/bookmark-icon.svg"}
                      alt="bookmark-icon"
                    />
                    <p className="add-bookmark2">ADD TO BOOKMARK</p>
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <div className="confirm-single2">
                  <img
                    className="single-book"
                    src={process.env.PUBLIC_URL + "/images/confirmed6.svg"}
                    alt="confirm-book"
                  />
                  <div className="about-book">
                    <p className="books-title2">Notes of AR Rahman</p>
                    <p className="author-name2">Krishna Trilok</p>
                  </div>

                  <button className="bookmark-box">
                    <img
                      className="bookmark-icon"
                      src={process.env.PUBLIC_URL + "/images/bookmark-icon.svg"}
                      alt="bookmark-icon"
                    />
                    <p className="add-bookmark2">ADD TO BOOKMARK</p>
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <div className="confirm-single2">
                  <img
                    className="single-book"
                    src={process.env.PUBLIC_URL + "/images/confirmed7.svg"}
                    alt="confirm-book"
                  />
                  <div className="about-book">
                    <p className="books-title2">Rising Like a Stome</p>
                    <p className="author-name2">Tanaz Bhathena</p>
                  </div>

                  <button className="bookmark-box">
                    <img
                      className="bookmark-icon"
                      src={process.env.PUBLIC_URL + "/images/bookmark-icon.svg"}
                      alt="bookmark-icon"
                    />
                    <p className="add-bookmark2">ADD TO BOOKMARK</p>
                  </button>
                </div>
              </div>
            </div>
          </div> */}

          <Container className='confirm__book__container'>
              <Row>
              {item.map((data) => {
                  return (
                    <Col xs="12" sm="6" md="4">
                      <div className="confirm__book__item">
                       
                          <img src={data.image} />
                       
                        
                          <div className="confirm__item__name">
                            <h6>{data.name}</h6>
                            <p>{data.author}</p>
                          </div>
                        <div className='confirm__item__bookmark'>
                        <BookmarkBorderIcon
                    
        className="book__bookmark__not"
                    />
                        <h5 type='button'>ADD TO BOOKMARK</h5>
                        </div>
                       </div>
                    </Col>
                  );
                })}
              </Row>
          </Container>
        </div>
      </div>
      <Featur />
    </div>
  );
}

export default OrderConfirm;
