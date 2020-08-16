
import React, { useState, useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as inputActions from './actions/userInputAction';
// import { updateUserInput, updatePrincipalInput, updateInterestInput, updateDurationInput } from './actions/userInputAction';

const ReduxStateExample = ({dispatch, userInput, quotes}) => {
  // set up local state with useState hook
  const [ principalInput, setPrincipalInput] = useState("");
  const [ interestInput, setInterestInput ] = useState("");
  const [ durationInput, setDurationInput ] = useState("");
  const [ displayFormError, setDisplayFormError ] = useState(false);
  const [ userQuotes, setUserQuotes ] = useState([])

  useEffect(() => {
    setUserQuotes(quotes)
  }, [quotes]);

  function handleFormSubmit() {
    setDisplayFormError(false);
    if(principalInput && interestInput && durationInput ){
      let formValues = {
        principalInput: principalInput,
        interestInput: interestInput,
        durationInput: durationInput
      }
      dispatch(inputActions.submitUserInputs(formValues));
      setPrincipalInput("");
      setInterestInput("");
      setDurationInput("");
    } else {
      setDisplayFormError(true);
    }
  }

  return (
      <div className="content-container">
          <div className="content">
              <div className="content-centered content-container">
                <h4>Quick example using redux to create a centralized source of truth</h4>
                <p>This component dispatches actions to update the userInput value in the redux store. React-redux's connect method and the mapStateToProps function defined in this component are used to read from the redux store. Input text below and see the "User Input" value update.</p>
                <p>Input Text: <input className="input-field" onChange={e => dispatch(inputActions.updateUserInput(e.target.value))} value={userInput}/></p>
                <p>Principal: <input type="number" className="input-field" onChange={e => setPrincipalInput(e.target.value)} value={principalInput}/></p>
                <p>Interest Rate: <input className="input-field" onChange={e => setInterestInput (e.target.value)} value={interestInput}/></p>
                <p>Duration (in years): <input className="input-field" onChange={e => setDurationInput(e.target.value)} value={durationInput}/></p>
                <p>User Input: {userInput}</p>
                <p>Principal Input: {principalInput}</p>
                <p>Interest Input: {interestInput}</p>
                <p>Duration Input: {durationInput}</p>
                {displayFormError? (
                  <p>Please enter a value for all fields</p>
                ) : (
                  ""
                )}
                <button onClick={handleFormSubmit}>
                {/* <button onClick={dispatch(inputActions.submitUserInputs(principalInput, interestInput, durationInput))}> */}
                  Submit
                </button>
              </div>
              <div className="content-centered content-container form-results">
                { userQuotes.map((currentQuote) => {
                  return(
                    <div>
                      <p>Principal: {currentQuote.principalInput}</p>
                      <p>Intertest Rate: {currentQuote.interestInput}</p>
                      <p>Duration: {currentQuote.durationInput}</p>
                    </div>
                  );
                })
                
                }
              </div>
          </div>
      </div>
  )
}

//map redux state to component
const mapStateToProps = state => {
  return({
      userInput: state.userInputReducer.userInput,
      quotes: state.userInputReducer.quotes
  })
}

export default connect(mapStateToProps)(ReduxStateExample);
