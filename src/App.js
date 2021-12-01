import Customers from "pages/Customers";
import Dashboard from "pages/Dashboard";
import Home from "pages/Home";
import Orders from "pages/Orders";
import Products from "pages/Products";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App d-flex">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home"></Navigate>}>
          </Route>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
          <Route path="/products" element={<Products></Products>}></Route>
          <Route path="/orders" element={<Orders></Orders>}></Route>
          <Route path="/customers" element={<Customers></Customers>}></Route>
          <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
