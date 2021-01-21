import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [memeArray, setMemeArray] = useState([]);
  let [memeUrl, setMemeUrl] = useState("");
  let [counter, setCounter] = useState(0);
  let [firstCaption, setFirstCaption] = useState("");
  let [secondCaption, setSecondCaption] = useState("");


  useEffect(() => {
    const getMemeArray = async() => {
      const response = await axios
      .get("/get_memes/")
      // you dont need the then with await you will directly get the data in arr
      //.then((response) =>response.data.data.memes);
      //console.log(arr);
      return response.data.data.memes;
    };
    getMemeArray().then(response => {
      console.log(response)
      setMemeArray(response)
      setMemeUrl(response[counter].url) 
    });
  }, []);

  console.log(memeArray);
  console.log(memeUrl);
  return (
    <div className="app-wrapper">
      <h1 className="main-heading">Meme Factory</h1>
      <div className="input-field-wrapper">
        <input className="text-input" type="field" placeholder="Top Line" minLength="3" maxlength="30" value={firstCaption} onChange={(e)=> setFirstCaption(e.target.value)}></input>
        <input className="text-input" type="field" placeholder="Bottom Line" minLength="3" maxlength="30" value={secondCaption} onChange={(e)=> setSecondCaption(e.target.value)}></input>
      </div>
      <form className="btn-wrapper">
        <button onClick={(e) =>{
          e.preventDefault();
          if (counter >0){
            setCounter(--counter);
            setMemeUrl(memeArray[counter].url)
          }
        }} className="btn" value="Change Picture">Prev Picture</button>
        <button onClick={(e) =>{
          e.preventDefault();
          setCounter(++counter);
          setMemeUrl(memeArray[counter].url)
        }} className="btn" value="Change Picture">Next Picture</button>
        <button className="btn" >Load Picture</button>
        <input className="btn" type="submit" value="Generate"></input>
      </form>
      <div className="image-wrapper">
        <img className="meme-img" src={memeUrl} />
        <p className="first-cap">{firstCaption}</p>
        <p className="second-cap">{secondCaption}</p>
      </div>
    </div>
  );
}

export default App;
