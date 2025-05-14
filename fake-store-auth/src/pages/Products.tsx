import React, { useEffect, useState } from 'react'
import {
  Container,
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
} from '@mui/material'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Products() {
  const [products, setProducts] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/products')
      .then((res) => setProducts(res.data))
      .catch(() => {
        alert('Erro ao carregar produtos')
        localStorage.removeItem('token')
        navigate('/')
      })
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4} mb={2}>
        <Typography variant="h4">Produtos</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagem</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Descrição</TableCell>
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
                  <Avatar variant="square" src={product.image} alt={product.title} />
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
    </Container>
  )
}
