import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../lib/adminAuth'

export default function AdminRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />
}