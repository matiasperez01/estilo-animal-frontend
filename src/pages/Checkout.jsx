import { useState } from 'react'
import { useCart } from '../store/CartContext'
import { formatPrice } from '../store/products'
import styles from './Checkout.module.css'

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER

const ZONAS_ENVIO = [
  { id: 'intevu',  label: 'Intevu / Centro',                    costo: 0 },
  { id: 'ch13',    label: 'Ch13 / Ch11 / Aeropuerto',           costo: 2500 },
  { id: 'vapor',   label: 'Vapor Amadeo',                       costo: 3000 },
  { id: 'altos',   label: 'Altos de la Estancia / San Martín Norte', costo: 3500 },
  { id: 'ch2',     label: 'Ch2 / CGT / Ch4',                    costo: 3000 },
  { id: 'austral', label: 'Barrio Austral',                     costo: 3500 },
]

function getZona(barrioId) {
  return ZONAS_ENVIO.find(z => z.id === barrioId) || null
}

function buildWhatsAppMessage(items, subtotal, costoEnvio, total, form) {
  const lineas = items.map(
    ({ product, size, qty }) =>
      `• ${product.name}${size ? ` (Talle ${size})` : ''} x${qty} — ${formatPrice(product.price * qty)}`
  )

  const zona = form.entrega === 'envio' ? getZona(form.barrio) : null

  const entregaTexto = form.entrega === 'retirar'
    ? 'Retiro en el local'
    : `Envío a domicilio\nBarrio: ${zona ? zona.label : ''}\nDirección: ${form.direccion}, ${form.ciudad}`

  const mensaje = [
    '¡Hola! Quiero hacer un pedido 🐾',
    '',
    '*Detalle del pedido:*',
    ...lineas,
    '',
    `*Subtotal:* ${formatPrice(subtotal)}`,
    form.entrega === 'envio' ? `*Envío:* ${costoEnvio > 0 ? formatPrice(costoEnvio) : 'Gratis'}` : '',
    `*Total:* ${formatPrice(total)}`,
    `*Entrega:* ${entregaTexto}`,
    '*Forma de pago:* ' + (form.pago === 'transferencia' ? 'Transferencia bancaria' : 'Efectivo'),
    '',
    '*Mis datos:*',
    `Nombre: ${form.nombre} ${form.apellido}`,
    `Teléfono: ${form.telefono}`,
    form.nota ? `Nota: ${form.nota}` : '',
  ]
    .filter(l => l !== undefined && l !== '')
    .join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(mensaje)}`
}

export default function Checkout() {
  const { state, subtotal, dispatch } = useCart()
  const { items } = state

  const [form, setForm] = useState({
    nombre: '', apellido: '', telefono: '',
    barrio: '', direccion: '',
    pago: 'transferencia',
    nota: '',
    entrega: 'retirar',
  })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleEntregaChange(e) {
    const value = e.target.value
    setForm(prev => ({ ...prev, entrega: value, barrio: value === 'retirar' ? '' : prev.barrio }))
  }

  const zonaSeleccionada = form.entrega === 'envio' ? getZona(form.barrio) : null
  const costoEnvio = zonaSeleccionada ? zonaSeleccionada.costo : 0
  const total = subtotal + costoEnvio

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.entrega === 'envio' && !form.barrio) {
      alert('Por favor seleccioná tu barrio para calcular el envío.')
      return
    }
    if (form.entrega === 'envio' && (!form.direccion || !form.ciudad)) {
      alert('Por favor completá la dirección de entrega.')
      return
    }

    try {
      const body = {
        nombreCliente: form.nombre,
        apellidoCliente: form.apellido,
        telefono: form.telefono,
        direccion: form.direccion || null,
        ciudad: null,
        tipoEntrega: form.entrega,
        medioPago: form.pago,
        nota: form.nota || null,
        estado: 'PENDIENTE',
        total,
        detalles: items.map(({ product, size, qty }) => ({
          nombreProducto: product.name,
          talle: size || null,
          cantidad: qty,
          precioUnitario: product.price,
          subtotal: product.price * qty,
        })),
      }

      await fetch(`${import.meta.env.VITE_API_URL}/api/ventas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (err) {
      console.error('Error al guardar el pedido:', err)
    }

    const url = buildWhatsAppMessage(items, subtotal, costoEnvio, total, form)
    window.open(url, '_blank')
    dispatch({ type: 'CLEAR_CART' })
  }

  if (items.length === 0) {
    return (
      <main className={styles.page}>
        <div className={styles.empty}>
          <p>Tu carrito está vacío.</p>
          <a href="/tienda" className={styles.backBtn}>Ver productos</a>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Hacer pedido</h1>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit}>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tus datos</h2>
            <div className={styles.row2}>
              <label className={styles.field}>
                <span>Nombre</span>
                <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Tu nombre" />
              </label>
              <label className={styles.field}>
                <span>Apellido</span>
                <input name="apellido" value={form.apellido} onChange={handleChange} required placeholder="Tu apellido" />
              </label>
            </div>
            <label className={styles.field}>
              <span>Teléfono / WhatsApp</span>
              <input name="telefono" type="tel" value={form.telefono} onChange={handleChange} required placeholder="+54 11 0000-0000" />
            </label>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Tipo de entrega</h2>
            <div className={styles.paymentOptions}>
              <label className={styles.paymentOption}>
                <input type="radio" name="entrega" value="retirar" checked={form.entrega === 'retirar'} onChange={handleEntregaChange} />
                <span>🏪 Retirar en el local</span>
              </label>
              <label className={styles.paymentOption}>
                <input type="radio" name="entrega" value="envio" checked={form.entrega === 'envio'} onChange={handleEntregaChange} />
                <span>🚚 Envío a domicilio</span>
              </label>
            </div>

            {form.entrega === 'envio' && (
              <>
                <label className={styles.field}>
                  <span>Barrio</span>
                  <select name="barrio" value={form.barrio} onChange={handleChange} required className={styles.barrioSelect}>
                    <option value="" disabled>Seleccioná tu barrio</option>
                    {ZONAS_ENVIO.map(z => (
                      <option key={z.id} value={z.id}>
                        {z.label} — {z.costo > 0 ? formatPrice(z.costo) : 'Gratis'}
                      </option>
                    ))}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Dirección</span>
                  <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Calle y número" />
                </label>
              </>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Forma de pago</h2>
            <div className={styles.paymentOptions}>
              <label className={styles.paymentOption}>
                <input type="radio" name="pago" value="transferencia" checked={form.pago === 'transferencia'} onChange={handleChange} />
                <span>🏦 Transferencia bancaria</span>
              </label>
              <label className={styles.paymentOption}>
                <input type="radio" name="pago" value="efectivo" checked={form.pago === 'efectivo'} onChange={handleChange} />
                <span>💵 Efectivo</span>
              </label>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Nota adicional <span className={styles.optional}>(opcional)</span></h2>
            <textarea
              name="nota"
              value={form.nota}
              onChange={handleChange}
              placeholder="¿Alguna aclaración sobre el pedido?"
              className={styles.textarea}
              rows={3}
            />
          </section>

          <button type="submit" className={styles.submitBtn}>
            <span>📲</span> Enviar pedido por WhatsApp
          </button>

          <p className={styles.hint}>
            Se va a abrir WhatsApp con el detalle de tu pedido listo para enviar.
            Coordinamos el pago y el envío por ahí.
          </p>
        </form>

        <aside className={styles.summary}>
          <h2 className={styles.sectionTitle}>Resumen del pedido</h2>
          <div className={styles.summaryItems}>
            {items.map(({ product, size, qty }) => (
              <div key={`${product.id}-${size}`} className={styles.summaryItem}>
                <div className={styles.summaryImg}>
                  {product.species === 'gato' ? '🐱' : '🐶'}
                </div>
                <div className={styles.summaryInfo}>
                  <p className={styles.summaryName}>{product.name}</p>
                  <p className={styles.summaryMeta}>
                    {size ? `Talle ${size} · ` : ''}x{qty}
                  </p>
                </div>
                <span className={styles.summaryPrice}>{formatPrice(product.price * qty)}</span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotals}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
            </div>
            {form.entrega === 'envio' && (
              <div className={styles.summaryRow}>
                <span>Envío</span>
                <span>
                  {form.barrio
                    ? (costoEnvio > 0 ? formatPrice(costoEnvio) : 'Gratis')
                    : 'Seleccioná tu barrio'}
                </span>
              </div>
            )}
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}