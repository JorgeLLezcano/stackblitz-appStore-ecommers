import React, { useState } from 'react';
import '../styles/carrito';

export default function Carrito({
  carrito,
  onRemove,
  onDecrement,
  onAdd
}) {
  const calcularTotal = () => {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.price * producto.quantity;
    });
    return total;
  };
  return (
    <div className="contenedor-carrito">
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <ul>
          {carrito.map((producto) => (
            <li key={producto.id}>
              <span>
                {producto.title} - ${producto.price}{' '}
              </span>
              <div className="interaction">
                <button onClick={() => onAdd(producto.id)}> ➕ </button>
                {producto.quantity}
                <button onClick={() => onDecrement(producto.id)}> ➖ </button>
                <button
                  onClick={() => onRemove(producto.id)}
                  disabled={producto.quantity > 1}
                  
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p>Total: ${calcularTotal()}</p>
    </div>
  );
}
