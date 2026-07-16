const state = {
  language: 'en',
  diwaliDate: '2026-10-20' // Default Diwali date, can be updated from admin
}

const getters = {
  currentLanguage: state => state.language,
  diwaliDate: state => state.diwaliDate,
  isTamil: state => state.language === 'ta'
}

const mutations = {
  SET_LANGUAGE(state, lang) {
    state.language = lang
    localStorage.setItem('dhanalakshmi_language', lang)
  },
  SET_DIWALI_DATE(state, date) {
    state.diwaliDate = date
    localStorage.setItem('dhanalakshmi_diwali', date)
  }
}

const actions = {
  initSettings({ commit }) {
    const savedLang = localStorage.getItem('dhanalakshmi_language')
    if (savedLang) {
      commit('SET_LANGUAGE', savedLang)
    }
    const savedDiwali = localStorage.getItem('dhanalakshmi_diwali')
    if (savedDiwali) {
      commit('SET_DIWALI_DATE', savedDiwali)
    }
  },
  
  setLanguage({ commit }, lang) {
    commit('SET_LANGUAGE', lang)
  },
  
  setDiwaliDate({ commit }, date) {
    commit('SET_DIWALI_DATE', date)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
