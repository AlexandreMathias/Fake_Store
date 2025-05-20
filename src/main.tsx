import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Se estiver usando AuthContext, importe o provider:
// import { AuthProvider } from './contexts/AuthContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Com contexto de auth:
    <AuthProvider>
      <App />
    </AuthProvider>
    */}
    <App />
  </React.StrictMode>
)
