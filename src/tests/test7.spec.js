import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import mockedQueryResult from '../mocks/query';
import mockFetch from '../mocks/mockFetch';

describe('exibição de um produto', () => {
  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  it('Clicar no card de um produto leva à página com seus detalhes', async () => {
    renderWithRouter(<App />);
    expect(global.fetch).toHaveBeenCalled();

    const categoriesEl = await screen.findAllByTestId('category');
    userEvent.click(categoriesEl[0]);

    expect(global.fetch).toHaveBeenCalledTimes(2);

    const productLinksEl = await screen.findAllByTestId('product-detail-link');

    await act(async () => {
      userEvent.click(productLinksEl[0]);
    });

    const productNameEl = await screen.findAllByTestId('product-detail-name');
    const productImageEl = await screen.findByTestId('product-detail-image');
    const productPriceEl = await screen.findByTestId('product-detail-price');

    expect(productNameEl[0]).toHaveTextContent(
      mockedQueryResult.results[0].title,
    );
    expect(productImageEl).toBeInTheDocument();
    expect(productPriceEl).toHaveTextContent(
      mockedQueryResult.results[0].price,
    );
  });

  it('O elemento que redireciona para o carrinho de compras é exibido', async () => {
    renderWithRouter(<App />);

    await waitFor(() => expect(screen
      .getByTestId('shopping-cart-button')).toBeInTheDocument());

    userEvent.click(screen.getByTestId('shopping-cart-button'));

    await waitFor(() => expect(
      screen.getByTestId('shopping-cart-empty-message'),
    ).toBeInTheDocument());
  });
});
