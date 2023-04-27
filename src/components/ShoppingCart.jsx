import React from 'react';
import ProductCart from './ProductCart';

class ShoppingCart extends React.Component {
  state = {
    cartList: [],
  };

  componentDidMount() {
    this.recoverLocalstorage();
  }

  recoverLocalstorage = () => {
    const products = JSON.parse(localStorage.getItem('cartProducts'));

    this.setState({
      cartList: products,
    });
  };

  render() {
    const { cartList } = this.state;

    return (
      <div>
        {!cartList || cartList.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          cartList.map(({ title, image, price, qtd }, index) => (
            <ProductCart
              key={ index }
              title={ title }
              image={ image }
              price={ price }
              qtd={ qtd }
              updateQtd={ this.recoverLocalstorage }
            />
          ))
        )}
      </div>
    );
  }
}
// Hello Stranger!
export default ShoppingCart;
