import ".././style/css/home.css";
import { useState,useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../images/banner/banner-1.png";
import school from "../images/banner/schools.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import PopularList from "../components/PopularList";
import JustArrived from "../components/JustArrived";
import BestSellers from "../components/BestSellers";
import Malayalam from "../components/Malayalam";
import book from "../images/book.png";
import review from "../images/review.png";
import ayurveda from "../images/ayurveda.png";
import mt from "../images/mt.png";
import talk1 from "../images/talk1.png";
import talk2 from "../images/talk2.png";
import talk3 from "../images/talk3.png";
import discover1 from "../images/discover1.png";
import discover2 from "../images/discover2.png";
import discover3 from "../images/discover3.png";
import discover4 from "../images/discover4.png";
import placeholder from "../images/placeholder.png";
import parse from "html-react-parser";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Featur from "../components/Featur";
import { Link } from "react-router-dom";
function Home() {

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [authorOfTheMonth, setAuthorOfMonth] = useState({});
  const [bookOfTheMonth, setBookOfMonth] = useState({});
  const [bannerSlider, setBannerSlider] = useState('');
  const [isReadMoreAuthor, setIsReadMoreAuthor] = useState(true);
  const [isReadMoreBook, setIsReadMoreBook] = useState(true);
  const [bookTalks, setbookTalks] = useState([]);
  const [bannerUrl, setBannerUrl] = useState('');
  const [discoverBooks, setDiscoverBooks] = useState([]);
  const toggleReadMoreAuthor = () => {
    setIsReadMoreAuthor(!isReadMoreAuthor);
  };
  const toggleReadMoreBook = () => {
    setIsReadMoreBook(!isReadMoreBook);
  };
  const [slider, setSlider] = useState([
    {
      id:1,
      title:"Banner 1",
      image: banner1,
    },
    {
      id:2,
      title:"Banner 2",
      image: banner1,
    },
    {
      id:3,
      title:"Banner 3",
      image: banner1,
    },
  ]);
   useEffect(async () => { 
    fetch(apiBaseUrl + 'sliders')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          setBannerSlider(result.banner_img);
          setBannerUrl(result.banner_url);
          if(result.data.sliders.length){
            let sliders = [];
            result.data.sliders.map((slider) => {

                sliders.push({
                  id:slider.id,
                  title: slider.title,
                  image: slider.image,
                })
            });
            setSlider(sliders);
            
          }
        } 
      }); 

      fetch(apiBaseUrl + 'of_month')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.author){
            setAuthorOfMonth({
              id:result.data.author.id,
              name:result.data.author.name,
              image:result.data.author.featured_image_large,
              description:result.data.author.description,
            });
            
          }
          if(result.data.book){
            setBookOfMonth({
              id:result.data.book.id,
              name:result.data.book.title,
              image:result.data.book.featured_image_large,
              description:result.data.book.description,
            });
            
          }
        } 
      }); 
       fetch(apiBaseUrl + 'book_talks')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.books.length){
            let bookTalk = [];

            result.data.books.map((book) => {
                
                bookTalk.push({
                  id:book.id,
                  image: book.book_talk_large,
                  name: book.title,
                  author: book.author_name,
                  cutPrice:book.offer_price,
                  price:book.sale_price,
                  offer_zone:book.offer_zone,
                })
            });
            setbookTalks(bookTalk);
            
          } else {
            setbookTalks([])
          }
        } else {
          setbookTalks([])
        }
      }); 
      fetch(apiBaseUrl + 'discover_new_read')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.books.length){
            let bookTalk = [];

            result.data.books.map((book) => {
                
                bookTalk.push({
                  id:book.id,
                  image: book.featured_image_large,
                })
            });
            setDiscoverBooks(bookTalk);
            
          } else {
            setDiscoverBooks([])
          }
        } else {
          setDiscoverBooks([])
        }
      }); 
 }, []);
  return (
    <div className="container">
      {/* <<<<<<<<<< MAIN BANNER >>>>>>>>> */}
      <div className=" home__banner">
        <Row>
          <Col>
            <Carousel fade controls={false} indicators={false}>
            {slider.map((data) => {
            return (
              <Carousel.Item>
                <img className="col-12" src={data.image} />
              </Carousel.Item>
            );
          })}
            </Carousel>
          </Col>

          <Col sm="12" md="12" lg="3">
            <div>
              {(bannerUrl) ? (
              (bannerSlider) ? (<a
                    href={bannerUrl}
                    style={{ textDecoration: "none", color: "inherit" }}
                  ><img className="col-12" src={bannerSlider} id="home__banner__right" /></a>) :(<a
                    href={bannerUrl}
                    style={{ textDecoration: "none", color: "inherit" }}
                  ><img className="col-12" src={school} id="home__banner__right" /></a>)
              ) : ((bannerSlider) ? (<img className="col-12" src={bannerSlider} id="home__banner__right" />) :(<img className="col-12" src={school} id="home__banner__right" />)
              )}
              
            </div>
          </Col>
        </Row>
      </div>

      {/* <<<<<<<<<< POPULAR LIST >>>>>>>>>>  /components/PopularList.js */}
      <PopularList />

      {/* <<<<<<<<< JUST ARRIVED >>>>>>>>>   src/components/JustArrived.js */}
      <JustArrived />

      {/* <<<<<<<<< BEST SELLERS   src/components/BestSellers.js   >>>>>>>>>   src/components/JustArrived.js */}

      <BestSellers />

      {/* <<<<<<<<< POPULA MALAYALA  src/components/Malayalam.js   >>>>>>>>>   src/components/JustArrived.js */}

      <Malayalam />

      {/* <<<<<<<<< WEB MAGAZINE BOOK REVIEW >>>>>>>>>>>> */}

      <div className="home__exclusive">
        <Row>
          <Col>
            <div className="home__magazine">
              <div className="home__magazine__content">
                <Container>
                  <Row>
                    <Col sm md="7">
                      <div className="home__magazine__left">
                        <div>
                          <h4> Exclusive</h4>
                          <h1> Web Magazine </h1>
                        </div>

                        <span>
                          <Link
                    to={'/web_magazine/'}
                    style={{ textDecoration: "none", color: "inherit" }}
                  ><ArrowForwardIcon id="magazine__arrow" /></Link>
                        </span>
                      </div>
                    </Col>
                    <Col
                      sm="12"
                      md="12"
                      xs={{ order: "first" }}
                      md={{ order: "last" }}
                    >
                      <img className="col-9" src={book} />
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </Col>
          <Col>
            <div className="home__magazine">
              <div className="home__magazine__content">
                <Container>
                  <Row>
                    <Col sm md="7">
                      <div className="home__magazine__left">
                        <div>
                          <h4> Watch </h4>
                          <h1>Book Reviews</h1>
                        </div>

                        <span>
                          <ArrowForwardIcon id="magazine__arrow" />
                        </span>
                      </div>
                    </Col>
                    <Col
                      sm="12"
                      md="12"
                      xs={{ order: "first" }}
                      md={{ order: "last" }}
                    >
                      <img className="col-12" src={review} />
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* <<<<<<<<< BOOK OF THE MONTH>>>>>>>>>>>> */}
      <div className="home__month__row">
        <Row>
         { bookOfTheMonth.description && (
          <Col md>
            <div className="home__month">
              <div className="home__month__content">
                <Row>
                  <Col md="4" id="month__book__col">
                    <img className="col-8 col-md-11" src={bookOfTheMonth.image} />
                  </Col>
                  <Col md="8">
                    <h6>Book of the month</h6>
                    <Link
            to={'/bookSingle/'+ bookOfTheMonth.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
             <h4>{bookOfTheMonth.name}</h4>
          </Link> <p>
                      {isReadMoreBook ? bookOfTheMonth.description.slice(0, 550) : bookOfTheMonth.description}
                      <span
                        onClick={toggleReadMoreBook}
                        style={{ color: "#46CE04", cursor: "pointer" }}
                      >
                        {isReadMoreBook ? "...read more" : " show less"}
                      </span>
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          )}
          { authorOfTheMonth.description && (
                <Col md>
            <Col md>
              <div className="home__month">
                <div className="home__month__content">
                  <Row>
                    <Col md="4" id="month__book__col">
                      <img className="col-8 col-md-11" src={authorOfTheMonth.image}  />
                    </Col>
                    <Col md="8">
                      <h6>Author of the month</h6>
                      <Link
            to={'/author/'+ authorOfTheMonth.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
             <h4>{authorOfTheMonth.name}</h4>
          </Link>
                     
                       <p>
                      {isReadMoreAuthor ? authorOfTheMonth.description.slice(0, 550) : authorOfTheMonth.description}
                      <span
                        onClick={toggleReadMoreAuthor}
                        style={{ color: "#46CE04", cursor: "pointer" }}
                      >
                        {isReadMoreAuthor ? "...read more" : " show less"}
                      </span>
                    </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Col>
            )}
          
        </Row>
      </div>

      {/* <<<<<<<<< BOOK TALKS  >>>>>>>>>>>> */}
      <div className="home__talks">
        <div className="home__talks__head__row ">
          <h5>Book Talks</h5>
          <Link
            to="/bookTalks"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <p>View all</p>
          </Link>
        </div>

        <Row>
        {bookTalks && bookTalks.map((data) => {
              return (
              <Col sm="auto" md="4">
            <Link
              to={'/blog/'+ data.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="home__talks__div">
                <img className="col-12" src={data.image} />
                <div className="home__talks__date">
                  <p>{data.creatd_at}</p>
                  <p>|</p>
                  <p>{data.author}</p>
                </div>

                <h5>
                 { data.name}
                </h5>
              </div>
            </Link>
          </Col>
              );
        })}
          
         
        </Row>
      </div>

      {/* <<<<<<<<< DISCOVER NEW  >>>>>>>>>>>> */}
      <div className="home__discover">
        <div className="home__discover__head__row ">
          <h5>Discover New Reads</h5>
          <Link
            to="/classic"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <p>View all</p>
          </Link>
        </div>
        <div className="home__discover__content">
          <Row>
          {discoverBooks && discoverBooks.map((data) => {
                return (<Col className="home__discover__col" sm="6" lg="3">
                  <Link
            to={'/bookSingle/'+ data.id}
            style={{ textDecoration: "none", color: "inherit" }}
          ><img className="col-12" src={data.image}/></Link>
            </Col>);
          })}
          </Row>
        </div>
      </div>
    
      <Featur />
    </div>
  );
}

export default Home;
