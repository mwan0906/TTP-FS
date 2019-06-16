import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../store/user';

const Form = props => {
  return (
    <div>
      <form name={props.type} onSubmit={props.handleSubmit}>
        {props.type === 'Sign Up' && (
          <div>
            <label htmlFor='dispName'>
              <small>Name</small>
            </label>
            <input name='dispName' type='text' required />
          </div>
        )}

        <div>
          <label htmlFor='email'>
            <small>Email</small>
          </label>
          <input name='email' type='text' required />
        </div>

        <div>
          <label htmlFor='password'>
            <small>Password</small>
          </label>
          <input name='password' type='password' required />
        </div>

        <div>
          <button type='submit'>{props.type}</button>
        </div>

        {props.error && props.error.response && <div> {props.error.response.data} </div>}
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: e => {
    e.preventDefault();
    dispatch(
      auth(
        e.target.email.value,
        e.target.password.value,
        e.target.dispName.value
      )
    );
  }
});

export default connect(null, mapDispatchToProps)(Form);
