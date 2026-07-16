<template>
  <v-app>
    <AppHeader />
    
    <v-main class="main-content">
      <router-view />
    </v-main>

    <AppFooter />

    <!-- Cart Snackbar -->
    <v-snackbar v-model="showCartSnackbar" color="success" timeout="2000" bottom right>
      <v-icon left>mdi-check-circle</v-icon>
      Item added to cart!
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" to="/cart">View Cart</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      showCartSnackbar: false
    }
  },
  created() {
    this.initSettings()
    this.initAuthListener()
    this.fetchProducts()
  },
  methods: {
    ...mapActions('settings', ['initSettings']),
    ...mapActions('auth', ['initAuthListener']),
    ...mapActions('products', ['fetchProducts'])
  },
  mounted() {
    // Listen for cart add events
    this.$root.$on('cart-item-added', () => {
      this.showCartSnackbar = true
    })
  },
  beforeDestroy() {
    this.$root.$off('cart-item-added')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Outfit', sans-serif;
}

.v-application {
  background: #FFF8F0 !important;
}

/* Glassmorphism Effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.v-main {
  padding-top: 64px !important; /* Force correct padding if Vuetify miscalculates */
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #D4AF37, #C41E3A);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #B8860B;
}

/* Festive gradient text */
.festive-gradient {
  background: linear-gradient(135deg, #D4AF37, #C41E3A);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

/* Section transitions */
.page-enter-active, .page-leave-active {
  transition: opacity 0.3s ease;
}
.page-enter, .page-leave-to {
  opacity: 0;
}

/* Premium Card Style */
.premium-card {
  border-radius: 16px !important;
  border: 1px solid rgba(212, 175, 55, 0.2) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.premium-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(212, 175, 55, 0.2) !important;
}

/* Button Animations */
.v-btn {
  text-transform: none !important;
  letter-spacing: 0.5px !important;
  border-radius: 8px !important;
}

.v-btn--rounded {
  border-radius: 28px !important;
}
</style>
