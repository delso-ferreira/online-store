import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery,
  getCategorieId } from '../services/api';

class Home extends React.Component {
  state = {
    productsList: [],
    categoriesList: [],
    search: '',
    productFind: false,
  };

  componentDidMount() {
    this.handleCategories();
  }

  handleCategories = async () => {
    const categories = await getCategories();

    this.setState({
      categoriesList: categories,
    });
  };

  querySearch = async () => {
    const { search } = this.state;
    const getSearch = await getProductsFromCategoryAndQuery(search);
    console.log(getSearch);

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

  showCheckedList = async () => {
    // buscar o id da categoria ao clicar no radio button, o param tem que ser dinâmico
    // a função consegue passar o paramêtro de forma hard coded [não dinâmica] atravês do id de um produto
    // por exemplo, se colocarmos no ao inves do param, algo como 'MLB1055', conseguimos renderizar os celulares
    // a minha ideia seria fazer um filter dentro do array, utilizando um includes da string referente ao radio button
    // porém estou não consegui pensar em uma forma de fazer.
    const productById = await getCategorieId(param);
    console.log(productById);

    this.setState({
      productsList: productById.results,
      productFind: true,
    });
  };

  render() {
    const { productsList, categoriesList, search, productFind } = this.state;
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

        {categoriesList.map((categoria) => (
          <div key={ categoria.id }>
            <label data-testid="category" htmlFor="categories">
              {categoria.name}
            </label>
            <input
              type="radio"
              name="categories"
              onClick={ this.showCheckedList }
              value={ categoria.name }
            />
          </div>
        ))}
        {productFind
          ? (productsList.map(({ price, thumbnail, title, id }) => (

            <>
              <div
                key={ id }
                data-testid="product"
              />
              <h1>{title}</h1>
              <img src={ thumbnail } alt="thumbnail" />
              <h2>{price}</h2>
            </>

          )))
          : (<p>Nenhum produto foi encontrado</p>) }

      </div>

    );
  }
}

export default Home;
