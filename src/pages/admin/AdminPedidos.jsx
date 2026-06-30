import { useState, useEffect } from 'react'
import styles from './AdminTable.module.css'
import pStyles from './AdminPedidos.module.css'

const API = import.meta.env.VITE_API_URL

const ESTADOS = {
  PENDIENTE:      { label: 'Pendiente',      color: '#B54A18', bg: '#FDE8DC' },
  EN_PREPARACION: { label: 'En preparación', color: '#7A5A00', bg: '#FFF3C4' },
  ENTREGADO:      { label: 'Entregado',      color: '#2E6B2E', bg: '#E6F4E6' },
  CANCELADA:      { label: 'Cancelado',      color: '#666',    bg: '#F0F0F0' },
}

function formatFecha(fecha) {
  if (!fecha) return '—'
  return new Date(fecha).toLocaleString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function formatPrice(n) {
  return '$' + Number(n).toLocaleString('es-AR')
}

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandido, setExpandido] = useState(null)

  useEffect(() => { cargar() }, [])

  async function cargar() {
    setLoading(true)
    const data = await fetch(`${API}/api/ventas`).then(r => r.json())
    setPedidos(data)
    setLoading(false)
  }

  async function cambiarEstado(id, estado) {
    await fetch(`${API}/api/ventas/${id}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado }),
    })
    cargar()
  }

  async function eliminar(id) {
    if (!confirm('¿Eliminás este pedido?')) return
    await fetch(`${API}/api/ventas/${id}`, { method: 'DELETE' })
    cargar()
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Pedidos</h1>
        <button className={styles.btnSecondary} onClick={cargar}>↻ Actualizar</button>
      </div>

      {loading ? (
        <p className={styles.estado}>Cargando...</p>
      ) : pedidos.length === 0 ? (
        <p className={styles.estado}>No hay pedidos todavía.</p>
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
                      <p className={pStyles.clienteNombre}>{p.nombreCliente} {p.apellidoCliente}</p>
                      <p className={pStyles.clienteMeta}>{p.telefono} · {formatFecha(p.fecha)}</p>
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
                          {d.talle && <span className={pStyles.talle}>Talle {d.talle}</span>}
                          <span>x{d.cantidad}</span>
                          <span>{formatPrice(d.subtotal)}</span>
                        </div>
                      ))}
                    </div>

                    <div className={pStyles.infoGrid}>
                      <div>
                        <p className={pStyles.infoLabel}>Entrega</p>
                        <p>{p.tipoEntrega === 'envio' ? `📦 Envío — ${p.direccion}, ${p.ciudad}` : '🏪 Retira en local'}</p>
                      </div>
                      <div>
                        <p className={pStyles.infoLabel}>Pago</p>
                        <p>{p.medioPago === 'transferencia' ? '🏦 Transferencia' : '💵 Efectivo'}</p>
                      </div>
                      {p.nota && (
                        <div>
                          <p className={pStyles.infoLabel}>Nota</p>
                          <p>{p.nota}</p>
                        </div>
                      )}
                    </div>

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
    </div>
  )
}