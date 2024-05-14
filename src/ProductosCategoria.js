// ProductosCategoria.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './styles/ProductosCategria.css';

export default function ProductosCategoria({ onAdd, carrito }) {
  const { categoriaId, categoryName } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCart, setAddCart] = useState({});

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/categories/${categoriaId}/products`
        );
        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching API:', error);
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoriaId]);

  const handleAddToCart = (productId) => {
    setAddCart({
      ...addCart,
      [productId]: (addCart[productId] || 0) + 1,
    });
    onAdd(productId);
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div>
      <h2>Productos de la categoría {categoryName}</h2>
      <div className="contenedor-categories">
        {productos.map((producto, index) => (
          <div className="card-prod" key={index}>
            <h2 className="title">{producto.title}</h2>
            <Link to={`/description/${producto.id}`}>
              <img src={producto.images[0]} alt={`Product ${index}`} />
            </Link>
            <div className="comprar">
              <h3>${producto.price}</h3>
              <button
                className="btn-comprar"
                onClick={() => handleAddToCart(producto.id)}
              >
                ➕{carrito.find((item) => item.id === producto.id)?.quantity}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
