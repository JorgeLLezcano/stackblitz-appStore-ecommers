import React, { useState, useEffect } from 'react';
import {
  Router,
  Routes,
  Route,
  Outlet,
  Link,
  useParams,
  BrowserRouter,
} from 'react-router-dom';
import Productos from './components/productos';
import Layout from './components/layout';
import Description from './components/description';
import ProductosCategoria from './ProductosCategoria';
import Carrito from './components/carrito';

import './style.css';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const apiFetch = async () => {
      try {
        const response = await fetch(
          'https://api.escuelajs.co/api/v1/products'
        );
        const data = await response.json();
        console.log(data);
        setProductos(data);
      } catch (error) {
        console.error('Error fetching API:', error);
      }
    };

    apiFetch();
  }, []);

  function handlerAdd(id) {
    const selectedProducto = productos.find((producto) => producto.id === id);
    handlTotal();
    if (selectedProducto) {
      const existingIndex = carrito.findIndex((item) => item.id === id);
      if (existingIndex !== -1) {
        const updatedCarrito = [...carrito];
        updatedCarrito[existingIndex].quantity += 1;
        setCarrito(updatedCarrito);
      } else {
        selectedProducto.quantity = 1;
        setCarrito([...carrito, selectedProducto]);
      }
    }
  }

  function handlerRemove(id) {
    const updatedCarrito = carrito.filter((producto) => producto.id !== id);
    setCarrito(updatedCarrito);
  }

  function handlerDecrement(id) {
    const updatedCarrito = carrito.map((producto) => {
      if (producto.id === id && producto.quantity > 1) {
        return { ...producto, quantity: producto.quantity - 1 };
      }
      return producto;
    });
    setCarrito(updatedCarrito);
  }

  function handlTotal() {
    const totalAmount = productos.reduce(
      (acc, card) => (card.added ? acc + parseFloat(card.price) : acc),
      0
    );
    setTotal(totalAmount);
  }
  return (
    <Layout carrito={carrito}>
      <Routes>
        <Route
          path="/"
          element={
            <Productos
              productos={productos}
              onAdd={handlerAdd}
              carrito={carrito}
            />
          }
        />
        <Route
          path="/description/:id"
          element={
            <Description
              productos={productos}
              onAdd={handlerAdd}
              onDecrement={handlerDecrement}
            />
          }
        />

        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              onRemove={handlerRemove}
              onDecrement={handlerDecrement}
              total={total}
              onAdd={handlerAdd}
            />
          }
        />

        {/* //<Route path="/productos/:categoriaId" component={<ProductosCategoria/>} /> */}
        <Route
          path="/productos/:categoriaId/:categoryName"
          element={<ProductosCategoria onAdd={handlerAdd} carrito={carrito} />}
        />
      </Routes>
    </Layout>
  );
}
