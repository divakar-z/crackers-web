const state = {
  items: [],
  customerPhone: ''
}

const getters = {
  cartItems: state => state.items,
  
  cartItemCount: state => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  },
  
  subtotal: state => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  
  discountInfo: (state, getters, rootState) => {
    const subtotal = getters.subtotal
    const diwaliDate = rootState.settings.diwaliDate
    const today = new Date()
    const diwali = new Date(diwaliDate)
    const daysDiff = Math.ceil((diwali - today) / (1000 * 60 * 60 * 24))
    const isBeforeDiwali = daysDiff >= 10
    
    if (subtotal >= 10000) {
      return {
        percent: 80,
        gift: '1000 Wala',
        freeShipping: isBeforeDiwali,
        tier: 3
      }
    }
    if (subtotal >= 5000) {
      return {
        percent: 70,
        gift: '500 Wala',
        freeShipping: false,
        tier: 2
      }
    }
    if (subtotal >= 3000) {
      return {
        percent: 50,
        gift: '100 Wala',
        freeShipping: false,
        tier: 1
      }
    }
    return {
      percent: 0,
      gift: null,
      freeShipping: false,
      tier: 0
    }
  },
  
  discountAmount: (state, getters) => {
    return (getters.subtotal * getters.discountInfo.percent) / 100
  },
  
  finalTotal: (state, getters) => {
    return getters.subtotal - getters.discountAmount
  },
  
  nextTierInfo: (state, getters) => {
    const subtotal = getters.subtotal
    if (subtotal < 3000) {
      return { amount: 3000 - subtotal, tier: '50% + 100 Wala' }
    }
    if (subtotal < 5000) {
      return { amount: 5000 - subtotal, tier: '70% + 500 Wala' }
    }
    if (subtotal < 10000) {
      return { amount: 10000 - subtotal, tier: '80% + 1000 Wala + Free Shipping' }
    }
    return null
  }
}

const mutations = {
  ADD_TO_CART(state, product) {
    const existing = state.items.find(item => item.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      state.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1
      })
    }
  },
  
  REMOVE_FROM_CART(state, productId) {
    state.items = state.items.filter(item => item.id !== productId)
  },
  
  UPDATE_QUANTITY(state, { productId, quantity }) {
    const item = state.items.find(item => item.id === productId)
    if (item) {
      item.quantity = Math.max(1, quantity)
    }
  },
  
  CLEAR_CART(state) {
    state.items = []
    state.customerPhone = ''
  },
  
  SET_CUSTOMER_PHONE(state, phone) {
    state.customerPhone = phone
  }
}

const actions = {
  addToCart({ commit }, product) {
    commit('ADD_TO_CART', product)
  },
  
  removeFromCart({ commit }, productId) {
    commit('REMOVE_FROM_CART', productId)
  },
  
  updateQuantity({ commit }, payload) {
    commit('UPDATE_QUANTITY', payload)
  },
  
  clearCart({ commit }) {
    commit('CLEAR_CART')
  },
  
  setCustomerPhone({ commit }, phone) {
    commit('SET_CUSTOMER_PHONE', phone)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
