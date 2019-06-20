import React from 'react';
import { connect } from 'react-redux';
import Buy from './buy';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Portfolio Here</h1>
        <table>
          <tr>
            <td>Ticker</td>
            <td>$Price</td>
          </tr>
        </table>
        <Buy />
      </div>
    );
  }
}

export default connect(null)(Portfolio);
