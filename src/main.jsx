import { createRoot } from "react-dom/client";
import "./index.css"
import App from "./App.jsx"
export {Header,AttemptsButton,Won,Lost,alphaState,Alphabet,InputBox};

const ALPHABET_ARRAY = Array.from({ length: 26 }, (_, i) => 
    String.fromCharCode('A'.charCodeAt(0) + i)
);

const alphaState = ALPHABET_ARRAY.map(element=>{
  let character = element;
  const index = 0; // We look at the first character
  // getting the assci value
  const asciiValue = character.charCodeAt(index);
   const temp = {
    id:asciiValue-65,
    value:element,
    isGone:false
   }
   return temp;
})

const root = createRoot(document.getElementById("root"))
root.render(
  <App />
)

function Header(props){
  return(
    <div className="header">
      <h3 className="title"> Assembly Endgame</h3>
      <p className="text">Guess the word  in under {props.length} attempts to keep the programming world safe from Assembly!.</p>
    </div>
  )
}

// the programming language one !
function AttemptsButton(props){
  // props to be passed isdead and value and id as well // style obj /needed or not 

  const className = props.isdead === false? "alive":"dead"
  return (
    <button className={className} value={props.value}>{props.value}</button>
  )
}

function Won(){
  return(
    <div className= "status-box won">
      <h1>Won</h1>
      <p>Well done</p>
    </div>
  )
}

function Lost(props){
  return(
    <div className="status-box lost">
      <h1>lost</h1>
      <p> The actual word was {props.word}</p>
    </div>
  )
}

function InputBox(props){
  // is having the id prop as well
  return(
    <button value={props.value} className="InputBox">{props.value}</button>
  )
}

function Alphabet(props){
  // props here is val  // id as a prop is also passed !
  
  function handleClick(event){

    const response = props.gussedWords.includes(event.currentTarget.value)
    if (response){
      return; // return nothing
    }

    props.setgussedWords([...props.gussedWords,event.currentTarget.value]);

    console.log("handle cilck")
    const index = []
    for(let i=0;i<props.word.length;i++){
      if (props.word[i]=== event.currentTarget.value){
        index.push(i);
      }
    }
  
    // checking if the guess is correct or wrong

    if(index.length===0){             // wrong guess
      // update our wrong count
       props.setWrongCount(previous=>{
        return previous+1;
       })

      // our state is an array of objects!
      const newAlphabuttons= [...props.alphabuttons];
      let idx = event.currentTarget.id;
      newAlphabuttons[idx]= {
        id:idx,
        value:props.val,
        isGone:true,
        isCorrect:false              
      }
      props.setAlphaButtons(newAlphabuttons) //updated the alphabets holding array

      // need to update the attempts array
      const newAttemptsArray = [...props.attemptsArray];
      newAttemptsArray[props.wrongCount] = {
        id:props.wrongCount,
        name:props.attemptsArray[props.wrongCount].name,
        isdead:true
      }
      props.setattemptsArray(newAttemptsArray)
    }
    
    else{
      // if guess is correct
     props.setCorrectCount(previous=>{
        return previous+index.length;
     });

     // const newAlphabuttons= [...props.alphabuttons]; // for updating the alpha buttons
      const newwordDisplay =[...props.wordDisplay]
      for (let i of index){
            newwordDisplay[i]={
              id:i,
              value:event.currentTarget.value
            }
      }
      props.setWordDisplay(newwordDisplay)

      // need to set the aphabet array as well

      const newAlphabuttons2= [...props.alphabuttons];
      let indx= event.currentTarget.id;
      newAlphabuttons2[indx]= {
        id:indx,
        value:props.val,
        isGone:false,
        isCorrect:true           
      }
      props.setAlphaButtons(newAlphabuttons2)
    }
  }
  let className = "yellow"; // Default
  if (props.isCorrect) {
    className = "green";
  } else if (props.isGone) {
    className = "red";
  }

  return(
    <button onClick={handleClick}value={props.val}className={className}>{props.val}</button>
  )
}

// comments for viewing structure
// props for the alphabet component
/*
              attemptsArray={attemptsArray}
              setattemptsArray={setattemptsArray}

              wrongCount={wrongCount}
              setWrongCount={setWrongCount}

              correctCount={correctCount}
              setCorrectCount={setCorrectCount}

              wordDisplay={wordDisplay} // word display ie answer showing buttons!
              setWordDisplay={setWordDisplay} 

              alphabuttons={alphabuttons}
              setAlphaButtons={setAlphaButtons} 
              
              attempts array std structure
              { id: 1, name: 'HTML', isdead: false },

              gussedWords={gussedWords}
              setgussedWords={setgussedWords}
      {
        id:i,            // word display structure
        value:null      // word display structure
      }

*/
