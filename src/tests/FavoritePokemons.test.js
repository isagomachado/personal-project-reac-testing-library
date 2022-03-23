import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('É renderizado a mensagem No favorite pokemon found, se não tiver pokémon favorito',
  () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoriteLink);

    const noFvaoriteText = screen.getByText(/No favorite pokemon found/i);

    expect(noFvaoriteText).toBeInTheDocument();
  });

test('É exibido todos os cards de pokémons favoritados', () => {
  renderWithRouter(<App />);

  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
  const moreDetailsLink = screen.getByRole('link', { name: 'More details' });

  userEvent.click(moreDetailsLink);

  const labelFavorite = screen.getByRole('checkbox');

  userEvent.click(labelFavorite);
  userEvent.click(favoriteLink);

  const moreDetailsFavoritePage = screen.getAllByRole('link', { name: 'More details' });

  expect(moreDetailsFavoritePage).toHaveLength(1);
});
