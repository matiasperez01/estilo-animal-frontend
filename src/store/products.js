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

// Tipos de atributo predefinidos para las variantes de un producto (Talle, Color, etc.)
export const TIPOS_VARIANTE = ['Talle', 'Color', 'Sabor', 'Tamaño']

// Nombre a mostrar para el atributo de variante de un producto. Sin tipoVariante
// cargado se asume "Talle" (productos ya existentes, todos con talles).
export function varianteLabel(tipoVariante) {
  return tipoVariante || 'Talle'
}

// Plural del label (Talles, Colores, Sabores, Tamaños...). Termina en vocal -> +s,
// termina en consonante -> +es (regla general del español).
export function varianteLabelPlural(tipoVariante) {
  const label = varianteLabel(tipoVariante)
  return /[aeiouáéíóú]$/i.test(label) ? `${label}s` : `${label}es`
}
