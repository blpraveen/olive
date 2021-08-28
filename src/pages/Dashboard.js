import React from "react";
import Featur from "../components/Featur";
import "../style/css/dashboard.css";

function MyOrder() {
  return (
    <div className='container'>
      <div className="body">
        <div className="dashboard-container ">
          <div className="dashboard-title">
            <p>DASHBOARD</p>
          </div>
          <div className="box-container">
            <div className="row">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                <div
                  className="dashboard-box"
                  style={{
                    background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                  }}
                >
                  <p>My Orders</p>
                  <img
                    className="dashboard-img1"
                    src={process.env.PUBLIC_URL + "/images/imoji01.svg"}
                    alt="my order"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                <div
                  className="dashboard-box"
                  style={{
                    background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                  }}
                >
                  <p>Bookmark</p>
                  <img
                    className="dashboard-img2"
                    src={process.env.PUBLIC_URL + "/images/imoji02.svg"}
                    alt="bookmark"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                <div
                  className="dashboard-box"
                  style={{
                    background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                  }}
                >
                  <p>Address</p>
                  <img
                    className="dashboard-img3"
                    src={process.env.PUBLIC_URL + "/images/imoji03.svg"}
                    alt="address"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                <div
                  className="dashboard-box"
                  style={{
                    background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                  }}
                >
                  <p>Profile</p>
                  <img
                    className="dashboard-img4"
                    src={process.env.PUBLIC_URL + "/images/imoji04.svg"}
                    alt="profile"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                <div
                  className="dashboard-box"
                  style={{
                    background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                  }}
                >
                  <p>Support</p>
                  <img
                    className="dashboard-img5"
                    src={process.env.PUBLIC_URL + "/images/imoji05.svg"}
                    alt="support"
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                <div
                  className="dashboard-box"
                  style={{
                    background: `url('${process.env.PUBLIC_URL}/images/box1.jpg')`,
                  }}
                >
                  <p>Password</p>
                  <img
                    className="dashboard-img6"
                    src={process.env.PUBLIC_URL + "/images/imoji06.svg"}
                    alt="password"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Featur />
    </div>
  );
}

export default MyOrder;
