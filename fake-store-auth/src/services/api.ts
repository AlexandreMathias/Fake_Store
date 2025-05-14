import axios from 'axios'

// Cria uma instância do Axios configurada com a base da Fake Store API
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

// Intercepta todas as requisições para adicionar o token JWT no header Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
