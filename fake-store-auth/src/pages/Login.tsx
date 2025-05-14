import React, { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username,
        password,
      })
      const token = response.data.token
      localStorage.setItem('token', token)
      navigate('/products')
    } catch (error) {
      alert('Login falhou! Verifique suas credenciais.')
    }
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" gutterBottom textAlign="center">
            Sign in
          </Typography>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Submit
          </Button>
          <Box mt={2} textAlign="center">
            <Link href="#" underline="hover">
              Forgot Password?
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
