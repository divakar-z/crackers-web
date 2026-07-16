import { db } from '@/firebase/config'
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore'

const state = {
  orders: [],
  loading: false,
  error: null
}

const getters = {
  allOrders: state => state.orders,
  isLoading: state => state.loading
}

const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  ADD_ORDER(state, order) {
    state.orders.unshift(order)
  }
}

const actions = {
  async fetchOrders({ commit }) {
    commit('SET_LOADING', true)
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      commit('SET_ORDERS', orders)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async createOrder({ commit, rootGetters }) {
    try {
      const cartItems = rootGetters['cart/cartItems']
      const subtotal = rootGetters['cart/subtotal']
      const discountInfo = rootGetters['cart/discountInfo']
      const finalTotal = rootGetters['cart/finalTotal']
      const customerPhone = rootGetters['cart/customerPhone'] || ''

      const order = {
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal,
        discount: discountInfo.percent,
        freeGift: discountInfo.gift,
        freeShipping: discountInfo.freeShipping,
        finalAmount: finalTotal,
        customerPhone,
        createdAt: new Date()
      }

      const docRef = await addDoc(collection(db, 'orders'), order)
      commit('ADD_ORDER', { id: docRef.id, ...order })
      
      return { id: docRef.id, ...order }
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
