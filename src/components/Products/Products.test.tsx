import { render, screen } from '@testing-library/react';
import Products from './Products';

describe('Products', () => {
  const mockAddProductToCart = jest.fn();

  test('muestra el componente Loading cuando está cargando', () => {
    const mockProducts = {
      data: null,
      loading: true,
      error: null,
    };

    render(<Products products={mockProducts} addProductToCart={mockAddProductToCart} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('muestra el componente Loading cuando no hay data', () => {
    const mockProducts = {
      data: null,
      loading: false,
      error: null,
    };

    render(<Products products={mockProducts} addProductToCart={mockAddProductToCart} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('muestra el componente Error cuando hay un error', () => {
    const mockProducts = {
      data: [],
      loading: false,
      error: 'Error de red',
    };

    render(<Products products={mockProducts} addProductToCart={mockAddProductToCart} />);
    expect(screen.getByText('Error al cargar los productos')).toBeInTheDocument();
  });

  test('renderiza la lista de productos correctamente', () => {
    const mockProducts = {
      data: [
        { id: 1, name: 'Producto 1', extraInfo: 'Info 1', price: 10, image: 'img1.jpg' },
        { id: 2, name: 'Producto 2', extraInfo: 'Info 2', price: 20, image: 'img2.jpg' },
      ],
      loading: false,
      error: null,
    };

    render(<Products products={mockProducts} addProductToCart={mockAddProductToCart} />);

    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
  });

  test('muestra el contenedor principal con la clase correcta', () => {
    const mockProducts = {
      data: [],
      loading: false,
      error: null,
    };

    render(<Products products={mockProducts} addProductToCart={mockAddProductToCart} />);
    const productsContainer = screen.getByTestId('products');
    expect(productsContainer).toBeInTheDocument();
    expect(productsContainer).toHaveClass('products');
  });
});
