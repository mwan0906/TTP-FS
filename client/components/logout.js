import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';

class Logout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.logout().then(() => this.props.history.push('/login'));
  }

  render() {
    return <h1>Logging out...</h1>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
