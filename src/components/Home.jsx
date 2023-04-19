import React from 'react';

class Home extends React.Component {
  state = {
    productsList: [],
  };

  render() {
    const { productsList } = this.state;
    const empty = productsList.length === 0;
    return (
      <div>
        {empty && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
      </div>
    );
  }
}

export default Home;
