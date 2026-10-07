const state = {
  cartOpen: false,
  checkoutOpen: false,
  paymentOpen: false,
  loginOpen: false,
  checkoutDetails: { name: '', phone: '', address: '' }
}

const mutations = {
  SET_CART_OPEN(state, v) { state.cartOpen = v },
  SET_CHECKOUT_OPEN(state, v) { state.checkoutOpen = v },
  SET_PAYMENT_OPEN(state, v) { state.paymentOpen = v },
  SET_LOGIN_OPEN(state, v) { state.loginOpen = v },
  SET_CHECKOUT_DETAILS(state, d) { state.checkoutDetails = { ...d } }
}

const actions = {
  openCart({ commit }) { commit('SET_CART_OPEN', true) },
  startCheckout({ commit }) {
    commit('SET_CART_OPEN', false)
    commit('SET_CHECKOUT_OPEN', true)
  },
  startPayment({ commit }, details) {
    commit('SET_CHECKOUT_DETAILS', details)
    commit('SET_CHECKOUT_OPEN', false)
    commit('SET_PAYMENT_OPEN', true)
  },
  closeAll({ commit }) {
    commit('SET_CART_OPEN', false)
    commit('SET_CHECKOUT_OPEN', false)
    commit('SET_PAYMENT_OPEN', false)
  }
}

export default { namespaced: true, state, mutations, actions }
