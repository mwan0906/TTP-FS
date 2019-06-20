import React from 'react';
import { connect } from 'react-redux';
import { getPrices } from '../store';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getPrices()
    .then( () => this.setState({loading: false}) );
  }
    
  render() {
    if (this.state.loading) return <h1>Loading...</h1>;
    return (
      <div>
        <h1>Transactions Here</h1>
        {this.props.stocks.map(stock => <div>
          {stock.name.toUpperCase()} - {stock.quantity} Shares @{' '}
          <span className={stock.didIncrease}>${stock.price}</span>
        </div>)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPrices: () => dispatch(getPrices('transactions'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions)