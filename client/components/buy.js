import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

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
    axios.get(`/api/price/${this.state.ticker}`)
      .then(res => {
        const { data } = res;
        if (typeof data === 'string') this.setState({ error: data });
        else if (data.price * Number(this.state.shares) > this.props.cash) this.setState({ error: 'Not enough cash!' });
        else {
            // do something
        };
      })
      .then(() =>
        this.setState({
          loading: false
        })
      );
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (this.state.error) this.setState({error: ''});
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
        <form name="buy" onSubmit={this.handleSubmit}>
          <div className="inputs">
            <input
              name="ticker"
              type="text"
              value={this.state.ticker}
              onChange={this.handleChange}
              placeholder="Ticker Symbol"
              required
            />

            <input
              name="shares"
              type="number"
              min={0}
              value={this.state.shares}
              onChange={this.handleChange}
              placeholder="Number of Shares"
              required
            />
          </div>

          <button type="submit" disabled={this.state.loading}>
            Buy
          </button>
        </form>

        {this.state.error && <div className='error'>{this.state.error}</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cash: state.user.balance
  };
};

export default connect(mapStateToProps)(Buy);
