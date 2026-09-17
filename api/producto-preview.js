// Página de vista previa para bots de redes sociales (WhatsApp, Facebook,
// Twitter/X, Telegram, etc.). Estos bots no ejecutan JavaScript, así que al
// pedir /producto/:id solo verían el index.html genérico del SPA. Esta
// función les sirve en su lugar un HTML mínimo con las etiquetas Open Graph
// del producto puntual (imagen, título, precio). Los usuarios reales nunca
// llegan acá: vercel.json solo enruta hacia esta función cuando el
// User-Agent coincide con un bot conocido.

const API_URL = process.env.VITE_API_URL || 'https://estilo-animal-backend-production.up.railway.app'
const SITE_URL = 'https://www.estiloanimalrg.com'
const IMAGEN_DEFAULT = `${SITE_URL}/og-image.jpg`

function escapeHtml(texto) {
  return String(texto)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default async function handler(req, res) {
  const id = req.query.id
  let producto = null

  try {
    const r = await fetch(`${API_URL}/api/productos/${id}`)
    if (r.ok) producto = await r.json()
  } catch (err) {
    // Si falla la API, se sirve la vista previa genérica del sitio.
  }

  const nombre = producto?.nombre || 'Estilo Animal RG'
  const descripcion = producto?.descripcion || 'Indumentaria y accesorios para mascotas. Comprá online desde Río Grande, Tierra del Fuego.'
  const imagen = producto?.imagenUrl || IMAGEN_DEFAULT
  const url = `${SITE_URL}/producto/${id}`

  // Si tiene variantes, el precio base suele ser un placeholder: el precio
  // real está en cada opción (igual que en la tarjeta de producto de la tienda).
  const tieneVariantes = producto?.variantes?.length > 0
  const precioNumero = tieneVariantes
    ? Math.min(...producto.variantes.map(v => Number(v.precio)))
    : Number(producto?.precio) || null
  const precio = precioNumero ? precioNumero.toLocaleString('es-AR') : null
  const titulo = precio ? `${nombre} - ${tieneVariantes ? 'desde ' : ''}$${precio}` : nombre

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(titulo)} | Estilo Animal RG</title>
<meta name="description" content="${escapeHtml(descripcion)}" />

<meta property="og:title" content="${escapeHtml(titulo)}" />
<meta property="og:description" content="${escapeHtml(descripcion)}" />
<meta property="og:image" content="${escapeHtml(imagen)}" />
<meta property="og:url" content="${escapeHtml(url)}" />
<meta property="og:type" content="product" />
<meta property="og:site_name" content="Estilo Animal RG" />
${precio ? `<meta property="product:price:amount" content="${precio.replace(/\./g, '')}" />\n<meta property="product:price:currency" content="ARS" />` : ''}

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(titulo)}" />
<meta name="twitter:description" content="${escapeHtml(descripcion)}" />
<meta name="twitter:image" content="${escapeHtml(imagen)}" />
</head>
<body>
<a href="${escapeHtml(url)}">${escapeHtml(nombre)}</a>
</body>
</html>`

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  res.status(200).send(html)
}
