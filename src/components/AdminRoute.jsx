import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children }) {
  const isAuth = sessionStorage.getItem('adminAuth') === 'true'
  return isAuth ? children : <Navigate to="/admin/login" replace />
}