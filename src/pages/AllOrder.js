import "../style/css/allOrder.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useState } from "react";
import Featur from "../components/Featur";
function AllOrder() {
  const [active] = useState([
    {
      id: 23424,
      date: "18-02-1021",
      status: "Shipped",
      quantity: "5",
      total: "1,855.00",
    },
  ]);
  const [past] = useState([
    {
      id: 23424,
      date: "18-02-1021",
      status: "Shipped",
      quantity: "5",
      total: "1,855.00",
    },
    {
      id: 23424,
      date: "18-02-1021",
      status: "Shipped",
      quantity: "5",
      total: "1,855.00",
    },

    {
      id: 23424,
      date: "18-02-1021",
      status: "Shipped",
      quantity: "5",
      total: "1,855.00",
    },

    {
      id: 23424,
      date: "18-02-1021",
      status: "Shipped",
      quantity: "5",
      total: "1,855.00",
    },

    {
      id: 23424,
      date: "18-02-1021",
      status: "Shipped",
      quantity: "5",
      total: "1,855.00",
    },

    {
      id: 23424,
      date: "18-02-1021",
      status: "Shipped",
      quantity: "5",
      total: "1,855.00",
    },

    {
      id: 23424,
      date: "18-02-1021",
      status: "Shipped",
      quantity: "5",
      total: "1,855.00",
    },

    {
      id: 23424,
      date: "18-02-1021",
      status: "Shipped",
      quantity: "5",
      total: "1,855.00",
    },
  ]);
  return (
    <div className="all__order container">
      <div className="path ">
        <p>Home </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p>Dashboard </p>
        <ArrowForwardIosIcon id="path__icon" />
        <p> Myorders</p>
      </div>

      <div className="all__order__content">
        <div className="all__order__header">
          <h3>My Orders</h3>
        </div>

        {/* <<<<<<<<<<<<< ACTIVE ORDERS >>>>>>>>>>>>>>>> */}
        <div className="active__order">
          <h5>Active Orders</h5>

          <Row>
            {active.map((data) => {
              return (
                <Col xs="12" sm="" md="4">
                  <div className="order__box">
                    <div className="order__box__content">
                      <div className="order__box__first__row">
                        <div className="order__box__first__row__left">
                          <p>
                            Order id:<span>{data.id}</span>{" "}
                          </p>
                          <h6>
                            Date: <span>{data.date}</span>
                          </h6>
                        </div>
                        <div className="order__box__first__row__right">
                          <p>Status: </p>
                          <h6>{data.status}</h6>
                        </div>
                      </div>

                      <div className="order__box__second__row">
                        <div className="order__box__second__row__left">
                          <p>
                            <span>{data.quantity}</span> items{" "}
                          </p>
                          <h6>
                            Total: ₹<span>{data.total}</span>
                          </h6>
                        </div>
                        {/* <div> */}
                        <ArrowForwardIcon id="order__arrow" />
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>

        {/*<<<<<<<<<<<<< PAST ORDERS >>>>>>>>>>> */}
        <div className="past__order">
          <h5>Past Orders</h5>

          <Row>
            {past.map((data) => {
              return (
                <Col xs="12" sm="6" md="5" lg="4" xl="3">
                  <div className="order__box">
                    <div className="order__box__content">
                      <div className="order__box__first__row">
                        <div className="order__box__first__row__left">
                          <p>
                            Order id:<span>{data.id}</span>{" "}
                          </p>
                          <h6>
                            Date: <span>{data.date}</span>
                          </h6>
                        </div>
                        <div className="order__box__first__row__right">
                          <p>Status: </p>
                          <h6>{data.status}</h6>
                        </div>
                      </div>

                      <div className="order__box__second__row">
                        <div className="order__box__second__row__left">
                          <p>
                            <span>{data.quantity}</span> items{" "}
                          </p>
                          <h6>
                            Total: ₹<span>{data.total}</span>
                          </h6>
                        </div>
                        {/* <div> */}
                        <ArrowForwardIcon id="order__arrow" />
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>

      <Featur />
    </div>
  );
}

export default AllOrder;
