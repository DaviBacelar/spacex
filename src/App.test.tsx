import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// HomeView
test('test the HomeView', () => {
  render(<App />);
  expect(screen.getByText(/Welcome to my SpaceX sample app/i)).toBeInTheDocument();
  expect(screen.getByText(/This app displays the past and the upcoming launches from SpaceX/i)).toBeInTheDocument();
  expect(screen.getByText(/All images and data comes from SpaceX and obey the guidelines of/i)).toBeInTheDocument();
  expect(screen.getByText(/Get start/i)).toBeInTheDocument();
});