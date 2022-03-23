import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  test('A página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: /About Pokédex/i });

    expect(title).toBeInTheDocument();
  });

  test('A página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen
      .getByText(/This application simulates a Pokédex, a digital encyclopedia/i);
    const secondParagraph = screen
      .getByText(
        /One can filter Pokémons by type, and see more details for each one of them/i,
      );

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('A página contém imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');

    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
