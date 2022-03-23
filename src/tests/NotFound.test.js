import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('A página contém um h2 com o texto Page requested not found 😭', () => {
  renderWithRouter(<NotFound />);

  const headingtext = screen.getByRole('heading', { name: /Page requested not found/i });
  const images = screen.getAllByRole('img');

  expect(headingtext).toBeInTheDocument();
  expect(images[0]).toBeInTheDocument();
});

test('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  renderWithRouter(<NotFound />);

  const images = screen.getAllByRole('img');

  expect(images[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
