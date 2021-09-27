import React,{ useState,useEffect} from "react";
import Featur from "../components/Featur";
import UsePagination from "../components/Pagination";
import "../style/css/blog.css";
import ReactStars from "react-rating-stars-component";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Link ,useParams} from "react-router-dom";
import parse from "html-react-parser";
const Blog = props => {
  const [bookTalk, setbookTalk] = useState({});
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const { id } = useParams();

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  useEffect(async () => { 
   
       fetch(apiBaseUrl +  `book_talk/${id}`)
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
                  book_talk_description:book_data.book_talk_description,
                  book_type:book_data.book_type,
                  book_all_images:book_data.all_images,
                };
            
            setbookTalk(selectedBook);
            
          }
        } 
      }); 
 }, []);
  return (
    <div className="container">
      <div className="body">
        <div className="blog-container">
          <div className="about">
            <img
              className="blog-img"
              src={process.env.PUBLIC_URL + "/images/book.jpg"}
              alt="book_image"
            />
          </div>
          <div className="top-layer">
            <div className="text-container">
              <h2>
                Why should you read <span>{bookTalk.name}</span>
              </h2>

              <h6> {bookTalk.name}</h6>
              {bookTalk.book_talk_description && (<div>{parse(bookTalk.book_talk_description)}</div>)}
            </div>
            <Container>
              <div className="buynow ">
                <Row>
                  <Col md="4">
                    <div className="buy-book">
                      <img
                        className="book-front col-12"
                        src={bookTalk.image}
                        alt="edit-icon"
                      />
                      <Link
                          to={'/bookSingle/'+ bookTalk.id}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                      <button className="buy-btn">BUY NOW</button>l
                      </Link>
                    </div>
                  </Col>

                  <Col md="8">
                    <div className="description">
                     <Link
                          to={'/bookSingle/'+ bookTalk.id}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                      <h5 className="book-title">{bookTalk.name}</h5>
                      </Link>
                      <div className="rating">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          

                          <h6> (274)</h6>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <h6>By </h6>

                          <p>{bookTalk.author}</p>
                        </div>
                      </div>

                      <p className="book-price">₹ {bookTalk.cutPrice}</p>
                      { bookTalk.description && (
                        <div className="description-text">
                      <p>
                      {isReadMore ? bookTalk.description.slice(0, 550) : bookTalk.description}
                      <span
                        onClick={toggleReadMore}
                        style={{ color: "#46CE04", cursor: "pointer" }}
                      >
                        {isReadMore ? "...read more" : " show less"}
                      </span>
                    </p>
                      </div>
                        )}
                      
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "90px" }}
      >
        <UsePagination />
      </div>
      <Featur />
    </div>
  );
}
export default Blog;
