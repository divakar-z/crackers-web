<template>
  <div class="header-wrapper">
    <v-app-bar 
      app 
      fixed
      flat
      class="site-bar"
      height="64"
    >
      <!-- Mobile menu -->
      

      <!-- Logo -->
      <v-toolbar-title class="font-weight-bold">
        <router-link to="/" class="brand-link text-decoration-none d-flex align-center">
          <span class="brand-mark mr-2"><v-icon size="20" color="white">mdi-firework</v-icon></span>
          <span class="d-none d-sm-inline">{{ $t('home.title') }}</span>
          <span class="d-sm-none">Dhanalakshmi</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Desktop Navigation -->
      <div class="d-none d-md-flex align-center">
        <v-btn 
          text 
          v-for="item in navItems" 
          :key="item.to" 
          :to="item.to" 
          exact
          class="nav-link font-weight-medium px-3 mx-1"
          active-class="nav-link--active"
        >
          {{ $t(item.text) }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- Language Toggle -->
      <v-menu offset-y transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" color="primary" class="font-weight-bold">
            <v-icon left small>mdi-translate</v-icon>
            {{ currentLanguage === 'en' ? 'EN' : 'தமிழ்' }}
          </v-btn>
        </template>
        <v-list dense class="rounded-lg shadow-lg">
          <v-list-item @click="setLanguage('en')" :class="{ 'primary--text fw-bold': currentLanguage === 'en' }">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item @click="setLanguage('ta')" :class="{ 'primary--text fw-bold': currentLanguage === 'ta' }">
            <v-list-item-title>தமிழ்</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon class="ml-1" color="secondary" title="Admin login" @click="$store.commit('ui/SET_LOGIN_OPEN', true)">
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>

      <!-- Cart Icon -->
      <v-btn icon class="ml-2" color="secondary" @click="$store.dispatch('ui/openCart')">
        <v-badge :content="cartItemCount" :value="cartItemCount > 0" color="accent" overlap bordered>
          <v-icon>mdi-cart-outline</v-icon>
        </v-badge>
      </v-btn>
      <v-btn text class="d-md-none menu-btn font-weight-bold" color="secondary" @click="drawer = true">Menu</v-btn>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary fixed class="glass-effect">
      <div class="pa-6 text-center">
        <v-icon size="48" color="primary" class="mb-2">mdi-firework</v-icon>
        <h2 class="brand-text text-h6">{{ $t('home.title') }}</h2>
      </div>

      <v-divider></v-divider>

      <v-list nav class="px-3">
        <v-list-item 
          v-for="item in navItems" 
          :key="item.to" 
          :to="item.to"
          @click="drawer = false"
          active-class="primary white--text rounded-lg"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-medium">{{ $t(item.text) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-4"></v-divider>

        <h3 class="px-4 text-overline grey--text mb-2">{{ $t('purchase.categories') }}</h3>
        
        <v-list-item 
          v-for="cat in categories" 
          :key="cat.slug" 
          :to="`/category/${cat.slug}`"
          @click="drawer = false"
          active-class="secondary white--text rounded-lg"
          dense
        >
          <v-list-item-content>
            <v-list-item-title>{{ $t(`categories.${cat.slug}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  data() {
    return {
      drawer: false,
      navItems: [
        { text: 'nav.home', to: '/', icon: 'mdi-home' },
        { text: 'nav.about', to: '/about', icon: 'mdi-information' },
        { text: 'nav.purchase', to: '/purchase', icon: 'mdi-shopping' },
        { text: 'nav.safety', to: '/safety', icon: 'mdi-shield-check' },
        { text: 'nav.contact', to: '/contact', icon: 'mdi-phone' }
      ]
    }
  },
  computed: {
    ...mapGetters('cart', ['cartItemCount']),
    ...mapGetters('settings', ['currentLanguage']),
    ...mapGetters('products', ['categories'])
  },
  methods: {
    ...mapActions('settings', ['setLanguage']),
    setLanguage(lang) {
      this.$store.dispatch('settings/setLanguage', lang)
      this.$i18n.locale = lang
    }
  }
}
</script>

<style scoped>
.site-bar {
  background: rgba(255, 255, 255, 0.96) !important;
  border-bottom: 1px solid rgba(15, 61, 36, 0.08) !important;
}
.brand-link { color: #0F3D24 !important; }
.brand-mark {
  width: 32px; height: 32px; border-radius: 8px;
  background: linear-gradient(135deg, #2E9B50, #0F3D24);
  display: inline-flex; align-items: center; justify-content: center;
}
.brand-text { color: #0F3D24; }
.nav-link { color: #3b4a41 !important; }
.nav-link--active { color: #1F8A4C !important; background: rgba(31, 138, 76, 0.1); }
.menu-btn { text-transform: none; }
</style>
