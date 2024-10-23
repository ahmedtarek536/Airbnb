import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import store from "./hooks/stor";
import Account from "./pages/Account";
import ProductsManages from "./pages/ProductsManages";
import NewProduct from "./pages/NewProduct";
import Orders from "./pages/Orders";
import OrdersListening from "./pages/OrdersListening";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:productID" element={<ProductPage />} />
            <Route path="/products/manage" element={<ProductsManages />} />
            <Route path="/products/manage/new" element={<NewProduct />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Signup />} />
            <Route path="/users/profile" element={<UserProfile />} />
            <Route path="/users/account" element={<Account />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/listening" element={<OrdersListening />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="bottom-left"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "12px 24px",
              background: "white",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
