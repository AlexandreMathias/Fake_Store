import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  Paper,
  Button,
} from '@mui/material';
import api from '../services/api';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
        }}
      >
        <Typography variant="h6" color="error">
          Produto não encontrado.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 6,
        px: 2,
        boxSizing: 'border-box',
      }}
    >
      {/* Botão Voltar estilizado */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 800,
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate('/products')}
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'bold',
            color: '#d32f2f',
            borderColor: '#d32f2f',
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: '#ffeaea',
              borderColor: '#c62828',
            },
          }}
        >
          Voltar
        </Button>
      </Box>

      <Paper
        elevation={6}
        sx={{
          maxWidth: 800,
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        <Card sx={{ boxShadow: 'none' }}>
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt={product.title}
            sx={{
              objectFit: 'contain',
              backgroundColor: '#fafafa',
              p: 3,
            }}
          />
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              {product.title}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              R$ {product.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}
