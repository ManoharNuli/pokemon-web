import React,{useState} from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import pokemons from "./Data.json";
import Description from "./Components/Description";
import Error from "./Components/Error";

function App() {
      const [description, setDecription] = useState("");
      const [error,setError] = useState('');
      const handleCallback = (value) => {

        if(value.error){
          setError(value.error.message);
        }
        else{
          setError(false);
          setDecription(value.description);
        }

      }
  return (
    <div className="container">
      <h1>Find out the Shakespearean description of your favourite pokemon</h1>
      <SearchBar data={pokemons} handleSelect={handleCallback}/>
      {description && <Description value={description}/>}
      {error && <Error value={error}/>}
    </div>
  );
}

export default App;
  