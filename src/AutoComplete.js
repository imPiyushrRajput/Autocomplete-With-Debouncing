import React, { useState, useRef, useEffect } from "react";

const AutoComplete = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchAutoBox, setSearchAutoBox] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const fetchData = () => {
    console.log("Logging");
    setSearchResult([
      { name: "Piyush" },
      { name: "Ramakant" },
      { name: "Rajput" },
    ]);
  };

  const debouncing = function (funFetchData, interval) {
    let timeout = null;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(funFetchData, interval);
    };
  };

  const handleChange = debouncing(fetchData, 600);

  useEffect(() => {
    inputRef.current.focus();
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    const { current } = wrapperRef;
    if (current && !current.contains(event.target)) {
      setSearchAutoBox(false);
    }
  };

  return (
    <div ref={wrapperRef} className="search-box-wrapper">
      <div className="search-input">
        <input
          ref={inputRef}
          onClick={() => setSearchAutoBox(!searchAutoBox)}
          type="text"
          placeholder="Search"
          onKeyUp={handleChange}
          onChange={(event) => setSearchKey(event.target.value)}
          value={searchKey}
        />
      </div>
      {searchAutoBox && (
        <div className="search-box-autocomplete">
          {searchResult.map((value, index) => {
            return (
              <div key={index} className="search-result">
                {value.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
