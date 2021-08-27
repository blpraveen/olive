import "./../style/css/popularList.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import self from "../images/popular/self.png";
import scifi from "../images/popular/scifi.png";
// import fiction from '../images/popular/fiction.png'
import self1 from "../images/popular/self1.png";
import westerns from "../images/popular/westerns.png";
import thriller from "../images/popular/thriller.png";
import fiction1 from "../images/popular/fiction1.png";
import romance from "../images/popular/romance.png";
import fiction from "../images/popular/fiction.png";
import dystopian from "../images/popular/dystopian.png";
import mystri from "../images/popular/mystri.png";
import sample from "../images/popular/single.png";
import review from "../images/popular/review.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Link } from "react-router-dom";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 8,
    //   slidesToSlide: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
    //   slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,
    //   slidesToSlide: 1
  },
};

function PopularList() {
  const [data] = useState([
    {
      category: "Self ",
      image: review,
    },
    {
      category: "Westerns",
      image: westerns,
    },
    {
      category: "Thriller",
      image: thriller,
    },
    {
      category: "Mystery",
      image: mystri,
    },
    {
      category: "Fiction",
      image: fiction1,
    },
    {
      category: "Mystery",
      image: mystri,
    },
    {
      category: "Self Help",
      image: self,
    },
    {
      category: "Westerns",
      image: westerns,
    },
    {
      category: "Thriller",
      image: thriller,
    },
    {
      category: "Mystery",
      image: mystri,
    },
    {
      category: "Fiction",
      image: fiction1,
    },
    {
      category: "Mystery",
      image: mystri,
    },
  ]);
  return (
    <div className="popular__list ">
      <Container>
        <Row>
          <Col lg="1">
            <div className="popular__list__title">
              <h6>Popular categories</h6>
            </div>
          </Col>
          <Col lg="11">
            <Carousel
              swipeable={false}
              draggable={false}
              //   showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              // autoPlay={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={2000}
              customTransition={"ease 2000ms"}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              //   deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
              itemClass="popular__ani"
            >
              {data.map((data) => {
                return (
                  <Link
                    to="/categories"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="popular__img__div">
                      <img src={data.image} />
                      <p>{data.category}</p>
                    </div>
                  </Link>
                );
              })}

              {/* <div className='popular__img__div'>
                <img src={self} />
                <p>Self Help</p>
              </div>
              <div className='popular__img__div'>
                <img src={westerns} />
                <p>Westerns</p>
              </div>
              <div className='popular__img__div'>
                <img src={thriller} />
                <p>Thriller</p>
              </div>
              <div className='popular__img__div'>
                <img src={mystri} />
                <p>Mystery</p>
              </div>
            
              <div className='popular__img__div'>
                <img src={fiction1} />
                <p>Fiction</p>
              </div>
              <div className='popular__img__div'>
                <img src={romance} />
                <p>Romance</p>
              </div>
              <div className='popular__img__div'>
                <img src={dystopian} />
                <p>Dystopian</p>
              </div>
              <div className='popular__img__div'>
                <img src={self1} />
                <p>Self Help</p>
              </div>
              <div className='popular__img__div'>
                <img src={fiction} />
                <p>Fiction</p>
              </div> */}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PopularList;
