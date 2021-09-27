import React, { useState,useEffect  } from "react";
import Select from 'react-select';
import { Link ,useParams} from "react-router-dom";

const AutoComplete = ({ suggestions }) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const [searchCategory,setSearchCategory] = useState('');
  const [categories,setCategories] =useState([]);
  const customStyles = {
  option: (provided, state) => ({
    ...provided,
   font: 'normal normal normal 12px/14px DM Sans',
   fontFamily: "'DM Sans', sans-serif",
   letterSpacing: '0px',
   color: '#1C2633',
    opacity:'0.49',
    margin: 'auto',
    marginLeft: '20px',
    width:'300px'
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 200,
  })
}
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const onChange = (e) => {

    const userInput = e.target.value;
    if(userInput.length > 2){
        const data = {
              category: searchCategory,
              search: userInput
          };
          const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      };
      fetch(apiBaseUrl + 'search', requestOptions)
        .then(response => {
          return response.json();
        }).then(result => {
            if(result.status){
              console.log('asds');
              if(result.data.books.length){
                 setFilteredSuggestions(result.data.books); 
              } else {
                setFilteredSuggestions([]);  
              }
              
            } else {
              setFilteredSuggestions([]);
            }

        })
    }
    /*const unLinked = suggestions.map(function (suggestion) {
        //suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    });*/
    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.label.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };
   useEffect(async () => { 
    fetch(apiBaseUrl + 'categories')
      .then(response => {
        return response.json();
      }).then(result => {
        if(result.status){
          if(result.data.categories.length){
            let category_list = [];
            result.data.categories.map((category) => {
                category_list.push({
                  label: category.name,
                  value: category.id
                })
            });
            setCategories(category_list);
            
          }
        } 
      }); 
  },[])
  const onKeyDown = (e) => {
        if(e.keyCode == 13){
             setInput(e.target.value);
        }
        if(e.keyCode == 38){
          
        }
        if(e.keyCode == 40){
          
        }
  }
   const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };
  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = "suggestion-active";
          }
          return (
            <li className={className} key={suggestion}>
              <Link to={'/bookSingle/'+ suggestion.id} id="logo__link">
                  <img src={suggestion.featured_image_large} />
                  {suggestion.title}
                </Link>
              
            </li>
          );
        })}
      </ul>
    ) : (
      <div class="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>

    );
  };

    return (
    <>
      <Select  onChange={(event) => setSearchCategory(event.value)} options={categories} styles={customStyles} placeholder="All Categories" className='category-container' classNamePrefix="category-select"/>
      
    <div className="autocomplete-container">
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {showSuggestions && input && <SuggestionsListComponent />}
      </div>
    </>
  );
};
export default AutoComplete;