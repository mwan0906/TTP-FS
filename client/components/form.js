import React from 'react';
import { connect } from 'react-redux';
import { auth, clearError } from '../store/user';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dispName: '',
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.path !== prevProps.match.path) {
      this.setState({
        dispName: '',
        email: '',
        password: ''
      });
      this.props.clear();
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (this.props.error) this.props.clear();
  }

  render() {
    const { type, handleSubmit, error } = this.props;
    return (
      <div>
        <form name={type} onSubmit={handleSubmit}>
          {type === 'Sign Up' && (
            <div>
              <label htmlFor='dispName'>
                <small>Name</small>
              </label>
              <input
                name='dispName'
                type='text'
                value={this.state.dispName}
                onChange={this.handleChange}
                required
              />
            </div>
          )}

          <div>
            <label htmlFor='email'>
              <small>Email</small>
            </label>
            <input
              name='email'
              type='text'
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor='password'>
              <small>Password</small>
            </label>
            <input
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>

          {error && error.response ? (
            <div className='error'> {error.response.data} </div>
          ) : (
            <div className='buttons'>
              <button type='submit'>{type}</button>
              {type === 'Sign Up' ? (
                <button type='button' onClick={() => this.props.history.replace('/login')}>
                  Already a user? Click here to Log In!
                </button>
              ) : (
                <button type='button' onClick={() => this.props.history.replace('/signup')}>
                  Don't have an account? Click here to Sign Up!
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.user.error
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: e => {
    e.preventDefault();
    dispatch(
      auth(
        e.target.email.value,
        e.target.password.value,
        e.target.dispName && e.target.dispName.value
      )
    );
  },
  clear: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
