import React from 'react';
import { connect } from 'react-redux';
import { stockBuyer } from '../store';

class Buy extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ticker: '',
      shares: '',
      loading: false,
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    this.props.buyStocks(this.state.ticker, Number(this.state.shares))
    .then(res =>
      this.setState({
        loading: false,
        error: res // the call will only return a response if there was an error
      })
    );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (this.state.error) this.setState({ error: '' });
  }

  render() {
    return (
      <div>
        <h2>
          Cash:{' '}
          {(this.props.cash / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </h2>
        <form name='buy' onSubmit={this.handleSubmit}>
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
              type='number'
              min={0}
              value={this.state.shares}
              onChange={this.handleChange}
              placeholder='Number of Shares'
              required
            />
            <br />
            <button type='submit' disabled={this.state.loading}>
              Buy
            </button>
          </div>
        </form>

        {this.state.error && <div className='error'>{this.state.error}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    cash: state.user.balance || 500000
  };
};

const mapDispatchToProps = dispatch => {
  return {
    buyStocks: (ticker, shares) => dispatch(stockBuyer(ticker, shares))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Buy);
