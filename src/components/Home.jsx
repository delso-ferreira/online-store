import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from './Categories';

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
    const { value } = target;
    const productById = await getProductsFromCategoryAndQuery(value);
    console.log('chamou a função');
    this.setState({
      productsList: productById.results,
      productFind: true,
    });
  };

  render() {
    console.log(global.fetch);
    const { productsList, search, productFind } = this.state;
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
        <Categories onClick={ this.showCheckedList } />
        {productFind
          ? (productsList.map(({ price, thumbnail, title, id }) => (

            <>
              <div key={ id } />
              <div data-testid="product">
                <h1>{title}</h1>
                <img src={ thumbnail } alt="thumbnail" />
                <h2>{price}</h2>
              </div>
            </>

          )))
          : (<p>Nenhum produto foi encontrado</p>) }

      </div>

    );
  }
}

export default Home;
