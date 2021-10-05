import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({ data,handleSelect }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {

      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleClick = async (pokemon) => {
    try{
    let response = await fetch(`http://localhost:5000/pokemon/${pokemon}`);

     response  = await response.json();

     if(response && response.error){
        clearInput();
        setFilteredData([]);
     }
     else{
        setFilteredData([]);
        setWordEntered(pokemon);
     }
        handleSelect(response);
    }
    catch(error){
      setFilteredData([]);
      setWordEntered("");
      handleSelect({ error: {message:"Something went Wrong! Please try again"} });
    }
  }
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    handleSelect("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder="Search pokemon"
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {(filteredData.length === 0 && !wordEntered)? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !==0 && (
        <div className="dataResult">
          <ul>
          {filteredData.slice(0, 10).map((value, key) => {
            return (
              <li className="dataItem" href={value.link} target="_blank" rel="noreferrer" key={value.name} data-testid={value.name} onClick={()=>handleClick(value.name)}>
                <p>{value.name} </p>
              </li>
            );
          })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
