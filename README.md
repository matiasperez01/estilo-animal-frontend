# Estilo Animal — Storefront

Tienda web para Estilo Animal. Construida con React + Vite.

## Requisitos

- Node.js 18+
- npm 9+

## Instalación y uso

```bash
# 1. Instalar dependencias
npm install

# 2. Correr en modo desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## Estructura del proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── CartPanel.jsx
│   └── Toast.jsx
├── pages/            # Páginas / rutas
│   ├── Home.jsx
│   ├── Catalog.jsx
│   ├── Checkout.jsx
│   └── About.jsx
├── store/            # Estado global y datos
│   ├── CartContext.jsx   ← carrito con useReducer + Context
│   └── products.js       ← catálogo mock (reemplazar por API)
├── hooks/
│   └── useToast.js
├── App.jsx           # Rutas principales
└── main.jsx          # Entry point
```

## Páginas

| Ruta         | Descripción                        |
|--------------|------------------------------------|
| `/`          | Inicio — hero + productos destacados |
| `/tienda`    | Catálogo completo con filtros       |
| `/checkout`  | Formulario de compra               |
| `/nosotros`  | Sobre Estilo Animal                |

## Próximos pasos

- [ ] Conectar `src/store/products.js` con la API de Tiendanube
- [ ] Integrar Mercado Pago en el checkout (`/checkout`)
- [ ] Conectar stock con el backend Spring Boot (`/api/productos`)
- [ ] Subir imágenes reales de productos
- [ ] Agregar página de detalle de producto (`/producto/:id`)
- [ ] Manejo de stock (mostrar "sin stock" en tallas agotadas)
```
