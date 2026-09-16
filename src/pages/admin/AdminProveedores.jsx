import { useState, useEffect } from 'react'
import { adminFetch } from '../../lib/adminAuth'
import { formatPrice } from '../../store/products'
import ProductLineItems from './ProductLineItems'
import styles from './AdminTable.module.css'
import pStyles from './AdminPedidos.module.css'

const API = import.meta.env.VITE_API_URL

const ESTADOS = {
  PENDIENTE: { label: 'Pendiente', color: '#B54A18', bg: '#FDE8DC' },
  RECIBIDO:  { label: 'Recibido',  color: '#2E6B2E', bg: '#E6F4E6' },
  CANCELADO: { label: 'Cancelado', color: '#666',    bg: '#F0F0F0' },
}

function hoyISO() {
  return new Date().toISOString().slice(0, 10)
}

const EMPTY_FORM = { proveedorId: '', fecha: hoyISO(), nota: '' }
const EMPTY_PROVEEDOR = { nombre: '', telefono: '' }

function formatFecha(fecha) {
  if (!fecha) return '—'
  return new Date(fecha).toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function AdminProveedores() {
  const [pedidos, setPedidos] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandido, setExpandido] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showNuevoProveedor, setShowNuevoProveedor] = useState(false)
  const [nuevoProveedor, setNuevoProveedor] = useState(EMPTY_PROVEEDOR)
  const [form, setForm] = useState(EMPTY_FORM)
  const [items, setItems] = useState([])
  const [guardando, setGuardando] = useState(false)

  useEffect(() => { cargarDatos() }, [])

  async function cargarDatos() {
    setLoading(true)
    const [ped, prov, prod] = await Promise.all([
      adminFetch(`${API}/api/pedidos-proveedor`).then(r => r.json()),
      adminFetch(`${API}/api/proveedores`).then(r => r.json()),
      adminFetch(`${API}/api/productos`).then(r => r.json()),
    ])
    setPedidos(ped)
    setProveedores(prov)
    setProductos(prod)
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
    setShowNuevoProveedor(false)
    setNuevoProveedor(EMPTY_PROVEEDOR)
  }

  async function crearProveedor() {
    if (!nuevoProveedor.nombre.trim()) return
    const res = await adminFetch(`${API}/api/proveedores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProveedor),
    })
    const creado = await res.json()
    setProveedores(prev => [...prev, creado])
    setForm(prev => ({ ...prev, proveedorId: creado.id }))
    setShowNuevoProveedor(false)
    setNuevoProveedor(EMPTY_PROVEEDOR)
  }

  const total = items.reduce((sum, i) => sum + i.subtotal, 0)

  async function handleSubmit(e) {
    e.preventDefault()
    if (items.length === 0 || !form.proveedorId) return
    setGuardando(true)

    const body = {
      fecha: `${form.fecha}T12:00:00`,
      proveedor: { id: Number(form.proveedorId) },
      nota: form.nota || null,
      detalles: items.map(i => ({
        productoId: i.productoId || null,
        nombreProducto: i.nombre,
        talle: i.talle,
        cantidad: i.cantidad,
        precioUnitario: i.precioUnitario,
      })),
    }

    try {
      const res = await adminFetch(`${API}/api/pedidos-proveedor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const detalle = await res.text().catch(() => '')
        throw new Error(`El servidor respondió ${res.status}${detalle ? `: ${detalle}` : ''}`)
      }

      setGuardando(false)
      cerrar()
      cargarDatos()
    } catch (err) {
      setGuardando(false)
      alert(`No se pudo guardar el pedido. Probá de nuevo.\n\n${err.message}`)
    }
  }

  async function cambiarEstado(id, estado) {
    await adminFetch(`${API}/api/pedidos-proveedor/${id}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado }),
    })
    cargarDatos()
  }

  async function eliminar(id) {
    if (!confirm('¿Eliminás este pedido?')) return
    await adminFetch(`${API}/api/pedidos-proveedor/${id}`, { method: 'DELETE' })
    cargarDatos()
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Pedidos a proveedores</h1>
        <button className={styles.btnPrimary} onClick={abrirNuevo}>+ Nuevo pedido</button>
      </div>

      {loading ? (
        <p className={styles.estado}>Cargando...</p>
      ) : pedidos.length === 0 ? (
        <p className={styles.estado}>Todavía no cargaste ningún pedido a proveedores.</p>
      ) : (
        <div className={pStyles.list}>
          {pedidos.map(p => {
            const est = ESTADOS[p.estado] ?? ESTADOS.PENDIENTE
            const isOpen = expandido === p.id
            return (
              <div key={p.id} className={pStyles.card}>
                <div className={pStyles.cardHeader} onClick={() => setExpandido(isOpen ? null : p.id)}>
                  <div className={pStyles.cardLeft}>
                    <span className={pStyles.pedidoId}>#{p.id}</span>
                    <div>
                      <p className={pStyles.clienteNombre}>{p.proveedor?.nombre ?? 'Sin proveedor'}</p>
                      <p className={pStyles.clienteMeta}>{formatFecha(p.fecha)}</p>
                    </div>
                  </div>
                  <div className={pStyles.cardRight}>
                    <span className={pStyles.total}>{formatPrice(p.total)}</span>
                    <span className={pStyles.badge} style={{ color: est.color, background: est.bg }}>
                      {est.label}
                    </span>
                    <span className={pStyles.chevron}>{isOpen ? '▲' : '▼'}</span>
                  </div>
                </div>

                {isOpen && (
                  <div className={pStyles.cardBody}>
                    <div>
                      <p className={pStyles.detallesTitle}>Productos</p>
                      {p.detalles?.map((d, i) => (
                        <div key={i} className={pStyles.detalleRow}>
                          <span>{d.nombreProducto ?? d.producto?.nombre}</span>
                          {d.talle && <span className={pStyles.talle}>{d.talle}</span>}
                          <span>x{d.cantidad}</span>
                          <span>{formatPrice(d.subtotal)}</span>
                        </div>
                      ))}
                    </div>

                    {p.nota && (
                      <div>
                        <p className={pStyles.infoLabel}>Nota</p>
                        <p>{p.nota}</p>
                      </div>
                    )}

                    <div className={pStyles.actions}>
                      <p className={pStyles.infoLabel}>Cambiar estado:</p>
                      <div className={pStyles.estadoBtns}>
                        {Object.entries(ESTADOS).map(([key, val]) => (
                          <button
                            key={key}
                            className={`${pStyles.estadoBtn} ${p.estado === key ? pStyles.estadoBtnActive : ''}`}
                            style={p.estado === key ? { background: val.bg, color: val.color, borderColor: val.color } : {}}
                            onClick={() => cambiarEstado(p.id, key)}
                          >
                            {val.label}
                          </button>
                        ))}
                        <button className={styles.btnDelete} onClick={() => eliminar(p.id)}>Eliminar</button>
                      </div>
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
              <h2>Nuevo pedido a proveedor</h2>
              <button className={styles.modalClose} onClick={cerrar}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row2}>
                <label className={styles.field}>
                  <span>Proveedor</span>
                  <select
                    value={form.proveedorId}
                    onChange={e => setForm(prev => ({ ...prev, proveedorId: e.target.value }))}
                    required
                  >
                    <option value="" disabled>Seleccioná un proveedor</option>
                    {proveedores.map(prov => (
                      <option key={prov.id} value={prov.id}>{prov.nombre}</option>
                    ))}
                  </select>
                </label>
                <label className={styles.field}>
                  <span>Fecha</span>
                  <input
                    type="date"
                    value={form.fecha}
                    onChange={e => setForm(prev => ({ ...prev, fecha: e.target.value }))}
                    required
                  />
                </label>
              </div>

              {!showNuevoProveedor ? (
                <button type="button" className={styles.btnSecondary} onClick={() => setShowNuevoProveedor(true)}>
                  + Nuevo proveedor
                </button>
              ) : (
                <div className={styles.row2}>
                  <label className={styles.field}>
                    <span>Nombre del proveedor</span>
                    <input
                      value={nuevoProveedor.nombre}
                      onChange={e => setNuevoProveedor(prev => ({ ...prev, nombre: e.target.value }))}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Teléfono</span>
                    <input
                      value={nuevoProveedor.telefono}
                      onChange={e => setNuevoProveedor(prev => ({ ...prev, telefono: e.target.value }))}
                    />
                  </label>
                  <div className={styles.formFooter} style={{ borderTop: 'none', paddingTop: 0 }}>
                    <button type="button" className={styles.btnSecondary} onClick={() => setShowNuevoProveedor(false)}>Cancelar</button>
                    <button type="button" className={styles.btnPrimary} onClick={crearProveedor}>Crear proveedor</button>
                  </div>
                </div>
              )}

              <label className={styles.field}>
                <span>Nota <span className={styles.optional}>(opcional)</span></span>
                <textarea
                  value={form.nota}
                  onChange={e => setForm(prev => ({ ...prev, nota: e.target.value }))}
                  rows={2}
                />
              </label>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Productos del pedido</h3>
                <ProductLineItems
                  productos={productos}
                  items={items}
                  onChange={setItems}
                  autoFillPrice={false}
                  priceLabel="Costo"
                  allowCreateProduct
                  onProductCreated={p => setProductos(prev => [...prev, p])}
                />
              </section>

              <div className={pStyles.total} style={{ textAlign: 'right', fontSize: '18px' }}>
                Total: {formatPrice(total)}
              </div>

              <div className={styles.formFooter}>
                <button type="button" className={styles.btnSecondary} onClick={cerrar}>Cancelar</button>
                <button type="submit" className={styles.btnPrimary} disabled={guardando || items.length === 0 || !form.proveedorId}>
                  {guardando ? 'Guardando...' : 'Guardar pedido'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
