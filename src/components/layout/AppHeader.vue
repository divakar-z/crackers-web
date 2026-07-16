<template>
  <div class="header-wrapper">
    <v-app-bar 
      app 
      fixed
      flat
      class="glass-effect"
      height="70"
    >
      <!-- Mobile menu -->
      <v-app-bar-nav-icon 
        class="d-md-none"
        @click="drawer = true"
        color="primary"
      ></v-app-bar-nav-icon>

      <!-- Logo -->
      <v-toolbar-title class="font-weight-bold">
        <router-link to="/" class="festive-gradient text-decoration-none d-flex align-center">
          <v-icon left size="32" color="primary">mdi-firework</v-icon>
          <span class="d-none d-sm-inline">{{ $t('home.title') }}</span>
          <span class="d-sm-none">DC</span>
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
          class="font-weight-medium px-4 mx-1"
          active-class="primary--text fw-bold"
        >
          <v-icon left small>{{ item.icon }}</v-icon>
          {{ $t(item.text) }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- Language Toggle -->
      <v-menu offset-y transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on" color="primary" class="font-weight-bold">
            <v-icon left>mdi-translate</v-icon>
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

      <!-- Cart Icon -->
      <v-btn icon to="/cart" class="ml-2 premium-btn" color="primary">
        <v-badge :content="cartItemCount" :value="cartItemCount > 0" color="accent" overlap bordered>
          <v-icon>mdi-cart-outline</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary fixed class="glass-effect">
      <div class="pa-6 text-center">
        <v-icon size="48" color="primary" class="mb-2">mdi-firework</v-icon>
        <h2 class="festive-gradient text-h6">{{ $t('home.title') }}</h2>
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
.v-toolbar__title a:hover {
  opacity: 0.9;
}
</style>
