import { render, screen } from '@testing-library/react';
import App from './App';

// Mock de useFetch
jest.mock('./hooks/useFetch', () => {
  return {
    __esModule: true,
    default: () => ({
      data: [],
      loading: false,
      error: null,
    }),
  };
});

// Mock de react-toastify
jest.mock('react-toastify', () => ({
  ToastContainer: () => null,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock de SVGs
jest.mock('./assets/svg/logo.svg', () => ({
  ReactComponent: () => <div>Logo</div>,
}));

jest.mock('./assets/svg/cart-empty.svg', () => ({
  ReactComponent: () => <div>CartEmpty</div>,
}));

jest.mock('./assets/svg/cart-full.svg', () => ({
  ReactComponent: () => <div>CartFull</div>,
}));

jest.mock('./assets/svg/close.svg', () => ({
  ReactComponent: () => <div>Close</div>,
}));

jest.mock('./assets/svg/garbage.svg', () => ({
  ReactComponent: () => <div>Garbage</div>,
}));

describe('App', () => {
  test('renderiza el componente App correctamente', () => {
    render(<App />);
    expect(screen.getByText('Helados Palacín')).toBeInTheDocument();
  });

  test('renderiza el TopMenu', () => {
    render(<App />);
    const heading = screen.getByText('Helados Palacín');
    expect(heading).toBeInTheDocument();
  });
});
