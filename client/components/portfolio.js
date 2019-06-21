import React from 'react';
import { connect } from 'react-redux';
import { getPrices } from '../store';
import Buy from './buy';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getPrices().then(() => this.setState({ loading: false }));
  }

  render() {
    if (this.state.loading) return <h1>Loading...</h1>;
    return (
      <div className='container'>
        <div id='portfolio'>
          <h1>Portfolio</h1>
          <table>
            {this.props.stocks.map(stock => (
              <tr>
                <td>
                  {stock.name.toUpperCase()} :
                </td>
                <td>{stock.quantity} Shares</td>
                <td>$<span className={stock.didIncrease}>{stock.price}</span></td>
              </tr>
            ))}
          </table>
        </div>
        <Buy />
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
    getPrices: () => dispatch(getPrices('portfolio'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
