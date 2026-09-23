const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

// Agrupa una lista de registros (ventas o pedidos a proveedor) por mes,
// usando su campo "fecha" y sumando su campo "total". Devuelve los meses
// ordenados del más reciente al más antiguo.
export function resumenPorMes(items, campoFecha = 'fecha', campoTotal = 'total') {
  const grupos = new Map()

  for (const item of items) {
    const fecha = item[campoFecha]
    if (!fecha) continue
    const d = new Date(fecha)
    if (Number.isNaN(d.getTime())) continue

    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const actual = grupos.get(key) ?? {
      key,
      label: `${MESES[d.getMonth()]} ${d.getFullYear()}`,
      total: 0,
      cantidad: 0,
    }
    actual.total += Number(item[campoTotal]) || 0
    actual.cantidad += 1
    grupos.set(key, actual)
  }

  return [...grupos.values()].sort((a, b) => b.key.localeCompare(a.key))
}

export function totalGeneral(items, campoTotal = 'total') {
  return items.reduce((suma, item) => suma + (Number(item[campoTotal]) || 0), 0)
}

// Igual que resumenPorMes, pero conserva los items de cada mes (para listas
// desplegables por mes). Devuelve los meses ordenados del más reciente al
// más antiguo, y los items de cada mes ordenados del más reciente al más
// antiguo también.
export function agruparPorMes(items, campoFecha = 'fecha', campoTotal = 'total') {
  const grupos = new Map()

  for (const item of items) {
    const fecha = item[campoFecha]
    if (!fecha) continue
    const d = new Date(fecha)
    if (Number.isNaN(d.getTime())) continue

    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const actual = grupos.get(key) ?? {
      key,
      label: `${MESES[d.getMonth()]} ${d.getFullYear()}`,
      total: 0,
      items: [],
    }
    actual.total += Number(item[campoTotal]) || 0
    actual.items.push(item)
    grupos.set(key, actual)
  }

  for (const grupo of grupos.values()) {
    grupo.items.sort((a, b) => new Date(b[campoFecha]) - new Date(a[campoFecha]))
  }

  return [...grupos.values()].sort((a, b) => b.key.localeCompare(a.key))
}
