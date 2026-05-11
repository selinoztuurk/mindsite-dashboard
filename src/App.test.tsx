import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders dashboard charts', () => {
  render(<App />);
  expect(screen.getByText(/performance dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/buybox win rate by brand/i)).toBeInTheDocument();
  expect(screen.getByText(/overall search visibility trend/i)).toBeInTheDocument();
});
