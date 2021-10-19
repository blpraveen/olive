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
import Modal from "react-bootstrap/Modal";
import { Button } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { useState,useEffect} from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import ReactStars from "react-rating-stars-component";

import placeholder from "../images/placeholder.png";
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
import { connect } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";
import { loadCart, removeProduct, changeProductQuantity,addProduct} from '../services/cart/actions';
import { updateCart } from '../services/total/actions';
import { updateBookMark } from '../services/bookmark/actions';

const BookSingle = props => {
  //const { id } = props.match.params;
  const [data] = useState([
    {
      tittle: "Great Story! You Love it",
      text: "Nice book... It should be read by the one who want to learn something to be better in life..... But in this book(think and.....) they have given only their own successful peopl example..Due to which a common man may think about them only except our own successful person....",
      stars: 4,
      date: "2021 April 7 | Alex M",
    },
    {
      tittle: "Amazing offer on amazing books",
      text: `'Ours have the world's greatest epic Shrimad Bhagwad Geeta this book alone can change the life of the man who read this...... It seems like I m exaggerating but trust me whoever read this epic no one could tell that it's not a perfect book..... Even other religious people read and admire this book.....'`,
      stars: 3,
      date: "2021 April 7 | Alex M",
    },
    {
      tittle: "Box was damaged, and crumpled",
      text: "The shipping was ok, but it could be the fault of the handling process. The box had dents and the books as well",
      stars: 2,
      date: "2021 April 7 | Alex M",
    },
    {
      tittle:
        "Waste of time for investors who wants to learn more about investing",
      text: "Nice book... It should be read by the one who want to learn something to be better in life..... But in this book(think and.....) they have given only their own successful peopl example..Due to which a common man may think about them only except our own successful person....",
      stars: 3,
      date: "2021 April 7 | Alex M",
    },
  ]);
  const { id } = useParams();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [isLoggedIn, seIsLoggedIn] = useState(false);

  const [diableLinks, setDiableLinks] = useState(true);
  const [diableRelatedLinks, setDiableRelatedLinks] = useState(true);
  const [quantity,setQuantity] = useState(1)
  const [bookMark, setBookMark] = useState(false);
  const [details, setDetails] = useState(true);
  const [review, setReview] = useState(false);
  const [show, setShow] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRate, setReviewRate] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const shareUrl = window.location.host  + '/bookSingle/'+ id
  const [book,setBook] = useState({image:best1,author:'',name:'',cutPrice:'',price:'',description:'',book_type:{author:''},book_all_images:[]});
   function addProduct (product){
    const { cartProducts, updateCart } = props;
    let productAlreadyInCart = false;

    cartProducts.forEach(cp => {
      if (cp.id === product.id) {
        cp.quantity += quantity;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      product.quantity = quantity;
      cartProducts.push(product);
    }
    updateCart(cartProducts);
    toast.info(product.name + " added to cart !");
  };
  function addBookMark(id) {
    const { updateBookMark } = props;
    let bookmarks = props.bookmarks;
    if(bookMark){
    bookmarks.forEach((cp,index) => {
        if (cp === id) {
          bookmarks.slice(index,1);
        }
      });
    } else {
      if(props.bookmarks){
        bookmarks.push(id);
      } else {
        bookmarks = [];
        bookmarks.push(id);
      }
    }
    updateBookMark(bookmarks);
    setBookMark(!bookMark);
   var title = book.name;
    var url = window.location.href;
 
    if(window.sidebar && window.sidebar.addPanel){
        /* Mozilla Firefox Bookmark - works with opening in a side panel only � */
        window.sidebar.addPanel(title, url, "");
    }else if(window.opera && window.print) {
        /* Opera Hotlist */
        toast.info("Press Control + D to bookmark");
        alert("");
        return true;
    }else if(window.external){
        /* IE Favorite */
        try{
            window.external.AddFavorite(url, title);
        }catch(e){
                        
        toast.info("Press Control + D to bookmark");
                }            
    }else{
        /* Other */
        
        toast.info("Press Control + D to bookmark");
    }
    
  }
  function shReviewModal(){
    setReviewRate(0);
    setReviewDescription('');
    setReviewTitle('');
    setShowReviewModal(true);
  }
  useEffect(async () => { 
     if(props.user  &&  props.user.token){
           seIsLoggedIn(true);
     }
    if(props.bookmarks.includes(parseInt(id))){
       setBookMark(true);
    }
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
                  price:book_data.sale_price,
                  description:book_data.description,
                  book_type:book_data.book_type,
                  book_all_images:book_data.all_images,
                  star: parseInt(book_data.rate),
                  reviews:book_data.reviews,
                  pre_order:book_data.pre_order,
                };
            
            setBook(selectedBook);
            setDiableLinks(false);
            
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
                  cutPrice:book.sale_price,
                  price:book.offer_price,
                })
            });
            setRelated(relatedBook);

            setDiableRelatedLinks(false);
            
          }
        } 
      }); 
      setReviewRate(0);
 }, [props.user]);
  const [related,setRelated] = useState([
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
  function submitReview(event){
    event.preventDefault();
    const data = {
          subject: reviewTitle,
          rate: reviewRate,
          message: reviewDescription,
          book_id:book.id
      }
      if( props.user.token ){
       data['user'] = props.user.email
      } 
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        };  
    fetch(apiBaseUrl +  `add_review/${id}`, requestOptions)
    .then(response => {
      return response.json();
    }).then(result => {
      if(result.status){
          toast.info("Reviews added successfully!");
          book.reviews = result.data;
          setBook(book);
          setShowReviewModal(false);
        } else {
          toast.error("Error !Some thing went wrong");
        }
      });
  }
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
    <ToastContainer />
      <div className="path ">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Books </p>
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
            {book.book_all_images.map((data) => {
                          return (
              <Carousel.Item>
                <img className="col-12" src={data} />
              </Carousel.Item>
            )
          })}
            </Carousel>
          </Col>
          <Col md="7" className="book__description__col">
            <div className="book__description">
              <h2>{book.title}</h2>
              <div className="book__description__star__row">
                <div className="book__description__star__left">
                 {book.star ? (
                [...Array(book.star)].map((item, index) => ( 
                  <StarIcon id="book__star" />
                  ) 
              )):''}
                {(5-book.star) ? (
                      [...Array(5-book.star)].map((item, index) => ( 
                  <StarIcon id="book__star_grey" />
                  ) 
              )
                  ) : ''}
                 
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
              <div className="book__description__text" style={diableLinks ? { pointerEvents: 'none' } : {}}>
              <p>
                      {isReadMore ? book.description.slice(0, 550) : book.description}
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
                  <Button
                  onClick={()=>setQuantity(quantity > 0 ? quantity-1 : 0 )}
                   id="add__button">
                    -
                  </Button>
                  <p>{quantity}</p>
                  <Button onClick={()=>setQuantity(quantity+1)} id="add__button">
                    +
                  </Button>
                </div>
                {book.pre_order ? (
                  <Button
                 onClick={() => addProduct(book)}
                  type="button"
                  id="book__add__button"
                  style={{ background: "#46CE04" }}
                >
                  PREORDER
                </Button>
                  ): (
                  <Button onClick={() => addProduct(book)} type="button" id="book__add__button" style={diableLinks ? { pointerEvents: 'none' } : {}}>
                  Add to cart
                </Button>
                  )}
                
                
              </div>

              <div className="book__share__row" style={diableLinks ? { pointerEvents: 'none' } : {}}>
                <div
                  className="book__book__mark"
                  onClick={() => addBookMark(book.id)}
                >
                  <BookmarkBorderIcon
                    id="book__bookmark__icon"
                    className={bookMark ? "bookMark" : "book__bookmark__icon"}
                  />
                  <p>ADD TO BOOKMARK</p>
                </div>
                <div className="book__share">
                 {show ? (
          <Alert variant="success" id="alert" className="book_share_alert">

            <div className="alert__success__text">
             <div className="Demo__some-network">
               <FacebookShareButton
            url={shareUrl}
            quote={book.name}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          </div>
            <div className="Demo__some-network">
          <TwitterShareButton
            url={shareUrl}
            title={book.name}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          </div>
          <div className="Demo__some-network">
          <WhatsappShareButton
            url={shareUrl}
            title={book.name}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          </div>
           <div className="Demo__some-network">
           <PinterestShareButton
            url={String(window.location)}
            media={`${book.image}`}
            className="Demo__some-network__share-button"
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>
          </div>
           <div className="Demo__some-network">
          <EmailShareButton
            url={shareUrl}
            subject={book.name}
            body="body"
            className="Demo__some-network__share-button"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
          </div>
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
                  <ShareOutlinedIcon id="book__share__icon" onClick={() =>setShow(true)}/>
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
                    Reviews ({book.reviews && book.reviews.total})
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
                            <h1>{book.reviews && book.reviews.avg}</h1>
                            <div className="book__review__rating__right">
                              <p>{book.reviews && book.reviews.total_stars} Reviews</p>
                              <div className="book__review__rating__star">
                              {book.reviews && ((book.reviews.avg) ? (
                                [...Array(book.reviews.avg)].map((item, index) => ( 
                                    <StarIcon id="book__star" />
                                    ) 
                                )
                              ): '')}
                              {book.reviews && ((5-book.reviews.avg) ? (
                              [...Array(5-book.reviews.avg)].map((item, index) => ( 
                                    <StarIcon id="book__star_grey" />
                                    ) 
                                )
                                ):'')}
                               
                               
                              </div>
                            </div>
                          </div>
                          {(isLoggedIn)? (<button style={diableLinks ? { pointerEvents: 'none' } : {}} id="review__button" onClick={()=> shReviewModal()}>Write a Review</button>): (<button id="review__button">Login to write Review</button>)}
                          
                        </div>
                      </Col>
                      <Col id="progress__col">
                        <div className="book__progress__div">
                          <div className="book__progress">
                            <p>5 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={book.reviews && ((book.reviews.total_stars) ? Math.round(((book.reviews.star5*5)/book.reviews.total_stars)*100): 0)}
                            />

                            <p>{book.reviews && book.reviews.star5} </p>
                          </div>
                          <div className="book__progress">
                            <p>4 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={book.reviews && ((book.reviews.total_stars) ? Math.round(((book.reviews.star4*4)/book.reviews.total_stars)*100) : 0)}
                            />

                            <p>{book.reviews && book.reviews.star4} </p>
                          </div>
                         
                          <div className="book__progress">
                            <p>3 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={book.reviews && ((book.reviews.total_stars) ? Math.round(((book.reviews.star3*3)/book.reviews.total_stars)*100) : 0)}
                            />

                            <p>{book.reviews && book.reviews.star3}</p>
                          </div>
                          <div className="book__progress">
                            <p>2 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={book.reviews && ((book.reviews.total_stars) ? Math.round(((book.reviews.star2*2)/book.reviews.total_stars)*100) : 0)}
                            />

                            <p>{book.reviews && book.reviews.star2}</p>
                          </div>
                          <div className="book__progress">
                            <p>1 Star</p>

                            <ProgressBar
                              className="progress__bar"
                              variant="warning"
                              now={book.reviews && ((book.reviews.total_stars) ? Math.round(((book.reviews.star1*1)/book.reviews.total_stars)*100) : 0)}
                            />

                            <p>{book.reviews && book.reviews.star1}</p>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div className="book__review__content">
                    <Row>
                      <Col xs="12" md="8">
                        {book.reviews && book.reviews.reviews.map((data) => {
                          return (
                            <div>
                              <div className="review__content__head">
                                <h6>{data.subject}</h6>
                                <div className="review__stars__div">
                                 {((data.rate) ? (
                                [...Array(data.rate)].map((item, index) => ( 
                                    <StarIcon id="book__star" />
                                    ) 
                                )
                              ): '')}
                              {((5-data.rate) ? (
                              [...Array(5-data.rate)].map((item, index) => ( 
                                    <StarIcon id="book__star_grey" />
                                    ) 
                                )
                                ):'')}
                                </div>
                              </div>
                              <div className="review__text">
                                <p>{data.message}</p>
                                <div className="review__date">
                                  <h6>{data.created_at} | {data.customer}</h6>
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
                  <div className="book__item" style={diableRelatedLinks ? { pointerEvents: 'none' } : {}}>
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
                        onClick={() => addProduct(data)}
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
      <Modal
        show={showReviewModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => setShowReviewModal(false)}
        ><p className="review-title">Write A Review</p></Modal.Header>
        <Modal.Body id="signup-model">
                <div className="rating-container">
                    <div className="rating-text">
                        <p>Your Rating</p>
                        <ReactStars
                        count={5}
                        onChange={(value) => setReviewRate(value)}
                        size={24}
                        color2={'#ffd700'} />,
                    </div>
                </div>

                <div className="form-container">
                    <form className="review">
                        <input type="text" placeholder="Heading" className="review-form" onChange={(event) => setReviewTitle(event.target.value)}></input>
                        <textarea rows="10" placeholder="Description" className="description-text" onChange={(event) => setReviewDescription(event.target.value)}></textarea>
                        <br/>
                        <button className="publish-btn" onClick={(event) => submitReview(event)}>Publish</button>
                    </form>
                </div>

              
        </Modal.Body>
      </Modal>
    </div>
    
  );
}

const mapStateToProps = state => ({
  cartProducts: state.cart.products,
  newProduct: state.cart.productToAdd,
  productToRemove: state.cart.productToRemove,
  productToChange: state.cart.productToChange,
  cartTotal: state.total.data,
  bookmarks:state.bookmarks.bookmarks,
  user:state.user.profile,
});

export default connect(
  mapStateToProps,
  { loadCart, updateCart, removeProduct, changeProductQuantity,updateBookMark }
)(BookSingle);

