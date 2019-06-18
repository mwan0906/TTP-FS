import React from 'react';
import { connect } from 'react-redux';

class Buy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: '',
      shares: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Buy</h1>
        <form name='buy' onSubmit={this.props.handleSubmit}>
          <div className='inputs'>
            <input
              name='ticker'
              type='text'
              value={this.state.ticker}
              onChange={this.handleChange}
              placeholder='Ticker Symbol'
              required
            />

            <input
              name='shares'
              type='text'
              value={this.state.shares}
              onChange={this.handleChange}
              placeholder='Number of Shares'
              required
            />
          </div>

          <button type='submit'>Buy</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: e => {
      e.preventDefault();
      console.log('testing');
    }
  };
};

export default connect(null, mapDispatchToProps)(Buy);
