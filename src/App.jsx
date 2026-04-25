//  https://random-word-api.herokuapp.com/word?length=7 
import { useEffect, useRef, useState } from "react";
import {Header,AttemptsButton,Won,Lost,alphaState,Alphabet,InputBox} from "./main.jsx"
import initialAttempts from "./data.js"
import { wordList } from "./data.js";
export default App;
//const original = initialAttempts;  //copy too reset! //need to gert back on this !
// let global= null;
function App(){
  const original=useRef(initialAttempts);
  const[newGame,setNewGame] = useState(0)
  const[word,setWord] = useState("")
  const [attemptsArray,setattemptsArray] = useState(original.current); // the boxes like the assembly!
  const [wrongCount,setWrongCount] = useState(0);     // tracking the wrong count!
  const [correctCount,setCorrectCount] = useState(0); // tracking correct count!
  const [wordDisplay,setWordDisplay] = useState([])   // answershowing buttons
  const [alphabuttons,setAlphaButtons]= useState(alphaState)    // alpha buttons green or red state
  const [gussedWords,setgussedWords] = useState([]); // keeping track of the words to prevent reclicks! 

  function randomNumber(){
    let min = Math.ceil(0);
    let max = Math.floor(wordList.length-1);
    let randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNumber;
  }

  function createBox(){
    const temp =[]
    for(let i=0;i<word.length;i++){
      const tempObj={
        id:i,
        value:null
      }
      temp.push(tempObj)
    }
    setWordDisplay(temp);
     // this is for the answer displaying button
  }

   useEffect(()=>{
    // runs first
    // generating the random number
    let random = randomNumber();
    let data = wordList[random].toUpperCase();
    console.log(data)
    setWord(data); // async so takes time to run
    setattemptsArray(original.current.map(attempt => ({ ...attempt, isdead: false })));
    setWrongCount(0);
    setCorrectCount(0);
    setAlphaButtons(alphaState);
    setgussedWords([]);
    },[newGame]) // for starting and everytime when a new game is launched

    useEffect(()=>{
      // runs second 
      // This code only runs after React has successfully updated the 'word' state.
      if (word.length>0){
        createBox();
      }
    },[word])

  const Jsx_attempts_array=attemptsArray.map(element=>{
    return(
      <AttemptsButton value={element.name}
        key={element.id}
        id={element.id}
        isdead={element.isdead}
      />
    )
   }) 
  // keeping fixed anmount of attempts ie 8 here 
  // ALPHABET_ARRAY is going to hold all uppercase alphabets !
   const Jsx_alphabeta_array = alphaState.map(e=>{
     return <Alphabet val={e.value} id={e.id}  key={e.id} word={word} 
              isGone={e.isGone}
              attemptsArray={attemptsArray}
              setattemptsArray={setattemptsArray}
              wrongCount={wrongCount}
              setWrongCount={setWrongCount}
              correctCount={correctCount}
              setCorrectCount={setCorrectCount}
              wordDisplay={wordDisplay}
              setWordDisplay={setWordDisplay}
              alphabuttons={alphabuttons}
              setAlphaButtons={setAlphaButtons}    
              gussedWords={gussedWords}
              setgussedWords={setgussedWords}
              isCorrect={e.isCorrect}
     />
   })

   const Jsx_inputBox_array = wordDisplay.map(element=>{
      return <InputBox id={element.id} value={element.value} key={element.id} />
   })
   
   function playAgain(){
    setNewGame(previous=>{
      return previous+1;
    })
   }

  return(
    <>
    <div className="mainContainer">
      <Header length={8}/>
      {wrongCount === 8 ?<Lost word={word} />:null} 
      {correctCount=== word.length?<Won />:null} 
      <div>
        {Jsx_attempts_array}
      </div>
      </div>
      <div className="input-container">
        {Jsx_inputBox_array}
      </div>
      {Jsx_alphabeta_array}
      {correctCount===word.length|| wrongCount===8?<button onClick={playAgain}className="play-again-btn">New Game </button>:null}
    </>
  )
}
 // keep the no of chanches as 8 as standard!
 // below header => i need to add the spinup with the text wait the word is getting fetched 