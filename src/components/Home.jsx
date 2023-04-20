import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  state = {
    productsList: [],
  };

  render() {
    const { productsList } = this.state;
    const empty = productsList.length === 0;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          Carrinho de compras
        </Link>
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
