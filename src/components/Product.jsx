import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { localStorageFunc } from '../services/saveLocalStorageFunc';

class Product extends Component {
  state = {
    qtd: 1,
  };

  addShoppingCart = () => {
    const { title, image, price } = this.props;
    const { qtd } = this.state;

    const product = {
      title,
      image,
      price,
      qtd,
    };
    localStorageFunc(product);
  };

  render() {
    const { title, image, price, id } = this.props;
    const { qtd } = this.state;

    return (
      <div data-testid="product">
        <Link
          to={ `/product/${id}` }
          data-testid="product-detail-link"
        >
          <p data-testid="shopping-cart-product-name">{title}</p>
          <img src={ image } alt="imagem" />
          <p>{price}</p>
          <p data-testid="shopping-cart-product-quantity">{qtd}</p>
        </Link>
        <button
          data-testid="product-add-to-cart"
          onClick={ this.addShoppingCart }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  image: PropTypes.string,
  price: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Product;
