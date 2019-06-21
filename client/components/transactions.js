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
      <div id='transactions'>
        <h1>Transactions</h1>
        <table>
            {this.props.stocks.map(stock => (
              <tr>
                <td>
                  BOUGHT {stock.name.toUpperCase()} :
                </td>
                <td>
                  {stock.quantity} Shares
                </td>
                <td>@ ${stock.price}</td>
              </tr>
            ))}
          </table>
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