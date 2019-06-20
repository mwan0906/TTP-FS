import React from 'react';
import { connect } from 'react-redux';
import { auth, clearError } from '../store';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dispName: '',
      email: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.auth(this.state.email, this.state.password, this.state.dispName)
    .then( err => {
      if (!err) // if the login was successful
      // (the auth will only return something if something went wrong)
        this.props.history.push('/portfolio');
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (this.props.error) this.props.clear();
  }

  render() {
    const { type, error } = this.props;
    return (
      <div>
        <h1>{type}</h1>
        <form name={type} onSubmit={this.handleSubmit}>
          <div className='inputs'>
            {type === 'Sign Up' && (
              <input
                name='dispName'
                type='text'
                value={this.state.dispName}
                onChange={this.handleChange}
                placeholder='Name'
                required
              />
            )}

            <input
              name='email'
              type='text'
              value={this.state.email}
              onChange={this.handleChange}
              placeholder='Email'
              required
            />
            <input
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange}
              placeholder='Password'
              required
            />
          </div>

          {error && error.response ? (
            <div className='error'> {error.response.data} </div>
          ) : (
            <div className='buttons'>
              <button type='submit'>{type}</button>
              {type === 'Sign Up' ? (
                <button
                  type='button'
                  onClick={() => this.props.history.replace('/login')}
                >
                  Already a user? Click here to Log In!
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => this.props.history.replace('/signup')}
                >
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
  auth: (email, password, name) => dispatch(auth(email, password, name)),
  clear: () => dispatch(clearError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
