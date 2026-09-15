import { useState } from 'react'
import { formatPrice } from '../../store/products'
import tableStyles from './AdminTable.module.css'
import styles from './ProductLineItems.module.css'

export default function ProductLineItems({ productos, items, onChange, autoFillPrice = true, priceLabel = 'Precio' }) {
  const [query, setQuery] = useState('')
  const [staged, setStaged] = useState(null)

  const resultados = query.trim()
    ? productos.filter(p => p.nombre.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
    : []

  function elegirProducto(producto) {
    const sinVariantes = !producto.variantes || producto.variantes.length === 0
    setStaged({
      producto,
      talle: '',
      cantidad: 1,
      precioUnitario: autoFillPrice && sinVariantes ? Number(producto.precio) : '',
    })
    setQuery('')
  }

  function elegirTalle(talle) {
    const variante = staged.producto.variantes.find(v => v.talle === talle)
    setStaged(prev => ({
      ...prev,
      talle,
      precioUnitario: autoFillPrice && variante ? Number(variante.precio) : prev.precioUnitario,
    }))
  }

  function agregar() {
    const tieneVariantes = staged.producto.variantes?.length > 0
    if (tieneVariantes && !staged.talle) return
    if (!staged.cantidad || Number(staged.cantidad) <= 0) return
    if (staged.precioUnitario === '' || staged.precioUnitario === null) return

    const cantidad = Number(staged.cantidad)
    const precioUnitario = Number(staged.precioUnitario)

    onChange([
      ...items,
      {
        productoId: staged.producto.id,
        nombre: staged.producto.nombre,
        talle: staged.talle || null,
        cantidad,
        precioUnitario,
        subtotal: cantidad * precioUnitario,
      },
    ])
    setStaged(null)
  }

  function quitar(index) {
    onChange(items.filter((_, i) => i !== index))
  }

  return (
    <div className={styles.wrapper}>
      {!staged && (
        <div className={styles.searchBox}>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar producto por nombre..."
            className={styles.searchInput}
          />
          {resultados.length > 0 && (
            <div className={styles.results}>
              {resultados.map(p => (
                <button type="button" key={p.id} className={styles.resultItem} onClick={() => elegirProducto(p)}>
                  {p.nombre}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {staged && (
        <div className={styles.stagedRow}>
          <span className={styles.stagedNombre}>{staged.producto.nombre}</span>

          {staged.producto.variantes?.length > 0 && (
            <select
              value={staged.talle}
              onChange={e => elegirTalle(e.target.value)}
              className={styles.stagedSelect}
            >
              <option value="" disabled>Talle</option>
              {staged.producto.variantes.map(v => (
                <option key={v.id} value={v.talle}>{v.talle}</option>
              ))}
            </select>
          )}

          <input
            type="number"
            min="1"
            value={staged.cantidad}
            onChange={e => setStaged(prev => ({ ...prev, cantidad: e.target.value }))}
            placeholder="Cant."
            className={styles.stagedCantidad}
          />

          <input
            type="number"
            min="0"
            value={staged.precioUnitario}
            onChange={e => setStaged(prev => ({ ...prev, precioUnitario: e.target.value }))}
            placeholder={priceLabel}
            className={styles.stagedPrecio}
          />

          <button type="button" className={tableStyles.btnPrimary} onClick={agregar}>Agregar</button>
          <button type="button" className={tableStyles.btnSecondary} onClick={() => setStaged(null)}>Cancelar</button>
        </div>
      )}

      {items.length > 0 && (
        <div className={tableStyles.tableWrapper}>
        <table className={`${tableStyles.variantesTable} ${styles.itemsTable}`}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Talle</th>
              <th>Cant.</th>
              <th>{priceLabel}</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.nombre}</td>
                <td>{item.talle ?? '—'}</td>
                <td>{item.cantidad}</td>
                <td>{formatPrice(item.precioUnitario)}</td>
                <td>{formatPrice(item.subtotal)}</td>
                <td>
                  <button type="button" className={tableStyles.btnDelete} onClick={() => quitar(i)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  )
}
