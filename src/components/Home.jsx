import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    productsList: [],
    categoriesList: [],
  };

  handleCategories = async () => {
    const categories = await getCategories();

    this.setState({
      categoriesList: categories
    })
  }

  componentDidMount() {
    this.handleCategories();
  };


  render() {
    const { productsList } = this.state;
    const empty = productsList.length === 0;
    const { categoriesList } = this.state
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
        {categoriesList.map((categoria) => (
          <div key={categoria.id}>          
            <label data-testid="category" htmlFor="categories">
              {categoria.name}
            </label>
            <input type='radio'
              name='categories'
              value={categoria.name} />
          </div>
        ))}

      </div>

    );
  }
}

export default Home;
