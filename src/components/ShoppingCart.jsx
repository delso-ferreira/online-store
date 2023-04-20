import React from 'react';

class ShoppingCart extends React.Component {
  state = {
    cartThings: [],
  };

  render() {
    const { cartThings } = this.state;
    const empty = cartThings.length === 0;
    return (
      <div>
        {empty && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
      </div>
    );
  }
}
// Hello Stranger!
export default ShoppingCart;
