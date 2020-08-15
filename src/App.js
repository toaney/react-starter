import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { updateUserInput } from './actions/userInputAction';

const ReduxStateExample = ({dispatch, userInput}) => {
  // set up local state with useState hook
  // const [ userInput, setUserInput ] = useState("");

  return (
      <div className="content-container">
          <div className="content">
              <div className="content-centered content-container">
                  <h4>Quick example using redux to create a centralized source of truth</h4>
                  <p>This component dispatches actions to update the userInput value in the redux store. React-redux's connect method and the mapStateToProps function defined in this component are used to read from the redux store. Input text below and see the "User Input" value update.</p>
                  <p>Input Text: <input className="input-field" onChange={e => dispatch(updateUserInput(e.target.value))} value={userInput}/></p>
                  <p>User Input: {userInput}</p>
              </div>
          </div>
      </div>
  )
}

//map redux state to component
const mapStateToProps = state => {
  return({
      userInput: state.userInputReducer.userInput
  })
}

export default connect(mapStateToProps)(ReduxStateExample);
