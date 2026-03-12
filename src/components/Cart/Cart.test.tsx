import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';

// Mock de react-toastify
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));

// Mock de SVGs
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

describe('Cart', () => {
  const mockGetProductsInCartFromLocalStorage = jest.fn();

  const mockProducts = {
    data: [
      { id: 1, name: 'Helado de vainilla', price: 2.5, image: 'vainilla.jpg' },
      { id: 2, name: 'Helado de chocolate', price: 3.0, image: 'chocolate.jpg' },
    ],
    loading: false,
    error: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('muestra el icono de carrito vacío cuando no hay productos', () => {
    render(
      <Cart
        productsInCart={[]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    const cartButtons = screen.getAllByRole('button');
    expect(cartButtons[0]).toBeInTheDocument();
  });

  test('muestra el icono de carrito lleno cuando hay productos', () => {
    render(
      <Cart
        productsInCart={[1, 2]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    const cartButton = screen.getByRole('button', { name: /cart/i });
    expect(cartButton).toBeInTheDocument();
  });

  test('abre el carrito al hacer click en el icono', () => {
    render(
      <Cart
        productsInCart={[1]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    const cartButtons = screen.getAllByRole('button');
    const cartButton = cartButtons[0]; // El primer botón es el del carrito
    fireEvent.click(cartButton);

    expect(screen.getByText('Carrito')).toBeInTheDocument();
  });

  test('muestra el botón de vaciar solo cuando hay productos', () => {
    const { rerender } = render(
      <Cart
        productsInCart={[]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    // Abrir carrito
    const cartButtons = screen.getAllByRole('button');
    fireEvent.click(cartButtons[0]);

    // No debe mostrar el botón de vaciar
    expect(screen.queryByText('Vaciar')).not.toBeInTheDocument();

    // Rerender con productos
    rerender(
      <Cart
        productsInCart={[1]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    // Ahora sí debe mostrar el botón de vaciar
    expect(screen.getByText('Vaciar')).toBeInTheDocument();
  });

  test('calcula el precio total correctamente', () => {
    render(
      <Cart
        productsInCart={[1, 1, 2]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    const cartButtons = screen.getAllByRole('button');
    const cartButton = cartButtons[0];
    fireEvent.click(cartButton);

    // 2 helados de vainilla (2.5 * 2) + 1 de chocolate (3.0) = 8.00
    expect(screen.getByText('8.00 €')).toBeInTheDocument();
  });

  test('muestra el botón de tramitar pedido solo cuando hay total mayor a 0', () => {
    const { rerender } = render(
      <Cart
        productsInCart={[]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    const cartButtons = screen.getAllByRole('button');
    fireEvent.click(cartButtons[0]);

    // No debe mostrar el botón
    expect(screen.queryByText('Tramitar pedido')).not.toBeInTheDocument();

    // Rerender con productos
    rerender(
      <Cart
        productsInCart={[1]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    // Ahora sí debe mostrar el botón
    expect(screen.getByText('Tramitar pedido')).toBeInTheDocument();
  });

  test('cierra el carrito al hacer clic en el botón de cerrar', () => {
    const { container } = render(
      <Cart
        productsInCart={[1]}
        getProductsInCartFromLocalStorage={mockGetProductsInCartFromLocalStorage}
        products={mockProducts}
      />
    );

    // Abrir carrito
    const cartButtons = screen.getAllByRole('button');
    fireEvent.click(cartButtons[0]);

    // Verificar que el carrito está abierto
    expect(screen.getByText('Carrito')).toBeInTheDocument();

    // Hacer clic en el botón de cerrar
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    // El carrito debería cerrarse (verificar que el ancho sea 0px)
    const cartContent = container.querySelector('.cart-content');
    expect(cartContent).toHaveStyle({ width: '0px' });
  });
});
