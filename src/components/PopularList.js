import "./../style/css/popularList.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


import placeholder from "../images/placeholder.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10,
    
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 6,
  
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 4,

  },
};

function PopularList() {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const [diableLinks, setDiableLinks] = useState(true);
  const [popularCategory,setPopularCategory] = useState([
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
    {
      category: "",
      image: placeholder,
    },
   
    {
      category: "",
      image:  placeholder,
    },
    {
      category: "",
      image:placeholder,
    },
  ]);
  useEffect(async () => { 
    fetch(apiBaseUrl + 'categories')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.categories.length){
            let popularCategory = [];
            result.data.categories.map((category) => {
                console.log(category);
                popularCategory.push({
                  id: category.id,
                  category: category.name,
                  image: category.featured_image_small,
                })
            });
            setPopularCategory(popularCategory);
            
          } else {
            setPopularCategory([]);
          }
        } else {
          setPopularCategory([]);
        } 
        setDiableLinks(false);
      }); 
 }, []);
  return (
    <div className="popular__list ">
        <Row>
          <Col lg="1">
            <div className="popular__list__title">
              <h6>Popular categories</h6>
            </div>
          </Col>
          <Col lg="11"  style={diableLinks ? { pointerEvents: 'none' } : {}}>
            <Carousel
              swipeable={false}
              draggable={false}
              //   showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              autoPlay={true}
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
              {popularCategory.map((data) => {
                return (
                  <Link
                    to={'/category/'+ data.id}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="popular__img__div">
                      <img src={data.image} />
                      <p>{data.category}</p>
                    </div>
                  </Link>
                );
              })}

            
            </Carousel>
          </Col>
        </Row>
     
    </div>
  );
}

export default PopularList;
