import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { NavBar } from './components';
import Routes from './routes';
import { me } from './store';

class DisconnectedApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMe();
  }

  render() {
    return (
      <div>
        <NavBar />
        <Routes />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMe: () => dispatch(me())
  }
}

const App = connect(null, mapDispatchToProps)(DisconnectedApp);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
