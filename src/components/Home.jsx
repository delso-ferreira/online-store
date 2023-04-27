import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from './Categories';
import Product from './Product';

class Home extends React.Component {
  state = {
    productsList: [],
    search: '',
    productFind: false,
  };

  querySearch = async () => {
    const { search } = this.state;
    const getSearch = await getProductsFromCategoryAndQuery(search);

    if (getSearch) {
      this.setState({
        productsList: getSearch.results,
        productFind: true,
      });
    } else {
      this.setState({
        productFind: false,
      });
    }
  };

  inputChange = (event) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  showCheckedList = async (event) => {
    const { target } = event;
    const { id } = target;
    const productById = await getProductsFromCategoryAndQuery(id);
    // console.log(value);
    this.setState({
      productsList: productById.results,
      productFind: true,
    });
  };

  render() {
    const { productsList, search, productFind } = this.state;
    const empty = productsList.length === 0;
    return (
      <div>
        <input
          data-testid="query-input"
          type="text"
          value={ search }
          name="search"
          onChange={ this.inputChange }
        />

        <button
          data-testid="query-button"
          type="button"
          onClick={ this.querySearch }
        >
          Buscar
        </button>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          Carrinho de compras
        </Link>
        {empty && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )}
        <Categories onClick={ this.showCheckedList } />
        {productFind
          ? (productsList.map(({ price, thumbnail, title, id }) => (

            <Product
              key={ id }
              id={ id }
              title={ title }
              image={ thumbnail }
              price={ price }
            />

          )))
          : (<p>Nenhum produto foi encontrado</p>) }

      </div>

    );
  }
}

export default Home;
