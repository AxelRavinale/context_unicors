// src/products/ProductForm.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Spinner } from 'react-bootstrap';
import { useToast } from '../context/ToastContext';

const API_BASE = 'https://crudcrud.com/api/e8e0c05322fe4f2596118ced85c8b56b/products';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // undefined si estamos creando
  const { showToast } = useToast();

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [loading, setLoading] = useState(false);

  // Modo edición: obtener datos si hay id
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${API_BASE}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNombre(data.nombre);
        setPrecio(data.precio);
        setLoading(false);
      })
      .catch((err) => console.error('Error al cargar producto', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      nombre,
      precio: parseFloat(precio),
    };

    try {
      if (id) {
        // PUT - actualizar
        await fetch(`${API_BASE}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        showToast('Producto actualizado ✅');
      } else {
        // POST - crear
        await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
        showToast('Producto creado 🎉');
      }
      navigate('/productos');
    } catch (err) {
      console.error('Error al guardar producto', err);
    }
  };

  return (
    <Container>
      <h2>{id ? 'Editar producto' : 'Crear nuevo producto'}</h2>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </Form.Group>

          <Button type="submit">{id ? 'Guardar cambios' : 'Crear producto'}</Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/productos')}
            className="ms-2"
          >
            Cancelar
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default ProductForm;
