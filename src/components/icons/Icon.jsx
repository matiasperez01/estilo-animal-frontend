const base = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function IconTruck(props) {
  return (
    <svg {...base} {...props}>
      <rect x="1" y="4" width="14" height="12" rx="1" />
      <path d="M15 9h4l3 3v4h-7z" />
      <circle cx="6" cy="18.5" r="1.6" />
      <circle cx="18" cy="18.5" r="1.6" />
    </svg>
  )
}

export function IconStore(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3 9.5 4.5 4h15L21 9.5" />
      <path d="M3 9.5a2.3 2.3 0 0 0 4.5.7 2.3 2.3 0 0 0 4.5 0 2.3 2.3 0 0 0 4.5 0 2.3 2.3 0 0 0 4.5-.7" />
      <path d="M5 10v9h14v-9" />
      <path d="M10 19v-5h4v5" />
    </svg>
  )
}

export function IconCreditCard(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="6" y1="15" x2="10" y2="15" />
    </svg>
  )
}

export function IconBanknote(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <line x1="6" y1="9" x2="6" y2="9.01" />
      <line x1="18" y1="15" x2="18" y2="15.01" />
    </svg>
  )
}

export function IconMessageCircle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.9-.94L3 20l1.05-5.4A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  )
}

export function IconWhatsApp(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function IconInstagram(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

export function IconRuler(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="7" width="19" height="10" rx="1.5" transform="rotate(-8 12 12)" />
      <path d="M6 9.3l.6 2M9.5 8.7l.6 2M13 8.2l.6 2M16.5 7.6l.6 2" />
    </svg>
  )
}

export function IconPackage(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 8v8a1 1 0 0 1-.5.87l-8 4.5a1 1 0 0 1-1 0l-8-4.5A1 1 0 0 1 3 16V8" />
      <path d="M3 8l9-5 9 5-9 5-9-5z" />
      <line x1="12" y1="13" x2="12" y2="21.5" />
    </svg>
  )
}

export function IconRefresh(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 11a8 8 0 0 0-14.6-4.6M4 5v5h5" />
      <path d="M4 13a8 8 0 0 0 14.6 4.6M20 19v-5h-5" />
    </svg>
  )
}

export function IconShoppingBag(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7a1.5 1.5 0 0 1-1.5-1.5z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  )
}

export function IconStar(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.5l2.9 6.4 6.9.7-5.2 4.7 1.5 6.9L12 17.6 5.9 21.2l1.5-6.9-5.2-4.7 6.9-.7z" />
    </svg>
  )
}

export function IconCheck(props) {
  return (
    <svg {...base} {...props}>
      <polyline points="4 12.5 9.5 18 20 6" />
    </svg>
  )
}

export function IconCheckCircle(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <polyline points="7.5 12.5 10.5 15.5 16.5 9" />
    </svg>
  )
}

export function IconX(props) {
  return (
    <svg {...base} {...props}>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </svg>
  )
}

export function IconMenu(props) {
  return (
    <svg {...base} {...props}>
      <line x1="3" y1="6.5" x2="21" y2="6.5" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17.5" x2="21" y2="17.5" />
    </svg>
  )
}

export function IconSearch(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="20" y1="20" x2="15.3" y2="15.3" />
    </svg>
  )
}

export function IconMapPin(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  )
}

export function IconTrash(props) {
  return (
    <svg {...base} {...props}>
      <polyline points="3.5 6.5 5.5 6.5 20.5 6.5" />
      <path d="M9 6.5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5M18.5 6.5l-.8 13a1 1 0 0 1-1 1h-9.4a1 1 0 0 1-1-1l-.8-13" />
    </svg>
  )
}

export function IconZap(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    </svg>
  )
}

export function IconPaw(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <ellipse cx="12" cy="16.5" rx="5" ry="4.2" />
      <ellipse cx="4.5" cy="10" rx="2.1" ry="2.6" />
      <ellipse cx="9.5" cy="6.3" rx="2.1" ry="2.6" />
      <ellipse cx="14.5" cy="6.3" rx="2.1" ry="2.6" />
      <ellipse cx="19.5" cy="10" rx="2.1" ry="2.6" />
    </svg>
  )
}

export function IconCat(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 4 3 10v6a6 6 0 0 0 12 0v-6l-2-6-3.5 3h-1z" />
      <line x1="9" y1="13" x2="9" y2="13.01" />
      <line x1="15" y1="13" x2="15" y2="13.01" />
    </svg>
  )
}

export function IconToy(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 9a2.5 2.5 0 1 1 3.8-3.2l4.4 4.4A2.5 2.5 0 1 1 17.4 14l.6.6a2.5 2.5 0 1 1-3.2 3.8l-4.4-4.4A2.5 2.5 0 1 1 6.6 10z" />
    </svg>
  )
}

export function IconTag(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 12.5 12 21l-9-9V4h8z" />
      <circle cx="7.3" cy="7.3" r="1.3" />
    </svg>
  )
}

export function IconBall(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 7.5 15 10l-1.1 3.6H10L9 10z" />
      <path d="M12 2.5v5M4.3 7.3l3.6 2.6M4.5 17l4.7-1.5M19.5 17l-4.7-1.5M19.7 7.3l-3.6 2.6" />
    </svg>
  )
}

export function IconClock(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <polyline points="12 6.5 12 12 16 14.5" />
    </svg>
  )
}

export function IconScissors(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <line x1="8.5" y1="8" x2="20" y2="19" />
      <line x1="20" y1="5" x2="8.5" y2="16" />
    </svg>
  )
}

export function IconAlertTriangle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5 22 20H2z" />
      <line x1="12" y1="9.5" x2="12" y2="14" />
      <line x1="12" y1="17" x2="12" y2="17.01" />
    </svg>
  )
}

export function IconLightbulb(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 18h6M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6v.5h5.4v-.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z" />
    </svg>
  )
}
