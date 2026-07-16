import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import ta from './ta'

Vue.use(VueI18n)

export default new VueI18n({
  locale: localStorage.getItem('dhanalakshmi_language') || 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    ta
  }
})
