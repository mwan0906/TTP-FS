import React from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../store';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getTransactions().then(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) return <h1>Loading...</h1>;
    return (
      <div id='transactions'>
        <h1>Transactions</h1>
        <table>
          {this.props.lines.map(line => (
            <tr>
              <td>BOUGHT {line.stockName.toUpperCase()} :</td>
              <td>{line.quantity} Shares</td>
              <td>
                @{' '}
                {(line.boughtPrice / 100).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lines: state.stocks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: () => dispatch(getTransactions())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
