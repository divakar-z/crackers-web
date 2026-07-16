import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#D4AF37',      // Gold
        secondary: '#B8860B',    // Dark Golden Rod
        accent: '#FF6B35',       // Festive Orange
        error: '#DC3545',
        warning: '#FFC107',
        info: '#17A2B8',
        success: '#28A745',
        background: '#FFF8F0',   // Warm cream
        surface: '#FFFFFF',
        festiveRed: '#C41E3A',   // Festive Red
        festiveGold: '#FFD700',  // Bright Gold
      },
      dark: {
        primary: '#FFD700',
        secondary: '#D4AF37',
        accent: '#FF6B35',
        background: '#1A1A2E',
        surface: '#16213E',
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
