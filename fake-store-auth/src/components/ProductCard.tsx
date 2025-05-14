import React from 'react'
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
  id: number
  title: string
  price: number
  image: string
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, price, image }) => {
  const navigate = useNavigate()

  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/products/${id}`)}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          sx={{ objectFit: 'contain', padding: 2 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            R$ {price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProductCard
