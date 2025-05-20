import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Box,
  Avatar,
} from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => {
        alert('Erro ao carregar produtos');
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box
  sx={{
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    py: 6,
    px: 2,
    boxSizing: 'border-box',
    background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
  }}

    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 1200,
          borderRadius: 3,
          p: 4,
          backgroundColor: '#fff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" sx={{ color: '#00796b', fontWeight: 600 }}>
            Produtos
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            sx={{ fontWeight: 'bold' }}
          >
            LOGOUT
          </Button>
        </Box>

        <TableContainer sx={{ overflowX: 'auto', borderRadius: 2 }}>
          <Table sx={{ minWidth: '100%' }}>
            <TableHead sx={{ backgroundColor: '#e0f2f1' }}>
              <TableRow>
                <TableCell><strong>Imagem</strong></TableCell>
                <TableCell><strong>Nome</strong></TableCell>
                <TableCell><strong>Preço</strong></TableCell>
                <TableCell><strong>Categoria</strong></TableCell>
                <TableCell><strong>Descrição</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  <TableCell>
                    <Avatar
                      variant="square"
                      src={product.image}
                      alt={product.title}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    {product.description.length > 80
                      ? product.description.slice(0, 80) + '...'
                      : product.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
