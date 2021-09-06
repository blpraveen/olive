import "../style/css/bookSingle.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import book from "../images/single.png";
import StarIcon from "@material-ui/icons/Star";
import AddIcon from "@material-ui/icons/Add";
import MinimizeIcon from "@material-ui/icons/Minimize";
import { Button } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { useState,useEffect} from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import ReactStars from "react-rating-stars-component";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";
import pop4 from "../images/popular/pop4.jpg";
import pop6 from "../images/popular/pop6.jpg";
import pop8 from "../images/popular/pop8.jpg";
import prebook from "../images/prebook.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import PopularList from "../components/PopularList";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link ,useParams} from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import parse from "html-react-parser";
function BookSingle() {
  //const { id } = props.match.params;
  const { id } = useParams();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [bookMark, setBookMark] = useState(false);
  const [details, setDetails] = useState(true);
  const [review, setReview] = useState(false);
  const [show, setShow] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const [book,setBook] = useState({image:best1,author:'',name:'',cutPrice:'',price:'',description:'',book_type:{author:''}});
  useEffect(async () => { 
    fetch(apiBaseUrl + `book/${id}`)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.book){
            let selectedBook = {};
            let book_data = result.data.book;
             selectedBook = {
                  id:book_data.id,
                  image: book_data.featured_image_large,
                  name: book_data.title,
                  author: book_data.author_name,
                  cutPrice:book_data.offer_price,
                  price:book.sale_price,
                  description:book_data.description,
                  book_type:book_data.book_type,
                };
            
            setBook(selectedBook);
            
          }
        } 
      }); 
      fetch(apiBaseUrl + `customer_related_book`)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.books.length){
            let relatedBook = [];
            result.data.books.map((book) => {
                relatedBook.push({
                  id:book.id,
                  image: book.featured_image_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.offer_price,
                  price:book.sale_price,
                })
            });
            setRelated(relatedBook);
            
          }
        } 
      }); 
 }, []);
  const [related,setRelated] = useState([
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
  const text = `  In the concluding installment to the Wrath of Ambar duology
  from masterful author Tanaz Bhathena, Gul and Cavas must
  unite their magical forces―and hold onto their growing
  romance―to save their kingdom from tyranny. 
  In the concluding installment to the Wrath of Ambar duology
  from masterful author Tanaz Bhathena, Gul and Cavas must
  unite their magical forces―and hold onto their growing
  romance―to save their kingdom from tyranny. 

  With King Lohar dead and a usurper queen in power, Gul and
  Cavas face a new tyrannical government that is bent on
  killing them both. Their roles in King Lohar's death have
  not gone unnoticed, and the new queen is out for blood. 
`;
  return (
    <div className="book__single container">
      <div className="path ">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Categories </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p> Friction</p>
      </div>

      <div className="book__single__content">
        <Row>
          <Col id="book__single__img__col" md="3">
            <Carousel
              fade
              controls={true}
              indicators={true}
              id="book__single__carousel"
            >
              <Carousel.Item>
                <img className="col-12" src={book.image} />
              </Carousel.Item>
              <Carousel.Item>
                <img className="col-12" src={book.image} />
              </Carousel.Item>
              <Carousel.Item>
                <img className="col-12" src={book.image} />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md="7" className="book__description__col">
            <div className="book__description">
              <h2>{book.title}</h2>
              <div className="book__description__star__row">
                <div className="book__description__star__left">
                  <StarIcon id="book__star" />
                  <StarIcon id="book__star" />
                  <StarIcon id="book__star" />
                  <StarIcon id="book__star" />
                  <StarIcon id="book__star" />
                  <p>(274)</p>
                </div>
                <div className="book__description__star__right">
                  <p>By</p>
                  <h6>{book.author}</h6>
                </div>
              </div>

              <div className="book__description__price">
                <h5>₹{book.cutPrice}</h5>
                <p>
                  Book Format:
                  <span style={{ paddingLeft: "5px" }}>Paperback</span>
                </p>
              </div>
              <div className="book__description__text">
                <p>
                {parse(book.description)}
                  <span
                    onClick={toggleReadMore}
                    style={{ color: "#46CE04", cursor: "pointer" }}
                  >
                    {isReadMore ? "...read more" : " show less"}
                  </span>
                </p>
              </div>

              <div className="book__description__button__row">
                <div className="book__description_increment">
                  <Button onClick={""} id="add__button">
                    -
                  </Button>
                  <p>1</p>
                  <Button onClick={""} id="add__button">
                    +
                  </Button>
                </div>
                <Button onClick={""} type="button" id="book__add__button">
                  Add to cart
                </Button>
              </div>

              <div className="book__share__row">
                <div
                  className="book__book__mark"
                  onClick={() => setBookMark(!bookMark)}
                >
                  <BookmarkBorderIcon
                    id="book__bookmark__icon"
                    className={bookMark ? "bookMark" : "book__bookmark__icon"}
                  />
                  <p>ADD TO BOOKMARK</p>
                </div>
                <div className="book__share">
                  <ShareOutlinedIcon id="book__share__icon" />
                  <p>SHARE</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="book__detailes">
              <div className="book__detailes__head">
                <div className="book__detailes__head__content">
                  <h6
                    onClick={() => setDetails(true)}
                    className={
                      details
                        ? "book__detailes__active"
                        : "book__detailes__head__h6"
                    }
                  >
                    Product Details
                  </h6>
                  <h6
                    onClick={() => setDetails(false)}
                    className={
                      !details
                        ? "book__detailes__active"
                        : "book__detailes__head__h6"
                    }
                  >
                    Reviews (12)
                  </h6>
                </div>
              </div>
              {details ? (
                <Row>
                  <Col>
                    <div className="book__detailes__content col-md-10">
                      <div className="book__detailes__row">
                        <h6>AUTHOR</h6>
                        <div className="book__detailes__row__right ">
                          <p>{book.book_type.author}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>CATEGORY</h6>
                        <div className="book__detailes__row__right ">
                          <p>{book.book_type.category}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>PUBLISHING DATE</h6>
                        <div className="book__detailes__row__right ">
                          <p>{book.book_type.publishing_date}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>EDITION</h6>
                        <div className="book__detailes__row__right ">
                          <p>{book.book_type.edition}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>BINDING</h6>
                        <div className="book__detailes__row__right ">
                          <p>{book.book_type.binding}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>NUMBER OF PAGES</h6>
                        <div className="book__detailes__row__right ">
                          <p>{book.book_type.number_of_pages}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>PUBLISHER</h6>
                        <div className="book__detailes__row__right ">
                          <p>{book.book_type.publisher}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>MULTIMEDIA</h6>
                        <div className="book__detailes__row__right ">
                          <p>{book.book_type.multimedia}</p>
                        </div>
                      </div>
                      <div className="book__detailes__row">
                        <h6>LANGAGE</h6>
                        <div className="book__detailes__row__right ">
                          <p>{book.book_type.language}</p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <div className="book__review">
                  <div className="book__review__first__row">
                    <Row>
                      <Col md="3">
                        <div className="book__review__first__row__left">
                          <h4>Customer Reviews</h4>
                          <div className="book__review__rating">
                            <h1>4.7</h1>
                            <div className="book__review__rating__right">
                              <p>285 Reviews</p>
                              <div className="book__review__rating__star">
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                                <StarIcon id="book__star" />
                              </div>
                            </div>
                          </div>

                          <button id="review__button">Write a Review</button>
                        </div>
                      </Col>
                      <Col id="progress__col">
                        <div className="book__progress__div">
                          <div className="book__progress">
                            <p>5 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={80}
                            />

                            <p>200</p>
                          </div>
                          <div className="book__progress">
                            <p>4 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={60}
                            />

                            <p>50</p>
                          </div>
                          <div className="book__progress">
                            <p>5 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={40}
                            />

                            <p>200</p>
                          </div>
                          <div className="book__progress">
                            <p>3 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={30}
                            />

                            <p>14</p>
                          </div>
                          <div className="book__progress">
                            <p>2 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={15}
                            />

                            <p>20</p>
                          </div>
                          <div className="book__progress">
                            <p>1 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={10}
                            />

                            <p>8</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="book__review__content">
                    <Row>
                      <Col xs="12" md="8">
                        {related.map((data) => {
                          return (
                            <div>
                              <div className="review__content__head">
                                <h6>{data.tittle}</h6>
                                <div className="review__stars__div">
                                  <ReactStars
                                    id="review__stars"
                                    count={5}
                                    value={data.stars}
                                    size={24}
                                    activeColor="#ffd700"
                                  />
                                </div>
                              </div>
                              <div className="review__text">
                                <p>{data.text}</p>
                                <div className="review__date">
                                  <h6>{data.date}</h6>
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <div className="review__more">
                          <h5 type="text">View All Reviews</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* <<<<<<<<<<< ALSO BROUGHT BOOKS */}
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
        <div className="also__brought">
          <div className="also__brought__head">
            <h6>
              Customers Who Bought{" "}
              <span style={{ color: "#46CE04" }}>Rising Like a Storm</span> also
              brought
            </h6>
          </div>

          <Row>
            {related.map((data) => {
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
          </Row>
        </div>
        <div></div>
      </div>

      <PopularList />

      <Featur />
    </div>
  );
}

export default BookSingle;
