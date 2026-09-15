import { useState, useEffect } from 'react'
import { adminFetch } from '../../lib/adminAuth'
import { formatPrice } from '../../store/products'
import ProductLineItems from './ProductLineItems'
import styles from './AdminTable.module.css'
import pStyles from './AdminPedidos.module.css'

const API = import.meta.env.VITE_API_URL

const MEDIOS_PAGO = [
  { id: 'transferencia', label: 'Transferencia' },
  { id: 'efectivo', label: 'Efectivo' },
]

function hoyISO() {
  return new Date().toISOString().slice(0, 10)
}

const EMPTY_FORM = {
  fecha: hoyISO(),
  medioPago: 'efectivo',
  cobraEnvio: false,
  costoEnvio: '',
}

function formatFecha(fecha) {
  if (!fecha) return '—'
  return new Date(fecha).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function AdminVentas() {
  const [ventas, setVentas] = useState([])
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandido, setExpandido] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [items, setItems] = useState([])
  const [guardando, setGuardando] = useState(false)

  useEffect(() => { cargarDatos() }, [])

  async function cargarDatos() {
    setLoading(true)
    const [v, p] = await Promise.all([
      adminFetch(`${API}/api/ventas`).then(r => r.json()),
      adminFetch(`${API}/api/productos`).then(r => r.json()),
    ])
    setVentas(v.filter(venta => venta.origen === 'MANUAL'))
    setProductos(p)
    setLoading(false)
  }

  function abrirNuevo() {
    setForm(EMPTY_FORM)
    setItems([])
    setShowForm(true)
  }

  function cerrar() {
    setShowForm(false)
    setForm(EMPTY_FORM)
    setItems([])
  }

  const totalProductos = items.reduce((sum, i) => sum + i.subtotal, 0)
  const costoEnvio = form.cobraEnvio ? Number(form.costoEnvio) || 0 : 0
  const total = totalProductos + costoEnvio

  async function handleSubmit(e) {
    e.preventDefault()
    if (items.length === 0) return
    setGuardando(true)

    const body = {
      fecha: `${form.fecha}T12:00:00`,
      medioPago: form.medioPago,
      costoEnvio,
      detalles: items.map(i => ({
        producto: { id: i.productoId },
        nombreProducto: i.nombre,
        talle: i.talle,
        cantidad: i.cantidad,
        precioUnitario: i.precioUnitario,
      })),
    }

    await adminFetch(`${API}/api/ventas/manual`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setGuardando(false)
    cerrar()
    cargarDatos()
  }

  async function eliminar(id) {
    if (!confirm('¿Eliminás esta venta?')) return
    await adminFetch(`${API}/api/ventas/${id}`, { method: 'DELETE' })
    cargarDatos()
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Ventas</h1>
        <button className={styles.btnPrimary} onClick={abrirNuevo}>+ Nueva venta</button>
      </div>

      {loading ? (
        <p className={styles.estado}>Cargando...</p>
      ) : ventas.length === 0 ? (
        <p className={styles.estado}>Todavía no cargaste ninguna venta manual.</p>
      ) : (
        <div className={pStyles.list}>
          {ventas.map(v => {
            const isOpen = expandido === v.id
            return (
              <div key={v.id} className={pStyles.card}>
                <div className={pStyles.cardHeader} onClick={() => setExpandido(isOpen ? null : v.id)}>
                  <div className={pStyles.cardLeft}>
                    <span className={pStyles.pedidoId}>#{v.id}</span>
                    <div>
                      <p className={pStyles.clienteNombre}>{formatFecha(v.fecha)}</p>
                      <p className={pStyles.clienteMeta}>
                        {v.medioPago === 'transferencia' ? 'Transferencia' : 'Efectivo'}
                        {v.costoEnvio > 0 ? ` · Envío ${formatPrice(v.costoEnvio)}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className={pStyles.cardRight}>
                    <span className={pStyles.total}>{formatPrice(v.total)}</span>
                    <span className={pStyles.chevron}>{isOpen ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isOpen && (
                  <div className={pStyles.cardBody}>
                    <div>
                      <p className={pStyles.detallesTitle}>Productos</p>
                      {v.detalles?.map((d, i) => (
                        <div key={i} className={pStyles.detalleRow}>
                          <span>{d.nombreProducto ?? d.producto?.nombre}</span>
                          {d.talle && <span className={pStyles.talle}>Talle {d.talle}</span>}
                          <span>x{d.cantidad}</span>
                          <span>{formatPrice(d.subtotal)}</span>
                        </div>
                      ))}
                    </div>
                    <div className={pStyles.actions}>
                      <button className={styles.btnDelete} onClick={() => eliminar(v.id)}>Eliminar</button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {showForm && (
        <div className={styles.modalOverlay} onClick={cerrar}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Nueva venta</h2>
              <button className={styles.modalClose} onClick={cerrar}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>Fecha</span>
                  <input
                    type="date"
                    value={form.fecha}
                    onChange={e => setForm(prev => ({ ...prev, fecha: e.target.value }))}
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span>Forma de pago</span>
                  <select
                    value={form.medioPago}
                    onChange={e => setForm(prev => ({ ...prev, medioPago: e.target.value }))}
                  >
                    {MEDIOS_PAGO.map(m => (
                      <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                  </select>
                </label>
              </div>

              <label className={styles.field} style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  checked={form.cobraEnvio}
                  onChange={e => setForm(prev => ({ ...prev, cobraEnvio: e.target.checked }))}
                />
                <span>¿Se cobró envío?</span>
              </label>

              {form.cobraEnvio && (
                <label className={styles.field}>
                  <span>Monto del envío</span>
                  <input
                    type="number"
                    min="0"
                    value={form.costoEnvio}
                    onChange={e => setForm(prev => ({ ...prev, costoEnvio: e.target.value }))}
                    placeholder="$"
                  />
                </label>
              )}

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Productos vendidos</h3>
                <ProductLineItems productos={productos} items={items} onChange={setItems} />
              </section>

              <div className={pStyles.total} style={{ textAlign: 'right', fontSize: '18px' }}>
                Total: {formatPrice(total)}
              </div>

              <div className={styles.formFooter}>
                <button type="button" className={styles.btnSecondary} onClick={cerrar}>Cancelar</button>
                <button type="submit" className={styles.btnPrimary} disabled={guardando || items.length === 0}>
                  {guardando ? 'Guardando...' : 'Guardar venta'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
