import React from "react";
import Featur from "../components/Featur";
import "../style/css/bookTalks.css";

function BookTalks() {
  return (
    <div>
      <div className="body">
        <div className="Books-container">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <div className="book-talks">
                <p className="title">Book Talks</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
              <div className="book">
                <img
                  className="image"
                  src={process.env.PUBLIC_URL + "/images/image1.png"}
                  alt="image1"
                />
                <p className="date">10 April 2021 | Admin</p>
                <p className="book-text">
                  Benefits of Reading How It Can Positively Affect Your Life
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
              <div className="book">
                <img
                  className="image"
                  src={process.env.PUBLIC_URL + "/images/image2.png"}
                  alt="image1"
                />
                <p className="date">10 April 2021 | Admin</p>
                <p className="book-text">The Art of reading, read and lead</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
              <div className="book">
                <img
                  className="image"
                  src={process.env.PUBLIC_URL + "/images/image3.png"}
                  alt="image3"
                />
                <p className="date">10 April 2021 | Admin</p>
                <p className="book-text">
                  Benefits of Reading How It Can Positively Affect Your Life
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
              <div className="book">
                <img
                  className="image"
                  src={process.env.PUBLIC_URL + "/images/image4.png"}
                  alt="image3"
                />
                <p className="date">10 April 2021 | Admin</p>
                <p className="book-text">
                  Benefits of Reading How It Can Positively Affect Your Life
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
              <div className="book">
                <img
                  className="image"
                  src={process.env.PUBLIC_URL + "/images/image5.png"}
                  alt="image3"
                />
                <p className="date">10 April 2021 | Admin</p>
                <p className="book-text">The Art of reading, read and lead</p>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4">
              <div className="book">
                <img
                  className="image"
                  src={process.env.PUBLIC_URL + "/images/image6.png"}
                  alt="image3"
                />
                <p className="date">10 April 2021 | Admin</p>
                <p className="book-text">
                  Benefits of Reading How It Can Positively Affect Your Life
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Featur />
    </div>
  );
}

export default BookTalks;
