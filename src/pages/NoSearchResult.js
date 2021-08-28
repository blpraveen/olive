import Dropdown from "react-bootstrap/Dropdown";
import "../style/css/categories.css";
import "../style/css/no__result.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import SearchIcon from "@material-ui/icons/Search";
import Featur from "../components/Featur";
import image from "../images/no-result.png";
import "../style/css/searchResult.css";
function NoSearchResult() {
  return (
    <div className="no__result container">
      {/* <Container> */}
        <Row>
          <Col className="search__items_col" md="3">
            {/* SEARCH OPTIONS LEFT OF THE PAGE */}
            <div className="search__items">
              <div className="search__items__head">
                <h5>Search Author</h5>
                <div className="search__items__input ">
                  <input />
                  <div className="search__items__icon__div">
                    <SearchIcon
                      type="button"
                      onClick={""}
                      id="search__items__icon"
                    />
                  </div>
                </div>
              </div>

              {/*  Language */}
              <Dropdown id="search__dropdown">
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  Language
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="search__item">
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>English</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>Malayalam</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>Hindi</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>Hindi</p>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {/* FORMAT */}
              <Dropdown id="search__dropdown">
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  Format
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="search__item">
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>Paperback</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>Hard cover</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>E books</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>Audio Books</p>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {/* FILTER BY PRICE */}

              <Dropdown id="search__dropdown">
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  Filter By Price
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="search__item">
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>Low - High</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>High - Low</p>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {/* BY DATE */}

              <Dropdown id="search__dropdown">
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  Filter By Price
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="search__item">
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>Low - High</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>High - Low</p>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {/* BY REVIEW */}

              <Dropdown id="search__dropdown">
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  By Reviews
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="search__item">
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>5 Star</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>4 Star</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>3 Star</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>2 Star</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>1 Star</p>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              {/* BY PUBLISHER */}

              <Dropdown id="search__dropdown">
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  By Publisher
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <div className="search__item">
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>DC BOOKS</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>PUBLISHER 1</p>
                    </div>
                    <div className="search__item__row">
                      <input type="checkbox" /> <p>PUBLISHER 3</p>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>

          <Col md="7">
            <div className="no__result__content">
              <div className="search__head__row">
                <h5>
                  Search result for "
                  <span style={{ color: "#46CE04" }}>Rising Like a Storm</span>"
                </h5>
                {/* <p>5 Books Found</p> */}
              </div>
              <div className="no__result__image">
                <div className="no__result__image__head">
                  <h2>NO BOOKS FOUND</h2>
                  <h6>Please try another keyword</h6>
                </div>
                <div className="no__result__image__cover">
                  <img className="col-12" src={image} />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      {/* </Container> */}

      <Featur />
    </div>
  );
}

export default NoSearchResult;
