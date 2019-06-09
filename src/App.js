import React, {useState} from 'react';
import SelectPreference from './SelectPreference';
import {options} from './literals/options';
import {getBotInput} from './repositories/getBotInput';
import {checkIfAnyOneWins} from './utility';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import './radio.scss';

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}));

function App() {
  const [values, setValues]=useState(Array(9).fill(null));
  const [preference, setPreference]=useState(null);
  const [winner, setWinner]=useState(null);
  const [loading, setLoading]=useState(false);
  const [winningSeq, setWinningSeq]=useState([]);

  const muiClasses=useStyles();
  
  const setBotInput= async (currentState)=>{
    try{
        const response=await getBotInput(currentState);
        setLoading(false);
        const nextTurn =preference==='X'?"O":'X';
        const newState=[...currentState.slice(0, response), nextTurn, ...currentState.slice(response+1)];
        setValues(newState);
        const winningSeq=checkIfAnyOneWins(newState, response, nextTurn);
        if(winningSeq){
          setWinner(nextTurn);
          setWinningSeq(winningSeq);
        }
    }catch(error){
      setWinner('TIE');
      setLoading(false);
    }
  }


  const handleClick=(index)=>{
    const newState=[...values.slice(0, index), preference, ...values.slice(index+1)];

    setValues(newState);
    const winningSeq=checkIfAnyOneWins(newState, index, preference);

    if(winningSeq){
      setWinningSeq(winningSeq);
      setWinner(preference);
    }else{
      setLoading(true);
      setBotInput(newState);
    }
  }

  const handlePlayAgain=()=>{
    setPreference(null);
    setValues(Array(9).fill(null));
    setWinner(null);
    setWinningSeq([]);
  }

  return (
    <div className="App">
      
      <SelectPreference
        options={options}
        selectedOptions={preference}
        handleChange={setPreference}
      />
      
      <div className={winner || preference===null ?'board in-active':'board'}>
          {values.map((item, index)=>{
            return(
              <div 
                className={winningSeq.includes(index)?'box highlight':'box'}
                key={index} 
                onClick={ item? null: ()=>handleClick(index)}
              >
                  {item}
              </div>
            )
          })}
          {
            loading&&
            <div className='loading-indicator'>
              <CircularProgress className={muiClasses.progress}/>
            </div>
          }
      </div>
      {winner &&
        <React.Fragment>
          { winner==='TIE'?
            <div className='tie'>
              {'Game was tied !'}
            </div>:
            <div className='winner'>
              {`"${winner}" won the Game!`}
            </div>
          }
          <Button 
            onClick={handlePlayAgain}
            color={'primary'}
            variant='outlined'
            size='medium'
            fullWidth={false}
          >
            {'Play Again'}
          </Button>
        </React.Fragment>

      }
    </div>
  );
}

export default App;
