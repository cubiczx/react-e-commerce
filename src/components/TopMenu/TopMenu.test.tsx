import { render, screen } from '@testing-library/react';
import TopMenu from './TopMenu';

// Mock de react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Mock de SVGs
jest.mock('../../assets/svg/logo.svg', () => ({
  ReactComponent: () => <div aria-label="Helados Palacín logo">Logo</div>,
}));

jest.mock('../../assets/svg/cart-empty.svg', () => ({
  ReactComponent: () => <div>CartEmpty</div>,
}));

jest.mock('../../assets/svg/cart-full.svg', () => ({
  ReactComponent: () => <div>CartFull</div>,
}));

jest.mock('../../assets/svg/close.svg', () => ({
  ReactComponent: () => <div>Close</div>,
}));

jest.mock('../../assets/svg/garbage.svg', () => ({
  ReactComponent: () => <div>Garbage</div>,
}));

describe('TopMenu', () => {
  const mockGetProductsInCartFromLocalStorage = jest.fn();
  
  const mockProducts = {
    data: [
      { id: 1, name: 'Helado 1', price: 2.5, image: 'img1.jpg' },
      { id: 2, name: 'Helado 2', price: 3.0, image: 'img2.jpg' },
    ],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el TopMenu correctamente', () => {
    render(
      <TopMenu
        productsInCart={[]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    expect(screen.getByText('Helados Palacín')).toBeInTheDocument();
  });

  test('muestra el logo de la marca', () => {
    render(
      <TopMenu
        productsInCart={[]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    const logo = screen.getByLabelText('Helados Palacín logo');
    expect(logo).toBeInTheDocument();
  });

  test('renderiza el componente Cart', () => {
    render(
      <TopMenu
        productsInCart={[1, 2]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    // El cart siempre tiene un botón
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  test('aplica la clase dark del navbar', () => {
    render(
      <TopMenu
        productsInCart={[]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
    expect(navbar).toHaveClass('top-menu');
  });
});
