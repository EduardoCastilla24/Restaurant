import { createRoot } from 'react-dom/client'

import { AuthProvider } from '@/context/auth/AuthProvider'

import './styles/globals.css'
import App from '@/routers/routers'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
