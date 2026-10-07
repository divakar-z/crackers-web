<template>
  <v-app>
    <AppHeader />
    
    <v-main class="main-content">
      <router-view />
    </v-main>

    <AppFooter />

    <CartDrawer />
    <CheckoutDialog />
    <PaymentDialog />
    <LoginDialog />

    <!-- Cart Snackbar -->
    <v-snackbar v-model="showCartSnackbar" color="success" timeout="2000" bottom right>
      <v-icon left>mdi-check-circle</v-icon>
      Item added to cart!
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="openCart">View Cart</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'
import CheckoutDialog from '@/components/cart/CheckoutDialog.vue'
import PaymentDialog from '@/components/cart/PaymentDialog.vue'
import LoginDialog from '@/components/layout/LoginDialog.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    CartDrawer,
    CheckoutDialog,
    PaymentDialog,
    LoginDialog
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
    ...mapActions('products', ['fetchProducts']),
    ...mapActions('ui', ['openCart'])
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
  background: #F1FAF4 !important;
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
  background: linear-gradient(to bottom, #2E9B50, #0F3D24);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #1F6B3A;
}

/* Festive gradient text */
.festive-gradient {
  background: linear-gradient(135deg, #1F8A4C, #0F3D24);
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
  border: 1px solid rgba(31, 107, 58, 0.2) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.premium-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(31, 107, 58, 0.2) !important;
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
