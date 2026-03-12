import { render, screen, fireEvent } from '@testing-library/react';
import Product from './Product';

describe('Product', () => {
  const mockProduct = {
    id: 1,
    name: 'Helado de vainilla',
    extraInfo: 'Delicioso helado',
    price: 2.5,
    image: 'vainilla.jpg',
  };

  const mockAddProductToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza el producto correctamente', () => {
    render(<Product product={mockProduct} addProductToCart={mockAddProductToCart} />);

    expect(screen.getByText('Helado de vainilla')).toBeInTheDocument();
    expect(screen.getByText('Delicioso helado')).toBeInTheDocument();
    expect(screen.getByText('2.50 €')).toBeInTheDocument();
    expect(screen.getByText(/\/ unidad/i)).toBeInTheDocument();
  });

  test('muestra la imagen del producto', () => {
    render(<Product product={mockProduct} addProductToCart={mockAddProductToCart} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });

  test('llama a addProductToCart al hacer click en el botón', () => {
    render(<Product product={mockProduct} addProductToCart={mockAddProductToCart} />);

    const button = screen.getByText('Agregar al carrito');
    fireEvent.click(button);

    expect(mockAddProductToCart).toHaveBeenCalledWith(1, 'Helado de vainilla');
    expect(mockAddProductToCart).toHaveBeenCalledTimes(1);
  });

  test('formatea el precio con dos decimales', () => {
    const productWithIntPrice = { ...mockProduct, price: 3 };
    render(<Product product={productWithIntPrice} addProductToCart={mockAddProductToCart} />);

    expect(screen.getByText('3.00 €')).toBeInTheDocument();
  });
});
