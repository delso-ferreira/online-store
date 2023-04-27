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
    // console.log(id);
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
      <div>
        <div>
          <h2 data-testid="product-detail-name">{title}</h2>
          <img src={ image } alt={ title } data-testid="product-detail-image" />
        </div>
        <div>
          <h3>Especificações técnicas</h3>
          <ul>
            <li>Especificação 1</li>
            <li>Especificação 2</li>
            <li>Especificação 3</li>
            <li>Especificação 4</li>
            <li>Especificação 5</li>
            <li>Especificação 6</li>
            <li>Especificação 7</li>
          </ul>
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
