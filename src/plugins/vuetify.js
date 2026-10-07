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
        primary: '#1F8A4C',      // Brand green
        secondary: '#0F3D24',    // Forest green
        accent: '#F5B800',       // Gold highlight
        error: '#E5484D',
        warning: '#F5B800',
        info: '#2F80ED',
        success: '#1F8A4C',
        background: '#F1FAF4',   // Mint white
        surface: '#FFFFFF'
      },
      dark: {
        primary: '#34C26E',
        secondary: '#0F3D24',
        accent: '#F5B800',
        background: '#0F3D24',
        surface: '#14502E'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
