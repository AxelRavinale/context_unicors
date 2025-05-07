// src/unicorns/UnicornsView.jsx
import React, { useState } from 'react';
import {
  Button,
  Table,
  Form,
  Row,
  Col,
  Container,
  Pagination,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUnicorns } from '../context/UnicornContext';
import { useTheme } from '../context/ThemeContext';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // 👈 Importación correcta

const UnicornsView = () => {
  const navigate = useNavigate();
  const { unicorns, deleteUnicorn, loading } = useUnicorns();
  const { darkMode } = useTheme();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const filtered = unicorns.filter((u) =>
    u.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const currentItems = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleDelete = (id) => {
    if (window.confirm('¿Eliminar este unicornio? 🦄')) {
      deleteUnicorn(id);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Lista de Unicornios 🦄', 14, 15);

    const tableColumn = ['Nombre', 'Color', 'Edad'];
    const tableRows = unicorns.map((u) => [u.nombre, u.color, u.edad]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('unicorns.pdf');
  };

  return (
    <Container>
      <h2 className="mb-4">🦄 Lista de Unicornios</h2>

      <Row className="mb-3 align-items-center">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </Col>
        <Col md="auto">
          <Button onClick={() => navigate('/unicornios/crear')}>
            ➕ Nuevo unicornio
          </Button>{' '}
          <Button variant="secondary" onClick={exportToPDF}>
            📄 Exportar PDF
          </Button>
        </Col>
      </Row>

      <Table
        striped
        bordered
        hover
        responsive
        className={darkMode ? 'table-dark' : ''}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Color</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Cargando unicornios...</td>
            </tr>
          ) : currentItems.length === 0 ? (
            <tr>
              <td colSpan="4">No hay resultados 😢</td>
            </tr>
          ) : (
            currentItems.map((u) => (
              <tr key={u._id}>
                <td>{u.nombre}</td>
                <td>{u.color}</td>
                <td>{u.edad}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigate(`/unicornios/editar/${u._id}`)}
                  >
                    ✏️ Editar
                  </Button>{' '}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(u._id)}
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default UnicornsView;
