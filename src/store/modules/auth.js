import { auth, db } from '@/firebase/config'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const state = {
  user: null,
  isAdmin: false,
  loading: false,
  error: null
}

const getters = {
  isAuthenticated: state => !!state.user,
  isAdmin: state => state.isAdmin,
  currentUser: state => state.user,
  isLoading: state => state.loading,
  authError: state => state.error
}

const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
  SET_ADMIN(state, isAdmin) {
    state.isAdmin = isAdmin
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  },
  CLEAR_ERROR(state) {
    state.error = null
  }
}

const actions = {
  async login({ commit }, { email, password }) {
    commit('SET_LOADING', true)
    commit('CLEAR_ERROR')
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      
      // Check if user is admin
      const adminDoc = await getDoc(doc(db, 'admins', user.uid))
      if (adminDoc.exists() && adminDoc.data().isAdmin) {
        commit('SET_USER', {
          uid: user.uid,
          email: user.email
        })
        commit('SET_ADMIN', true)
        return true
      } else {
        await signOut(auth)
        commit('SET_ERROR', 'You are not authorized as an admin')
        return false
      }
    } catch (error) {
      commit('SET_ERROR', error.message)
      return false
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async logout({ commit }) {
    try {
      await signOut(auth)
      commit('SET_USER', null)
      commit('SET_ADMIN', false)
    } catch (error) {
      commit('SET_ERROR', error.message)
    }
  },

  initAuthListener({ commit }) {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid))
        if (adminDoc.exists() && adminDoc.data().isAdmin) {
          commit('SET_USER', {
            uid: user.uid,
            email: user.email
          })
          commit('SET_ADMIN', true)
        }
      } else {
        commit('SET_USER', null)
        commit('SET_ADMIN', false)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
