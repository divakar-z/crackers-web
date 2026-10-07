import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'
import auth from './modules/auth'
import orders from './modules/orders'
import settings from './modules/settings'
import ui from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    cart,
    auth,
    orders,
    settings,
    ui
  }
})
