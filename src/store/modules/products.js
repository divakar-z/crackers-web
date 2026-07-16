import { db } from '@/firebase/config'
import { collection, getDocs, query, orderBy, where, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const state = {
  products: [],
  categories: [
    { slug: 'chakkra', name: 'Chakkra', nameTA: 'சக்கரா' },
    { slug: 'pots', name: 'Pots', nameTA: 'மத்தாப்பு' },
    { slug: 'twinkling-stars', name: 'Twinkling Stars', nameTA: 'மின்மினி நட்சத்திரங்கள்' },
    { slug: 'bombs-sounds', name: 'Bombs and Sounds', nameTA: 'வெடிகுண்டுகள்' },
    { slug: 'rockets', name: 'Rockets', nameTA: 'ராக்கெட்டுகள்' },
    { slug: 'fancy-night-shots', name: 'Fancy and Night Shots', nameTA: 'இரவு வெடிகள்' },
    { slug: 'toy-crackers', name: 'Toy Crackers', nameTA: 'பொம்மை வெடிகள்' },
    { slug: 'sparklers', name: 'Sparklers', nameTA: 'புஸ்வாணம்' },
    { slug: 'gift-box', name: 'Gift Box', nameTA: 'பரிசு பெட்டி' },
    { slug: 'special-family-pack', name: 'Special Family Pack', nameTA: 'சிறப்பு குடும்ப பேக்' }
  ],
  loading: false,
  error: null
}

const getters = {
  allProducts: state => state.products,
  getProductsByCategory: state => category => {
    return state.products.filter(p => p.category === category)
  },
  getProductById: state => id => {
    return state.products.find(p => p.id === id)
  },
  categories: state => state.categories,
  isLoading: state => state.loading,
  sortedProducts: state => (sortBy) => {
    const products = [...state.products]
    switch (sortBy) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price)
      case 'price-high':
        return products.sort((a, b) => b.price - a.price)
      case 'popular':
        return products.sort((a, b) => b.popularity - a.popularity)
      default:
        return products
    }
  }
}

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  ADD_PRODUCT(state, product) {
    state.products.push(product)
  },
  UPDATE_PRODUCT(state, updatedProduct) {
    const index = state.products.findIndex(p => p.id === updatedProduct.id)
    if (index !== -1) {
      state.products.splice(index, 1, updatedProduct)
    }
  },
  DELETE_PRODUCT(state, productId) {
    state.products = state.products.filter(p => p.id !== productId)
  }
}

const actions = {
  async fetchProducts({ commit }) {
    commit('SET_LOADING', true)
    try {
      const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      let products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      // Fallback to mock data if no products found (e.g., Firebase not set up)
      if (products.length === 0) {
        products = [
          { id: '1', name: 'Standard Chakkra', category: 'chakkra', price: 150, originalPrice: 300, image: 'https://images.unsplash.com/photo-1590418606746-018840fb9cd0?w=500', popularity: 10, createdAt: new Date() },
          { id: '2', name: 'Flower Pots Big', category: 'pots', price: 200, originalPrice: 500, image: 'https://images.unsplash.com/photo-1590418606746-018840fb9cd0?w=500', popularity: 20, createdAt: new Date() },
          { id: '3', name: 'Sky Shots 12', category: 'fancy-night-shots', price: 1200, originalPrice: 2500, image: 'https://images.unsplash.com/photo-1590418606746-018840fb9cd0?w=500', popularity: 30, createdAt: new Date() },
          { id: '4', name: 'Sparklers Red', category: 'sparklers', price: 50, originalPrice: 100, image: 'https://images.unsplash.com/photo-1590418606746-018840fb9cd0?w=500', popularity: 15, createdAt: new Date() },
          { id: '5', name: 'Bijili Crackers', category: 'bombs-sounds', price: 20, originalPrice: 40, image: 'https://images.unsplash.com/photo-1590418606746-018840fb9cd0?w=500', popularity: 40, createdAt: new Date() }
        ]
      }
      
      commit('SET_PRODUCTS', products)
    } catch (error) {
      console.error('Firebase error, using mock data:', error)
      const mockProducts = [
        { id: '1', name: 'Standard Chakkra', category: 'chakkra', price: 150, originalPrice: 300, image: 'https://images.unsplash.com/photo-1590418606746-018840fb9cd0?w=500', popularity: 10, createdAt: new Date() },
        { id: '2', name: 'Flower Pots Big', category: 'pots', price: 200, originalPrice: 500, image: 'https://images.unsplash.com/photo-1590418606746-018840fb9cd0?w=500', popularity: 20, createdAt: new Date() },
        { id: '3', name: 'Sky Shots 12', category: 'fancy-night-shots', price: 1200, originalPrice: 2500, image: 'https://images.unsplash.com/photo-1590418606746-018840fb9cd0?w=500', popularity: 30, createdAt: new Date() },
        { id: '4', name: 'Sparklers Red', category: 'sparklers', price: 50, originalPrice: 100, image: 'https://images.unsplash.com/photo-1590418606746-018840fb9cd0?w=500', popularity: 15, createdAt: new Date() },
        { id: '5', name: 'Bijili Crackers', category: 'bombs-sounds', price: 20, originalPrice: 40, image: 'https://images.unsplash.com/photo-1590418606746-018840fb9cd0?w=500', popularity: 40, createdAt: new Date() }
      ]
      commit('SET_PRODUCTS', mockProducts)
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async fetchProductsByCategory({ commit }, category) {
    commit('SET_LOADING', true)
    try {
      const q = query(
        collection(db, 'products'),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      )
      const snapshot = await getDocs(q)
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      commit('SET_PRODUCTS', products)
    } catch (error) {
      commit('SET_ERROR', error.message)
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async addProduct({ commit }, product) {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        createdAt: new Date()
      })
      commit('ADD_PRODUCT', { id: docRef.id, ...product })
      return docRef.id
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async updateProduct({ commit }, { id, data }) {
    try {
      await updateDoc(doc(db, 'products', id), data)
      commit('UPDATE_PRODUCT', { id, ...data })
    } catch (error) {
      commit('SET_ERROR', error.message)
      throw error
    }
  },

  async deleteProduct({ commit }, id) {
    try {
      await deleteDoc(doc(db, 'products', id))
      commit('DELETE_PRODUCT', id)
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
