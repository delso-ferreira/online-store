import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import mockedQueryResult from '../mocks/query';
import mockFetch from '../mocks/mockFetch';

describe(
  'Seleciona uma categoria e mostra somente os produtos daquela categoria',
  () => {
    beforeEach(() => jest.spyOn(global, 'fetch').mockImplementation(mockFetch));
    it(`Filtra corretamente os produtos de uma página para exibir somente os daquela
      categoria`, async () => {
      renderWithRouter(<App />);
      expect(global.fetch).toHaveBeenCalled();

      const categoriesEl = await screen.findAllByTestId('category');
      userEvent.click(categoriesEl[0]);

      expect(global.fetch).toHaveBeenCalledTimes(2);

      const productsEl = await screen.findAllByTestId('product');
      expect(productsEl.length).toEqual(
        mockedQueryResult.results.length,
      );
    });
  },
);
