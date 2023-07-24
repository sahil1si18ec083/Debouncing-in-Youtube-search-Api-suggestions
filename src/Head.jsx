import React, { useEffect, useState } from "react";
import youtubeSearchApi from "./Contants";
const Head = ({ setSideNavVisibility }) => {
  const [suggestionsObject, setSuggestionsObject] = useState({});
  const [searchedValue, setSearchValue] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [suggestionFlag, setSuggestionFlag] = useState(false);
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };
  useEffect(() => {
    // debouncing happening after 200ms
    const timer = setTimeout(() => {
      if (suggestionsObject.hasOwnProperty(searchedValue)) {
        setSearchSuggestions(suggestionsObject[searchedValue]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchedValue]);
  // search api is triggered every time we type something in search bar
  const getSearchSuggestions = () => {
    fetch(youtubeSearchApi + searchedValue)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setSearchSuggestions(res?.at(1));

        setSuggestionsObject({
          ...suggestionsObject,
          [searchedValue]: res?.at(1)
        });
      });
  };
  console.log(suggestionsObject);
  return (
    <div>
      <div className="flex header">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZVrUh1KQmCQpMH0wIjWZ6D55SjOSDgiffC6Qt9Cu-FKZTg56zHrae5HptJVX_pHLEzo0&usqp=CAU"
            alt=""
            style={{ width: "4rem", height: "3rem", cursor: "pointer" }}
          />
        </div>
        <div className="flex">
          <span>
            <div>
              <input
                type="text"
                value={searchedValue}
                onChange={(event) => handleChange(event)}
                onFocus={() => {
                  setSuggestionFlag(true);
                }}
                onBlur={() => {
                  setSuggestionFlag(false);
                }}
              />
            </div>
            {suggestionFlag && (
              <div className="search-suggestions">
                <ul>
                  {searchSuggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </span>
          <button className="search">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Head;
