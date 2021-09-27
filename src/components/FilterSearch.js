import "../style/css/categories.css";
import "./../style/css/justArrived.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import { useState,useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import FilterListIcon from "@material-ui/icons/FilterList";

const FilterSearch = ({ params }) => {

  const [filterList, setFilterList] = useState({});
  const [publishers, setPublishers] = useState({list : []})
  const [format, setFormat] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [language, setLanguage] = useState({list : []});
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  const [openFilter, setOpenFilter] = useState(false);
   const [popularCategory,setPopularCategory] = useState([]);
  const [filterRq,setFilterRq] =  useState([]);
  const [showButton,setShowbutton] =  useState(false);
  const [serchString,setSerchString] =  useState('');
  const [showPublish,setShowPublish] =  useState(true);
  function callbackParent(){
       params.data(filterRq);
  }
  function searchCategory(){
    params.search(serchString); 
  }
  function resetFilter(e){
    e.target.reset();
    return false;
  }
  function handleFilterChange(event,id,attribute,type=false){
    if (event.target.checked) {
      let req = filterRq;
      let found =false
      for(let i in req){
        let item = req[i];
        if(type){
          if(item.attribute == item.attribute){
            found= true;
          }
        } else {
          if(item.id == id && item.attribute == item.attribute){
            found= true;
          }  
        }
        
      }
       if(type){
          if(!found){
            req.push({id:id,attribute:attribute});
          } else {
             let data = [];
              for(let i in req){
                let item = req[i];
                if(item.attribute == attribute){
                } else {
                  data.push(item);
                }
              }
               data.push({id:id,attribute:attribute});
               req = data;
          }
       } else {
        if(!found){
          req.push({id:id,attribute:attribute});
        }
      }
      setFilterRq(req);
      setShowbutton(true);
      console.log(req);
    } else {
      let req = filterRq;
      let found =false;
      let data = [];
      for(let i in req){
        let item = req[i];
        if(item.id == id && item.attribute == attribute){
        } else {
          data.push(item);
        }
      }
      setFilterRq(data);
      console.log(data);
      if(data.length){
        setShowbutton(true);      
      } else {
        setShowbutton(false);  
      }
    
    }
  }
  useEffect(async () => { 
    if( typeof params.showPublish != 'undefined'){
      setShowPublish(false);
    }
    fetch(apiBaseUrl + 'attributes')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          let attribute = {
            publishers:result.data.publishers,
            reviews:result.data.reviews,
            date:result.data.date,
            format:result.data.format,
            language:result.data.language,
            price:result.data.price,
          };
          let format1 = [];
            result.data.format.map((data,index) => {

                format1.push({
                  id: result.data.format[index].id,
                  value: result.data.format[index].value,
                  attribute_id: result.data.format[index].attribute_id,
                })
            });
            attribute['format'] = format1
          setFilterList(attribute)
         
          
        } 
      }); 
  }, []);
  return (
    <Col className="search__items_col " xs="12" lg="2">
    <form onSubmit={(e)=>resetFilter(e)}>
      <div className="filter__icon__div">
        <FilterListIcon
          id="filter__icon"
          onClick={() => setOpenFilter(!openFilter)}
          type="button"
        />
      </div>

      <div className={openFilter ? "search__items__open" : "search__items"}>
        <div className="search__items__head">
          <h5>Search</h5>
          <div className="search__items__input ">
            <input onChange={(e) => setSerchString(e.target.value)} />
            <div className="search__items__icon__div">
              <SearchIcon type="button"onClick={() => searchCategory()} id="search__items__icon" />
            </div>
          </div>
        </div>

        {/*  Language */}
        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            Language
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
             {filterList && filterList.language && (filterList.language.list.map((data) => {
              return (<div className="search__item__row">
                <input type="checkbox" onChange={(e)=>handleFilterChange(e,data.id,filterList.language.id)}/> <p>{data.name}</p>
              </div>)
          }) )}
             </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* FORMAT */}
        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            Format
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
            {filterList && (filterList.format && (filterList.format.map((data) => {
              return (<div className="search__item__row">
                              <input type="checkbox" onChange={(e)=>handleFilterChange(e,data.id,data.attribute_id)}/> <p>{data.value}</p>
                            </div>)
            })))}
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* FILTER BY PRICE */}

        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            Filter By Price
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
              <div className="search__item__row">
                <input type="radio"  name="price" onChange={(e)=>handleFilterChange(e,1,filterList.price.attribute_id,true)}/> <p>Low - High</p>
              </div>
              <div className="search__item__row">
                <input type="radio"  name="price" onChange={(e)=>handleFilterChange(e,2,filterList.price.attribute_id,true)}/> <p>High - Low</p>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* BY DATE */}

        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            By Date
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
              <div className="search__item__row">
                <input type="radio" name="date" onChange={(e)=>handleFilterChange(e,1,filterList.date.attribute_id,true)}/> <p>New - Old</p>
              </div>
              <div className="search__item__row">
                <input type="radio"  name="date" onChange={(e)=>handleFilterChange(e,2,filterList.date.attribute_id,true)}/> <p>Old - New</p>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        {/* BY REVIEW */}
        {filterList && filterList.reviews && (
        <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            By Reviews
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
            {filterList.reviews.map((data) => {
              return (<div className="search__item__row">
                <input type="checkbox" onChange={(e)=>handleFilterChange(e,data.id,data.attribute_id)}/> <p>{data.value}</p>
              </div>)
            })}
            </div>
          </Dropdown.Menu>
        </Dropdown>)}

        {/* BY PUBLISHER */}
        {showPublish && (
            <Dropdown id="search__dropdown">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            By Publisher
          </Dropdown.Toggle>
          <Dropdown.Menu id="dropdown__menu">
            <div className="search__item">
                {filterList && (filterList.publishers &&  (filterList.publishers.list.map((data) => {
                return (<div className="search__item__row">
                <input type="checkbox" onChange={(e)=>handleFilterChange(e,filterList.data.id,filterList.publishers.id)}/> <p>{data.name}</p>
                </div>)
                })))}
            
              
            </div>
          </Dropdown.Menu>
        </Dropdown>

        )}
        
      {showButton && (<div>
        <button type="submit" className="btn btn-info" >Reset</button>
        <button type="button" className="btn btn-success" onClick={()=>callbackParent()} style={{marginLeft:"3px"}}>Search</button>
      </div>)}
      </div>
      </form>
    </Col>
  );
}

export default FilterSearch;
