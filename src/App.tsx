import { useState, useEffect } from "react";
import TopMenu from "./components/TopMenu";
import useFetch from "./hooks/useFetch";
import { API_BASE_URL, STORAGE_PRODUCTS_IN_CART_KEY } from "./utils/contants";
import Products from "./components/Products";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const products = useFetch(API_BASE_URL);
  const [productsInCart, setProductsInCart] = useState<number[]>([]);

  useEffect(() => {
    getProductsInCartFromLocalStorage();
  }, []);

  const getProductsInCartFromLocalStorage = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCTS_IN_CART_KEY);
    if (idsProducts) {
      const idsProductsParsed = JSON.parse(idsProducts);
      setProductsInCart(idsProductsParsed);
    } else {
      setProductsInCart([]);
    }
  };

  const addProductToCart = (id: number, name: string) => {
    const idsProducts = [...productsInCart];
    idsProducts.push(id);
    setProductsInCart(idsProducts);
    localStorage.setItem(
      STORAGE_PRODUCTS_IN_CART_KEY,
      JSON.stringify(idsProducts),
    );
    getProductsInCartFromLocalStorage();
    toast.success(`Producto ${name} agregado al carrito`);
  };

  return (
    <div className="App">
      <TopMenu
        productsInCart={productsInCart}
        getProductsInCartFromLocalStorage={getProductsInCartFromLocalStorage}
        products={products}
      />
      <Products products={products} addProductToCart={addProductToCart} />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
