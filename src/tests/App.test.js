import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Se contém um conjunto de links com nomes: Home, About e Favorite Pokémons', () => {
  renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  const aboutLink = screen.getByRole('link', { name: 'About' });
  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});

test('A aplicação etará na URL / ao clicar no link Home da barra de navegação', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });

  userEvent.click(homeLink);

  const { pathname } = history.location;

  expect(pathname).toBe('/');
});

test('A aplicação estrá na URL /about, ao clicar no link About da barra de navegação',
  () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });

    userEvent.click(aboutLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

test('a aplicação estarána URL /favorites, ao clicar no link Favorite Pokémons',
  () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoriteLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

test('A aplicação renderiza a página Not Found ao entrar em uma URL desconhecida', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/pagina-nao-existe');

  const notFoundText = screen.getByRole('heading', { level: 2 });

  expect(notFoundText).toBeInTheDocument();
});
