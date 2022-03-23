import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('A página contém um heading h2 com o texto Encountered pokémons', () => {
  renderWithRouter(<App />);

  const encounteredText = screen.getByRole('heading', { name: /Encountered pokémons/i });

  expect(encounteredText).toBeInTheDocument();
});

describe('Será exibido o próximo Pokémon da lista quando o botão Próximo é clicado',
  () => {
    test('O botão deve conter o texto Próximo pokémon', () => {
      renderWithRouter(<App />);
      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

      expect(nextButton).toBeInTheDocument();
    });

    test('Próximo Pokémon da lista deve ser mostrado ao clicar sucessivamente no botão',
      () => {
        renderWithRouter(<App />);

        const pikachuName = screen.getByText(/Pikachu/i);
        expect(pikachuName).toBeInTheDocument();

        const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
        userEvent.click(nextButton);

        const chamanderName = screen.getByText(/Charmander/i);
        expect(chamanderName).toBeInTheDocument();

        userEvent.click(nextButton);

        const caterpieName = screen.getByText(/Caterpie/i);
        expect(caterpieName).toBeInTheDocument();
      });

    test('Depois do ultimo pokemon, o proximo deve ser o primeiro', () => {
      renderWithRouter(<App />);
      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

      userEvent.click(nextButton);
      userEvent.click(nextButton);
      userEvent.click(nextButton);
      userEvent.click(nextButton);
      userEvent.click(nextButton);
      userEvent.click(nextButton);
      userEvent.click(nextButton);
      userEvent.click(nextButton);

      const dragonairName = screen.getByText(/Dragonair/i);
      expect(dragonairName).toBeInTheDocument();

      userEvent.click(nextButton);

      const pikachuName = screen.getByText(/Pikachu/i);
      expect(pikachuName).toBeInTheDocument();
    });
  });

test('É mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);

  const moreDetailsButton = screen.getAllByRole('link', { name: 'More details' });

  expect(moreDetailsButton).toHaveLength(1);
});

describe('Teste se a Pokédex tem os botões de filtro', () => {
  test('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    const quantButtons = 8;

    const getButtonsForTestId = screen.getAllByTestId('pokemon-type-button');
    expect(AllButtons).toHaveLength(quantButtons);

    const AllButton = screen.getByRole('button', { name: /All/i });
    expect(AllButton).toBeInTheDocument();

    getButtonsForTestId.forEach((button) => expect(button).toBeInTheDocument());
  });

  test('Deve existir um botão de filtragem para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);

    const electricButton = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(electricButton);
    const electricText = screen.getAllByText(/Electric/i);
    expect(electricText[0]).toBeInTheDocument();

    const fireButton = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(fireButton);
    const fireText = screen.getAllByText(/Fire/i);
    expect(fireText[0]).toBeInTheDocument();

    const bugButton = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(bugButton);
    const bugText = screen.getAllByText(/Bug/i);
    expect(bugText[0]).toBeInTheDocument();

    const poisonButton = screen.getByRole('button', { name: /Poison/i });
    userEvent.click(poisonButton);
    const poisonText = screen.getAllByText(/Poison/i);
    expect(poisonText[0]).toBeInTheDocument();

    const psychicButton = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(psychicButton);
    const psychicText = screen.getAllByText(/Psychic/i);
    expect(psychicText[0]).toBeInTheDocument();

    const normalButton = screen.getByRole('button', { name: /Normal/i });
    userEvent.click(normalButton);
    const normalText = screen.getAllByText(/Normal/i);
    expect(normalText[0]).toBeInTheDocument();

    const dragonButton = screen.getByRole('button', { name: /Dragon/i });
    userEvent.click(dragonButton);
    const dragonText = screen.getAllByText(/Dragon/i);
    expect(dragonText[0]).toBeInTheDocument();
  });

  test('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);

    const AllButton = screen.getByRole('button', { name: /All/i });
    expect(AllButton).toBeInTheDocument();

    const electricButton = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(electricButton);
    expect(AllButton).toBeInTheDocument();

    const fireButton = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(fireButton);
    expect(AllButton).toBeInTheDocument();

    const bugButton = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(bugButton);
    expect(AllButton).toBeInTheDocument();

    const poisonButton = screen.getByRole('button', { name: /Poison/i });
    userEvent.click(poisonButton);
    expect(AllButton).toBeInTheDocument();

    const psychicButton = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(psychicButton);
    expect(AllButton).toBeInTheDocument();

    const normalButton = screen.getByRole('button', { name: /Normal/i });
    userEvent.click(normalButton);
    expect(AllButton).toBeInTheDocument();

    const dragonButton = screen.getByRole('button', { name: /Dragon/i });
    userEvent.click(dragonButton);
    expect(AllButton).toBeInTheDocument();
  });
});

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);

    const allButton = screen.getByRole('button', { name: 'All' });

    expect(allButton).toBeInTheDocument();
  });

  test('Os Pokémons devem estar na tela normalmente se o botão All for clicado;', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);

    const electricText = screen.getAllByText(/Electric/i);
    expect(electricText[0]).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextButton);

    const fireText = screen.getAllByText(/Fire/i);
    expect(fireText[0]).toBeInTheDocument();

    userEvent.click(nextButton);

    const bugText = screen.getAllByText(/Bug/i);
    expect(bugText[0]).toBeInTheDocument();
  });

  test('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<App />);
    const electricText = screen.getAllByText(/Electric/i);
    expect(electricText[0]).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    userEvent.click(nextButton);

    const fireText = screen.getAllByText(/Fire/i);
    expect(fireText[0]).toBeInTheDocument();

    userEvent.click(nextButton);

    const bugText = screen.getAllByText(/Bug/i);
    expect(bugText[0]).toBeInTheDocument();
  });
});
