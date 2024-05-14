import React, { useState, useEffect } from 'react';
import Description from './description';
import { Link } from 'react-router-dom';

import '../styles/productos.css';

export default function Productos({ productos, onAdd, carrito }) {
  
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <div className="contenedor-prod">
        {productos.map((producto, index) => (
          <div className="card-prod">
            <Link to={`/description/${producto.id}`}>
              <h2 className="title">{producto.title} </h2>
             
              <img key={index} src={producto.images} alt={`Product ${index}`} />
            </Link>
            <div className="comprar">
              <h3>${producto.price}</h3>
              <button
                className="btn-comprar"
                onClick={() => onAdd(producto.id)}
              >
                ➕{carrito.find(item => item.id === producto.id)?.quantity
                
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
