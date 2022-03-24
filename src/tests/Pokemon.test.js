import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe(
  'Teste se é renderizado um card com as informações de determinado pokémon',
  () => {
    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);

      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toBeInTheDocument();
    });

    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);

      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toBeInTheDocument();
      expect(pokemonType).toHaveTextContent('Electric');
    });

    test('O peso médio do pokémon deve ser exibido', () => {
      renderWithRouter(<App />);

      const pokemonWeight = screen.getByTestId('pokemon-weight');
      expect(pokemonWeight).toBeInTheDocument();
    });

    test('A imagem do Pokémon deve ser exibida', () => {
      renderWithRouter(<App />);

      const pokemonImg = screen.getAllByRole('img');
      expect(pokemonImg[0].src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(pokemonImg[0].alt).toBe('Pikachu sprite');
    });
  },
);

describe('Teste o link para exibir detalhes do Pokémon', () => {
  test('O card do Pokémon contém um link para exibir detalhes do Pokémon', () => {
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
    expect(moreDetailsButton).toBeInTheDocument();
  });

  test(
    'Ao clicar no link de navegação, a aplicação vai para a página de detalhes',
    () => {
      renderWithRouter(<App />);

      const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetailsButton);

      const detailsText = screen.getAllByRole('heading', { level: 2 });
      expect(detailsText[0]).toBeInTheDocument();
    },
  );

  test('Se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetailsButton);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });
});

describe('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  test(
    'O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg',
    () => {
      renderWithRouter(<App />);

      const moreDetailsButton = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetailsButton);

      const favoritedButton = screen.getByRole('checkbox');
      expect(favoritedButton).toBeInTheDocument();
      userEvent.click(favoritedButton);

      const detailsImages = screen.getAllByRole('img');
      const favoriteIcon = detailsImages[1];
      // console.log(favoriteIcon)

      expect(favoriteIcon.src).toBe('http://localhost/star-icon.svg');
      expect(favoriteIcon.alt).toBe('Pikachu is marked as favorite');
    },
  );
});
