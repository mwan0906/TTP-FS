import React from 'react';

import Buy from './buy';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Portfolio Here</h1>
        <Buy />
      </div>
    );
  }
}

export default Portfolio;