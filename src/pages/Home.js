import ".././style/css/home.css";
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

import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Featur from "../components/Featur";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      {/* <<<<<<<<<< MAIN BANNER >>>>>>>>> */}
      <div className="container home__banner">
        <Container>
          <Row>
            <Col lg="9  ">
              <Carousel fade controls={false} indicators={false}>
                <Carousel.Item>
                  <img className="col-12" src={banner1} />

                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img className="col-12" src={banner1} />
                </Carousel.Item>
                <Carousel.Item>
                  <img className="col-12" src={banner1} />
                  {/* className="d-block w-100" */}
                </Carousel.Item>
              </Carousel>
            </Col>

            <Col sm="12" md="12" lg="3">
              <div>
                <img className="col-12" src={school} id="home__banner__right" />
              </div>
            </Col>
          </Row>
        </Container>
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
        <Container>
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
        </Container>
      </div>

      {/* <<<<<<<<< BOOK OF THE MONTH>>>>>>>>>>>> */}
      <div className="home__month__row">
        <Container>
          <Row>
            <Col md>
              <div className="home__month">
                <div className="home__month__content">
                  <Container>
                    <Row>
                      <Col md="4">
                        <img className="col-8 col-md-11" src={ayurveda} />
                      </Col>
                      <Col md="8">
                        <h6>Book of the month</h6>
                        <h4>Ayurveda: medicine without side-effects</h4>
                        <p>
                          This book is not a defence of Ayurveda. A sound,
                          scientific framework of healthcare that has saved
                          countless lives over 5000 years does not need
                          defenders. It needs champions, and to be given wings.
                          In a world that needs Ayurveda more than ever, Dr G.G.
                          Gangadharan, who has been researching both the theory
                          and the practice for the past thirty-five years, shows
                          in his book the logic behind the science.
                          <span style={{ color: "#46CE04" }}>Read More</span>
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            </Col>
            <Col md>
              <Col md>
                <div className="home__month">
                  <div className="home__month__content">
                    <Container>
                      <Row>
                        <Col md="4">
                          <img className="col-8 col-md-11" src={mt} />
                        </Col>
                        <Col md="8">
                          <h6>Author of the month</h6>
                          <h4>M. T. Vasudevan Nair</h4>
                          <p>
                            Madath Thekkepaattu Vasudevan Nair (born 1933),
                            popularly known as MT, is an Indian author,
                            screenplay writer and film director.[1] He is a
                            prolific and versatile writer in modern Malayalam
                            literature, and is one of the masters of
                            post-Independence Indian literature.[2][3] He was
                            born in Kudallur, a small village in the present day
                            Anakkara panchayath in Pattambi Taluk, Palakkad
                            district (Palghat), which was under the Malabar
                            District in the Madras Presidency of the British
                            Raj.
                            <span style={{ color: "#46CE04" }}>Read More</span>
                          </p>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
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
        <Container>
          <Row>
            <Col sm="auto" md="4">
              <Link to='/blog' style={{textDecoration:'none',color:'inherit'}}>

              <div className="home__talks__div">
                <img className="col-12" src={talk1} />
                <div className="home__talks__date">
                  <p>10 April 2021 </p>
                  <p>|</p>
                  <p>Admin</p>
                </div>

                <h5>
                  Benefits of Reading How It Can Positively Affect Your Life
                </h5>
              </div>
              </Link>
             
            </Col>
            <Col md="4">
            <Link to='/blog' style={{textDecoration:'none',color:'inherit'}}>
              <div className="home__talks__div">
                <img className="col-12" src={talk2} />
                <div className="home__talks__date">
                  <p>10 April 2021 </p>
                  <p>|</p>
                  <p>Admin</p>
                </div>

                <h5>The Art of reading, read and lead</h5>
              </div>
              </Link>
            </Col>
            <Col md="4">
            <Link to='/blog' style={{textDecoration:'none',color:'inherit'}}>
              <div className="home__talks__div">
                <img className="col-12" src={talk3} />
                <div className="home__talks__date">
                  <p>10 April 2021 </p>
                  <p>|</p>
                  <p>Admin</p>
                </div>

                <h5>Benefits Books: How It Can Positively Affect Your Life</h5>
              </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* <<<<<<<<< DISCOVER NEW  >>>>>>>>>>>> */}
      <div className="home__discover">
        <div className="home__discover__head__row ">
          <h5>Discover New Reads</h5>
          <Link to='/classic' style={{textDecoration:'none',color:'inherit'}}>
          <p>View all</p>
          </Link>
     
        </div>
        <div className="home__discover__content">
          <Container>
            <Row>
              <Col className="home__discover__col" sm="6" lg="3">
                <img className="col-12" src={discover1} />
              </Col>
              <Col className="home__discover__col" sm="6" lg="3">
                <img className="col-12" src={discover2} />
              </Col>
              <Col className="home__discover__col" sm="6" lg="3">
                <img className="col-12" src={discover3} />
              </Col>
              <Col className="home__discover__col" sm="6" lg="3">
                <img className="col-12" src={discover4} />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      {/* FEATURE ROW */}
      <Featur />
    </div>
  );
}

export default Home;
