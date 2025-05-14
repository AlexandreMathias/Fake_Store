import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Typography, Card, CardMedia, CardContent, CircularProgress, Box } from '@mui/material'
import api from '../services/api'

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchProduct()
  }, [id])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    )
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h6" color="error">
          Produto não encontrado.
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardMedia
          component="img"
          height="400"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'contain', padding: 2 }}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h6" color="primary">
            R$ {product.price.toFixed(2)}
          </Typography>
          <Typography variant="body1" mt={2}>
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
