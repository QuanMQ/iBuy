import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import Admin from "./components/Admin/Admin";
import ViewCart from "./components/ViewCart/ViewCart";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Checkout from "./components/Checkout/Checkout";
import Order from "./components/Order/Order";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginFailed from "./components/LoginFailed/LoginFailed";
import { GlobalProvider } from "./context/GlobalState";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

// *Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

export type UserType = {
  googleId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  image: string;
  createdAt: Date;
  role: string;
};

export type OrderType = {
  orderNumber: number;
  address: string;
  products: CartItemType[];
  totals: number;
};

function App() {
  return (
    <GlobalProvider>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<ViewCart />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order" element={<Order />} />
            <Route path="/failed" element={<LoginFailed />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </GlobalProvider>
  );
}

export default App;
