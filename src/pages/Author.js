import "../style/css/author.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import pualo from "../images/author/paulo.png";
import best1 from "../images/author/best1.png";
import best2 from "../images/author/best2.png";
import best3 from "../images/author/best3.png";
import best4 from "../images/author/best4.png";

import placeholder from "../images/placeholder.png";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Featur from "../components/Featur";
import { useState,useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import { Link ,useParams} from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import parse from "html-react-parser";

import { connect } from 'react-redux';
import { loadCart, removeProduct, changeProductQuantity,addProduct } from '../services/cart/actions';
import { updateCart } from '../services/total/actions';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Author = props => {
  const { id } = useParams();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [show, setShow] = useState(false);

  const [diableLinks, setDiableLinks] = useState(true);
  const [author,setAuthor] = useState({image:placeholder,author:'',name:'',dob:'',description:'',language:'',gener:'',books:[],first_book:{title:''},notable_works:{title:''},last_work:{title:''}});
   function addProduct (product){
    const { cartProducts, updateCart } = props;
    let productAlreadyInCart = false;
        let book =        {
                  id:product.id,
                  image: product.featured_image_large,
                  name: product.title,
                  author: product.author_name,
                  cutPrice:product.offer_price,
                  price:product.sale_price,
                  offer_zone:product.offer_zone,
                };
    cartProducts.forEach(cp => {
      if (cp.id === book.id) {
        cp.quantity += 1;
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      book.quantity = 1;
      cartProducts.push(book);
    }
    updateCart(cartProducts);
    toast.info(book.name + " added to cart !");
    
  };
  useEffect(async () => { 
    fetch(apiBaseUrl + `author/${id}`)
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){

          if(result.data.author){
            let authorData = {};
            let author = result.data.author;
                console.log(author);
                authorData= {
                  id:author.id,
                  image: author.featured_image_large,
                  name: author.title,
                  dob: author.dob,
                  author: author.author_name,
                  description:author.description,
                  books:author.books,
                  book_count:author.book_count,
                  nationality:author.country,
                  first_book:author.first_book,
                  last_work:author.last_work,
                  notable_works:author.notable_works,
                  gener:author.gener,
                  language:author.language,
                }
            setAuthor(authorData);
            
          } else {
            setAuthor({image:best1,author:'',name:'',dob:'',description:'',language:'',gener:'',books:[],first_book:{title:''},notable_works:{title:''},last_work:{title:''}})
          }
          
        } else {

        } 

         setDiableLinks(false);
      }); 
 }, []);
  return (
    <div className="author container">
      <div className="author__content">
        <Container>
          <Row>
            <Col sm="12" md="4" className="author__img__col">
              <img className="col-12" src={author.image} />
            </Col>
            <Col className="author__data__col" md="7">
              <div className="author__data">
                <h2>{author.name}</h2>
                <div className="author__data__row">
                  <h5>Born</h5>

                  <h6>{author.dob}</h6>
                </div>
                <div className="author__data__row">
                  <h5>Genre</h5>

                  <h6>{author.gener}</h6>
                </div>
                <div className="author__data__row">
                  <h5>Language</h5>
                  <h6>{author.language}</h6>
                </div>
                <div className="author__data__row">
                  <h5>Nationality</h5>
                  <h6>{author.nationality}</h6>
                </div>
                <div className="author__data__row">
                  <h5>Notable works</h5>
                  <h6>{author.notable_works.title}</h6>
                </div>
                <div className="author__data__row">
                  <h5>First book</h5>
                  <h6>{author.first_book.title}</h6>
                </div>
                <div className="author__data__row">
                  <h5>Latest Work</h5>
                  <h6>{author.last_work.title}</h6>
                </div>
              </div>
            </Col>
          </Row>
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
          {/* 
                {show ? 
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
            <Col sm="12" md="4">
              <div className="author__text">
                <p className="col-12">
                  {parse(author.description)}
                </p>
              </div>
            </Col>

            <Col className="author__books" md="7">
              <h3>Books of {author.name}</h3>
              <Row>
                {author.books.map((data) => {
                  return (
                    <Col xs="6" sm="4" md="3">
                      <div className="book__item"  style={diableLinks ? { pointerEvents: 'none' } : {}}>
                        <Link
                          to={'/bookSingle/'+ data.id}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img src={data.featured_image_large} />
                        </Link>
                        <Link
                          to={'/bookSingle/'+ data.id}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <div className="book__item__name">
                            <h6>{data.title}</h6>
                            <p>{data.author_name}</p>
                          </div>
                        </Link>
                        <div className="book__item__price__div">
                          <div className="book__item__price__left">
                            <p className="book__item__cut__price">
                              ₹{data.offer_price}
                            </p>
                            <p className="book__item__price">₹{data.sale_price}</p>
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
            </Col>
          </Row>
        </Container>
      </div>
      <Featur />
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
)(Author);
