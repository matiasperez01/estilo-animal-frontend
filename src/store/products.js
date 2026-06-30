export const CATEGORIES = [
  { id: 'todos',        label: 'Todos' },
  { id: 'perro',        label: 'Perros' },
  { id: 'gato',         label: 'Gatos' },
  { id: 'abrigos',      label: 'Abrigos' },
  { id: 'mundial 2026', label: 'Mundial 2026' },
  { id: 'remeras',      label: 'Remeras' },
  { id: 'accesorios',   label: 'Accesorios' },
  { id: 'juguetes',     label: 'Juguetes' },
]


export function filterProducts(products, filter) {
  if (filter === 'todos') return products
  return products.filter(
    p => p.species === filter || p.category === filter
  )
}

export function formatPrice(amount) {
  return '$' + amount.toLocaleString('es-AR')
}
