import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopMenu from "./components/TopMenu";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
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
    toast.success(`${name} agregado al carrito 🍦`);
  };

  return (
    <Router>
      <div className="App">
        <TopMenu
          productsInCart={productsInCart}
          getProductsInCartFromLocalStorage={getProductsInCartFromLocalStorage}
          products={products}
        />
        
        <Routes>
          <Route 
            path="/" 
            element={<Products products={products} addProductToCart={addProductToCart} />} 
          />
          <Route path="/sobre-nosotros" element={<AboutUs />} />
          <Route path="/contacto" element={<Contact />} />
        </Routes>

        <Footer />
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
    </Router>
  );
}

export default App;
