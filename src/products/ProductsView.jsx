// src/products/ProductsView.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form, Row, Col, Pagination, Container } from 'react-bootstrap';

const ProductsView = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://crudcrud.com/api/e8e0c05322fe4f2596118ced85c8b56b/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleCreate = () => navigate('/productos/crear');

  const handleEdit = (id) => {
    navigate(`/productos/editar/${id}`);
  };
  
  const handleDelete = async (id) => {
    try {
      await fetch(`https://crudcrud.com/api/713c93db8a1145d49a03ed9eeae4415d/products/${id}`, {
        method: 'DELETE',
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error al eliminar producto', err);
    }
  };
  
  return (
    <Container className="fade-in">
      <h2 className="mb-4">🛒 Lista de Productos</h2>

      <Row className="align-items-center mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset al buscar
            }}
          />
        </Col>
        <Col md="auto">
          <Button onClick={handleCreate}>➕ Nuevo producto</Button>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={3} className="g-3 mb-3">
        {currentProducts.length === 0 ? (
          <p>No hay productos para mostrar 😕</p>
        ) : (
          currentProducts.map((p) => (
            <Col key={p._id}>
              <Card border="primary">
                <Card.Body>
                  <Card.Title>{p.nombre}</Card.Title>
                  <Card.Text>
                    <strong>Precio:</strong> ${p.precio.toFixed(2)}
                  </Card.Text>
          
                  <div className="d-flex gap-2">
                    <Button variant="warning" size="sm" onClick={() => handleEdit(p._id)}>
                      ✏️ Editar
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(p._id)}>
                      🗑️ Eliminar
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))          
        )}
      </Row>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default ProductsView;

