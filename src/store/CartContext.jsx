import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

const initialState = {
  items: [],      // { product, size, qty }
  isOpen: false,
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload
      const existing = state.items.find(
        i => i.product.id === product.id && i.size === size
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === product.id && i.size === size
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { product, size, qty: 1 }] }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.product.id === action.payload.productId && i.size === action.payload.size)
        ),
      }

    case 'CHANGE_QTY': {
      const { productId, size, delta } = action.payload
      const updated = state.items
        .map(i =>
          i.product.id === productId && i.size === size
            ? { ...i, qty: i.qty + delta }
            : i
        )
        .filter(i => i.qty > 0)
      return { ...state, items: updated }
    }

    case 'CLEAR_CART':
      return { ...state, items: [] }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'OPEN_CART':
      return { ...state, isOpen: true }

    case 'CLOSE_CART':
      return { ...state, isOpen: false }

    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal   = state.items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
