import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { localStorageFunc } from '../services/saveLocalStorageFunc';

class ProductCard extends Component {
  state = {
    title: '',
    image: '',
    price: '',
    qtd: 1,
  };

  componentDidMount() {
    this.fetchPrdId();
  }

  fetchPrdId = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const product = await getProductById(id);

    this.setState({
      title: product.title,
      image: product.thumbnail,
      price: product.price,
      qtd: 1,
    });
  };

  addShoppingCart = () => {
    const { title, image, price, qtd } = this.state;

    const product = {
      title,
      image,
      price,
      qtd,
    };
    localStorageFunc(product);
  };

  render() {
    const { title, price, image } = this.state;
    return (
      <div className="details-container">
        <div className="details-container-name">
          <h2 data-testid="product-detail-name">{title}</h2>
          <img src={ image } alt={ title } data-testid="product-detail-image" />
        </div>
        <div className="details-container-esp">
          <p data-testid="product-detail-price">{price}</p>
          <button
            data-testid="product-detail-add-to-cart"
            onClick={ this.addShoppingCart }
          >
            Adicionar no carrinho
          </button>
          <Link to="/shopping-cart" data-testid="shopping-cart-button">
            Ir para o Carrinho
          </Link>
        </div>
      </div>
    );
  }
}

ProductCard.propTypes = {
  image: PropTypes.string,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }),
  price: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default ProductCard;
