
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as inputActions from './actions/userInputAction';
// import { updateUserInput, updatePrincipalInput, updateInterestInput, updateDurationInput } from './actions/userInputAction';

const ReduxStateExample = ({dispatch, userInput, quotes}) => {
  // set up local state with useState hook
  const [ principalInput, setPrincipalInput] = useState("");
  const [ interestInput, setInterestInput ] = useState("3.5");
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
            <h1>Loan Calculator</h1>
            <p>Fill out the field below to calculate monthly loan payments.</p>
            {displayFormError? (
              <p className="input-error">Please enter a valid value for all fields</p>
            ) : (
              ""
            )}
            <div className="form">
              <div className="form-input">
                <label for="principal">Amount</label>
                <p><input id="principal" type="number" className="input-field" onChange={e => setPrincipalInput(e.target.value)} value={principalInput}/></p>
              </div>
              <div className="form-input">
                <label for="interest">Interest Rate</label>
                <p><input id="interest" type="number" className="input-field" list="interestRates" onChange={e => setInterestInput (e.target.value)} value={interestInput}/></p>
                <datalist id="interestRates">
                  <option value="3.0"></option>
                  <option value="3.25"></option>
                  <option value="3.5"></option>
                  <option value="3.75"></option>
                  <option value="4.0"></option>
                  <option value="4.25"></option>
                  <option value="4.5"></option>
                  <option value="4.75"></option>
                </datalist>
              </div>
              <div className="form-input">
                <label for="duration">Duration (in years)</label>
                <p><input id="duration" type="number" className="input-field" list="loanDuration" onChange={e => setDurationInput(e.target.value)} value={durationInput}/></p>
                <datalist id="loanDuration">
                  <option value="10"></option>
                  <option value="15"></option>
                  <option value="20"></option>
                  <option value="30"></option>
                </datalist>
              </div>
            </div>
            <button className="form-submit" onClick={handleFormSubmit}>
            {/* <button onClick={dispatch(inputActions.submitUserInputs(principalInput, interestInput, durationInput))}> */}
              Submit
            </button>

            {userQuotes? (
              <div className="content-centeredform-results">
                <table className="results-table">
                  <tr>
                    <th>Amount</th>
                    <th>Interest Rate</th>
                    <th>Number of Years</th>
                    <th>Monthly Payment</th>
                  </tr>
                  <tr>
                    <td>{quotes.principalInput}</td>
                    <td>{quotes.interestInput}</td>
                    <td>{quotes.durationInput}</td>
                  </tr>
                </table>
              </div>
            ) : (
              <span></span>
            )}
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
