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

// Adapta un producto tal como lo devuelve la API al formato que usan las
// vistas públicas (ProductCard, Catalog, Home, ProductDetail).
export function adaptarProducto(p) {
  return {
    id: p.id,
    name: p.nombre,
    description: p.descripcion,
    species: p.especie?.toLowerCase() ?? 'perro',
    category: p.categoria?.nombre?.toLowerCase() ?? '',
    price: Number(p.precio) || 0,
    precioDescuento: p.precioDescuento ? Number(p.precioDescuento) : null,
    sizes: [],
    image: p.imagenUrl ?? null,
    imagenes: p.imagenes ?? [],
    badge: p.especie === 'gato' ? 'Gato' : p.especie === 'ambos' ? 'Perros y Gatos' : 'Perro',
    stock: p.stock ?? 0,
    variantes: p.variantes ?? [],
    tipoVariante: p.tipoVariante ?? null,
  }
}

// Precio "real" de un producto para ordenar/filtrar: el mínimo entre sus
// variantes, o el de oferta si está cargado y es menor (solo aplica sin
// variantes, ya que cada una tiene su propio precio).
export function precioEfectivo(product) {
  const tieneVariantes = product.variantes?.length > 0
  const precioMinimo = tieneVariantes
    ? Math.min(...product.variantes.map(v => Number(v.precio)))
    : Number(product.price)
  const enOferta = !tieneVariantes && product.precioDescuento > 0 && product.precioDescuento < precioMinimo
  return enOferta ? Number(product.precioDescuento) : precioMinimo
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
