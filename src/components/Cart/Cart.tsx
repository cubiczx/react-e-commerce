import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/svg/cart-full.svg";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Garbage } from "../../assets/svg/garbage.svg";
import { BASE_PATH, STORAGE_PRODUCTS_IN_CART_KEY } from "../../utils/contants";
import {
  countDuplicates,
  removeDuplicates,
  removeItemOnce,
} from "../../utils/arrayFunctions";

import "./Cart.scss";
import { toast } from "react-toastify";

export default function Cart(props: {
  productsInCart: number[];
  getProductsInCartFromLocalStorage: () => void;
  products: { data: any; loading: boolean; error: string | null };
}) {
  const { productsInCart, getProductsInCartFromLocalStorage, products } = props;
  const [cartOpen, setCartOpen] = useState(false);
  const widthCartContent = cartOpen ? "400px" : "0px";
  const [singleProductInCart, setSingleProductInCart] = useState<any>(null);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [removingItems, setRemovingItems] = useState<number[]>([]);

  useEffect(() => {
    const allProductsInCart = removeDuplicates(productsInCart).sort(
      (a, b) => a - b,
    );
    setSingleProductInCart(allProductsInCart);
  }, [productsInCart, products.data]);

  useEffect(() => {
    const productData: { id: number; quantity: number }[] = [];
    let totalPrice = 0;

    const allProductsInCart = removeDuplicates(productsInCart).sort(
      (a, b) => a - b,
    );
    allProductsInCart.forEach((idProduct: number) => {
      const quantity = countDuplicates(idProduct, productsInCart);
      const productValue = {
        id: idProduct,
        quantity: quantity,
      };
      productData.push(productValue);
    });

    if (!products.loading && products.data) {
      products.data.forEach((product: any) => {
        productData.forEach((productInCart: any) => {
          if (product.id === productInCart.id) {
            totalPrice += product.price * productInCart.quantity;
          }
        });
      });
    }
    setCartTotalPrice(totalPrice);
  }, [productsInCart, products]);

  const openCart = () => {
    setCartOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "scroll";
  };

  const emptyCart = () => {
    setShowConfirmModal(true);
  };

  const confirmEmptyCart = () => {
    // Agregar todos los productos a la lista de eliminación
    const allProductIds = removeDuplicates(productsInCart);
    setRemovingItems(allProductIds);
    
    // Esperar a que termine la animación antes de eliminar
    setTimeout(() => {
      localStorage.removeItem(STORAGE_PRODUCTS_IN_CART_KEY);
      getProductsInCartFromLocalStorage();
      setRemovingItems([]);
      setShowConfirmModal(false);
      toast.success("Carrito vaciado");
    }, 500);
  };

  const increaseQuantity = (idProduct: number) => {
    const idsProducts = [...productsInCart];
    idsProducts.push(idProduct);
    localStorage.setItem(
      STORAGE_PRODUCTS_IN_CART_KEY,
      JSON.stringify(idsProducts),
    );
    getProductsInCartFromLocalStorage();
  };

  const decreaseQuantity = (idProduct: number) => {
    const idsProducts = [...productsInCart];
    const currentQuantity = countDuplicates(idProduct, idsProducts);
    
    // Si solo queda 1 unidad, agregar animación de salida
    if (currentQuantity === 1) {
      setRemovingItems([...removingItems, idProduct]);
      
      // Esperar a que termine la animación antes de eliminar
      setTimeout(() => {
        const result = removeItemOnce(idsProducts, idProduct);
        localStorage.setItem(STORAGE_PRODUCTS_IN_CART_KEY, JSON.stringify(result));
        getProductsInCartFromLocalStorage();
        setRemovingItems(removingItems.filter(id => id !== idProduct));
      }, 500);
    } else {
      const result = removeItemOnce(idsProducts, idProduct);
      localStorage.setItem(STORAGE_PRODUCTS_IN_CART_KEY, JSON.stringify(result));
      getProductsInCartFromLocalStorage();
    }
  };

  return (
    <>
      <Button variant="link" className="cart">
        {productsInCart.length > 0 ? (
          <CartFull onClick={openCart} />
        ) : (
          <CartEmpty onClick={openCart} />
        )}
      </Button>
      
      {/* Backdrop/Overlay que cierra el carrito al hacer clic fuera */}
      {cartOpen && (
        <div 
          className="cart-backdrop" 
          onClick={closeCart}
        />
      )}
      
      <div className="cart-content" style={{ width: widthCartContent }}>
        <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} productsInCart={productsInCart} />
        <div className="cart-content__products">
          {singleProductInCart &&
            singleProductInCart.map((productId: any) => (
              <CartContentProducts
                key={productId}
                products={products}
                idsProducts={productsInCart}
                idProduct={productId}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}                isRemoving={removingItems.includes(productId)}              />
            ))}
        </div>
        <CartContentFooter cartTotalPrice={cartTotalPrice} />
      </div>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar vaciado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres vaciar el carrito?
          <br /><br />
          Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmEmptyCart}>
            Vaciar carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function CartContentHeader(props: any) {
  const { closeCart, emptyCart, productsInCart } = props;

  return (
    <div className="cart-content__header">
      <div>
        <Close onClick={closeCart} />
        <h2>Carrito</h2>
      </div>
      {productsInCart.length > 0 && (
        <Button
          variant="link"
          className="cart-content__header-close"
          onClick={emptyCart}
        >
          Vaciar
          <Garbage />
        </Button>
      )}
    </div>
  );
}

function CartContentProducts(props: any) {
  const {
    products: { loading, data },
    idsProducts,
    idProduct,
    increaseQuantity,
    decreaseQuantity,
    isRemoving,
  } = props;

  if (!loading && data) {
    return data.map((product: any) => {
      if (product.id === idProduct) {
        const quantity = countDuplicates(idProduct, idsProducts);
        return (
          <RenderProduct
            key={product.id}
            product={product}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            isRemoving={isRemoving}
          />
        );
      }

      return null;
    });
  }

  return null;
}

function RenderProduct(props: any) {
  const { product, quantity, increaseQuantity, decreaseQuantity, isRemoving } = props;

  return (
    <div key={product.id} className={`cart-content__product ${isRemoving ? 'removing' : ''}`}>
      <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
      <div className="cart-content__product-info">
        <div>
          <h3 title={product.name}>{product.name.substring(0, 25)}...</h3>
          <p>{product.price ? product.price.toFixed(2) : "0.00"} € / ud.</p>
        </div>
        <div>
          <p>Cantidad: {quantity} ud.</p>
          <div>
            <button onClick={() => increaseQuantity(product.id)}>+</button>
            <button className="decrease-btn" onClick={() => decreaseQuantity(product.id)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartContentFooter(props: any) {
  const { cartTotalPrice } = props;

  return (
    <div className="cart-content__footer">
      <div>
        <p>Total</p>
        <p>{cartTotalPrice.toFixed(2)} €</p>
      </div>
      {cartTotalPrice > 0 && <Button variant="primary" className="pulse-button">Tramitar pedido</Button>}
    </div>
  );
}
