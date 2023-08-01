import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getProductLocalstorage,
  saveLocalstorage } from '../services/saveLocalStorageFunc';

class ProductCart extends Component {
  incrementQtd = ({ target }) => {
    const { name } = target;
    console.log(name);

    const products = getProductLocalstorage();
    const increment = products.map((prod) => {
      if (prod.title === name) {
        prod.qtd += 1;
        return prod;
      }
      return prod;
    });
    saveLocalstorage(increment);
  };

  decrementQtd = ({ target }) => {
    const { name } = target;
    // console.log(name);

    const products = getProductLocalstorage();
    const decrement = products.map((prod) => {
      if (prod.title === name) {
        prod.qtd = Math.max(1, prod.qtd - 1);
        return prod;
      }
      return prod;
    });
    saveLocalstorage(decrement);
  };

  removeProduct = ({ target }) => {
    const { name } = target;
    const products = getProductLocalstorage();
    const remove = products.filter((prod) => prod.title !== name);
    saveLocalstorage(remove);
  };

  render() {
    const { title, image, price, qtd, updateQtd } = this.props;

    return (
      <div className="cart-container">
        <p data-testid="shopping-cart-product-name">{title}</p>
        <img src={ image } alt="imagem" />
        <p>{price}</p>
        <p data-testid="shopping-cart-product-quantity">{qtd}</p>
        <div className="cart-container-btn">
          <button
            type="button"
            data-testid="product-increase-quantity"
            onClick={ (event) => {
              this.incrementQtd(event);
              updateQtd();
            } }
            name={ title }
          >
            +
          </button>
          <button
            type="button"
            data-testid="product-decrease-quantity"
            name={ title }
            onClick={ (event) => {
              this.decrementQtd(event);
              updateQtd();
            } }
          >
            -
          </button>
          <button
            type="button"
            data-testid="remove-product"
            name={ title }
            onClick={ (event) => {
              this.removeProduct(event);
              updateQtd();
            } }

          >
            Excluir
          </button>
        </div>
      </div>
    );
  }
}

ProductCart.propTypes = {
  qtd: PropTypes.number,
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default ProductCart;
