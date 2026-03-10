import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {
  test('renderiza el contenedor de carga', () => {
    render(<Loading />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('el contenedor tiene el data-testid correcto', () => {
    render(<Loading />);
    const loader = screen.getByTestId('loading');
    expect(loader).toHaveClass('loading');
  });

  test('renderiza el spinner de Bootstrap', () => {
    render(<Loading />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  test('muestra el texto de carga', () => {
    render(<Loading />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });
});
