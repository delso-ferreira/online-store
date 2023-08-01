import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import mockedQueryResult from '../mocks/query';
import mockFetch from '../mocks/mockFetch';

const prodQtd = 'shopping-cart-product-quantity';
const prodIncr = 'product-increase-quantity';
const prodName = 'shopping-cart-product-name';

describe('Manipulação da lista de produtos e sua quantidade', () => {
  afterEach(() => {
    global.fetch.mockClear();
  });

  beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
  it('Adiciona produtos ao carrinho e manipula suas quantidades', async () => {
    renderWithRouter(<App />);
    expect(global.fetch).toHaveBeenCalled();

    userEvent.click((await screen.findAllByTestId('category'))[0]);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    userEvent.click((await screen.findAllByTestId('product-add-to-cart'))[0]);
    userEvent.click((await screen.findAllByTestId('product-add-to-cart'))[1]);
    userEvent.click(await screen.findByTestId('shopping-cart-button'));

    expect(await screen.findAllByTestId(prodName));
    expect(screen.getAllByTestId(prodName)[0]).toHaveTextContent(
      mockedQueryResult.results[0].title,
    );

    expect(screen.getAllByTestId(prodQtd)[0]).toHaveTextContent(
      '1',
    );

    expect(screen.getAllByTestId(prodName)[1]).toHaveTextContent(
      mockedQueryResult.results[1].title,
    );
    expect(screen.getAllByTestId(prodQtd)[1]).toHaveTextContent(
      '1',
    );

    userEvent.click(screen.getAllByTestId(prodIncr)[0]);
    userEvent.click(screen.getAllByTestId(prodIncr)[0]);
    userEvent.click(screen.getAllByTestId(prodIncr)[0]);

    userEvent.click(screen.getAllByTestId(prodIncr)[1]);
    userEvent.click(screen.getAllByTestId(prodIncr)[1]);

    expect(screen.getAllByTestId(prodQtd)[0]).toHaveTextContent(
      '2',
    );
    expect(screen.getAllByTestId(prodQtd)[1]).toHaveTextContent(
      '3',
    );

    userEvent.click(screen.getAllByTestId('product-decrease-quantity')[0]);
    userEvent.click(screen.getAllByTestId('product-decrease-quantity')[0]);
    expect(screen.getAllByTestId(prodQtd)[0]).toHaveTextContent(
      '1',
    );
  });

  it('É possível excluir um produto do carrinho', async () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByTestId('shopping-cart-button'));

    await waitFor(async () => expect(screen.getAllByTestId(prodName)).toHaveLength(
      2,
    ));

    userEvent.click(screen.getAllByTestId('remove-product')[1]);
    expect(screen.getAllByTestId(prodName)).toHaveLength(1);
  });
});
