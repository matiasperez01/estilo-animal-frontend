import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export function useProductos() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

useEffect(() => {
  fetch(`${API_URL}/api/productos`)
    .then(res => {
      if (!res.ok) throw new Error('Error al cargar productos')
      return res.json()
    })
    .then(data => {
      setProductos(data)
    })
    .catch(err => setError(err.message))
    .finally(() => setLoading(false))
}, [])
  return { productos, loading, error }
}

export function useProductosBajoStock() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/productos/bajo-stock`)
      .then(res => res.json())
      .then(data => setProductos(data))
      .finally(() => setLoading(false))
  }, [])

  return { productos, loading }
}

export function useProductosDestacados() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/api/productos/destacados`)
      .then(res => res.json())
      .then(data => setProductos(data))
      .finally(() => setLoading(false))
  }, [])

  return { productos, loading }
}