import React from 'react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import App from '../App';
import '../styles/layout';

export default function Layout({ children, carrito }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://api.escuelajs.co/api/v1/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching API:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="layaout">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" className='link'>
                <h1> Inicio</h1>
              </Link>
            </li>
            
              
           
            {/* <li>
              <Link to="/productos">productos</Link>
            </li> */}
            {/* <li>
              <Link to="/description">description</Link>
            </li> */}
          </ul>
        </nav>

        {categories.map((category) => (
          <Link key={category.id} to={`/productos/${category.id}/${category.name}`}>
            <button >{category.name}</button>
          </Link>
        ))}
        <Link to="/carrito" className='link-carrito' >
              🛒<h1>  {carrito.length}</h1>
              </Link>
      </header>
      <main>{children}</main>
      <footer>soy un footer</footer>
    </div>
  );
}

///window.location.href = `/productos/${category.id}`
