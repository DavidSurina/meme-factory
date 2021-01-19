import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [memeArray, setMemeArray] = useState([]);
  const [counter, setCounter] = useState(0);
  const [firstCaption, setFirstCaption] = useState("");
  const [secondCaption, setSecondCaption] = useState("");

  let memeUrl;

  useEffect(() => {
    const getMemeArray = async() => {
      const arr = await axios
      .get("/get_memes/")
      .then((response) =>response.data.data.memes);
      console.log(arr);
    return arr;
    };
    getMemeArray().then(response => {
      setMemeArray(response)
      memeUrl = memeArray[counter].url;
    });
  }, []);

  return (
    <div className="app-wrapper">
      <h1 className="main-heading">Meme Factory</h1>
      <div className="input-field-wrapper">
        <input className="text-input" type="field" placeholder="Top Line"></input>
        <input className="text-input" type="field" placeholder="Bottom Line"></input>
      </div>
      <form className="btn-wrapper">
        <button onClick={() =>{
          let i = counter;
          setCounter(i++);
          console.log(counter);
        }} className="btn" value="Change Picture">Change Picture</button>
        <button className="btn" >Load Picture</button>
        <input className="btn" type="submit" value="Generate"></input>
      </form>
      <div className="image-wrapper">
        <img className="meme-img" src={memeUrl} />
        <p className="first-cap"></p>
        <p className="second-cap"></p>
      </div>
    </div>
  );
}

export default App;
