<template>
  <div class="cart-page">
    <!-- Header -->
    <section class="cart-header py-12">
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <h1 class="text-h3 font-weight-black white--text mb-2">
              <v-icon left color="white" size="48">mdi-cart-outline</v-icon>
              {{ $t('cart.title') }}
            </h1>
            <p class="text-h6 white--text opacity-80 mb-0">Review your items and checkout</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="py-12 px-4 bg-light">
      <v-container>
        <!-- Empty Cart -->
        <template v-if="cartItems.length === 0">
          <v-row justify="center">
            <v-col cols="12" md="6" class="text-center py-16">
              <div class="empty-cart-animation mb-8">
                <v-icon size="120" color="grey lighten-2">mdi-cart-off</v-icon>
              </div>
              <h2 class="text-h4 grey--text text--darken-2 mb-6">{{ $t('cart.empty') }}</h2>
              <v-btn x-large color="primary" rounded to="/purchase" class="px-10 elevation-4">
                <v-icon left>mdi-shopping</v-icon>
                {{ $t('cart.continue_shopping') }}
              </v-btn>
            </v-col>
          </v-row>
        </template>

        <!-- Cart with Items -->
        <template v-else>
          <v-row>
            <!-- Cart Items -->
            <v-col cols="12" lg="8">
              <!-- Discount & Gift Info -->
              <div class="mb-8">
                <v-alert 
                  v-if="nextTierInfo" 
                  color="white" 
                  class="premium-card mb-4 border-accent"
                >
                  <div class="d-flex align-center">
                    <v-icon color="accent" class="mr-3">mdi-gift-outline</v-icon>
                    <span class="text-body-1 font-weight-medium">
                      Add ₹{{ nextTierInfo.amount.toLocaleString('en-IN') }} more to unlock {{ nextTierInfo.tier }}!
                    </span>
                  </div>
                  <v-progress-linear 
                    :value="progressToNextTier" 
                    color="accent" 
                    height="6" 
                    rounded 
                    class="mt-4"
                  ></v-progress-linear>
                </v-alert>

                <v-alert 
                  v-if="discountInfo.percent > 0" 
                  color="success" 
                  dark 
                  class="rounded-lg elevation-4"
                >
                  <div class="d-flex align-center">
                    <v-icon left>mdi-check-decagram</v-icon>
                    <span class="text-body-1 font-weight-bold">
                      OFFER UNLOCKED: {{ discountInfo.percent }}% OFF + {{ discountInfo.gift }} FREE!
                    </span>
                  </div>
                </v-alert>
              </div>

              <!-- Cart Items List -->
              <div class="cart-items-list">
                <v-card 
                  class="pa-6 mb-4 premium-card item-card" 
                  v-for="item in cartItems" 
                  :key="item.id"
                >
                  <v-row align="center">
                    <v-col cols="4" sm="2">
                      <v-img 
                        :src="item.imageUrl || item.image || 'https://via.placeholder.com/100x100?text=Cracker'" 
                        :alt="item.name"
                        aspect-ratio="1"
                        class="rounded-lg elevation-2"
                      ></v-img>
                    </v-col>
                    <v-col cols="8" sm="4">
                      <h4 class="text-h6 font-weight-bold mb-1">{{ item.name }}</h4>
                      <p class="text-body-2 grey--text mb-0">
                        Price: <span class="primary--text font-weight-bold">₹{{ item.price.toLocaleString('en-IN') }}</span>
                      </p>
                    </v-col>
                    <v-col cols="7" sm="3">
                      <div class="quantity-controller d-inline-flex align-center rounded-pill bg-grey-light pa-1">
                        <v-btn icon small @click="decrementQuantity(item.id)" class="white rounded-circle">
                          <v-icon small>mdi-minus</v-icon>
                        </v-btn>
                        <span class="mx-4 text-h6 font-weight-bold">{{ item.quantity }}</span>
                        <v-btn icon small @click="incrementQuantity(item.id)" class="white rounded-circle">
                          <v-icon small>mdi-plus</v-icon>
                        </v-btn>
                      </div>
                    </v-col>
                    <v-col cols="3" sm="2" class="text-right">
                      <div class="text-h6 font-weight-black primary--text">
                        ₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}
                      </div>
                    </v-col>
                    <v-col cols="2" sm="1" class="text-right">
                      <v-btn icon color="error" @click="removeItem(item.id)" class="glass-effect">
                        <v-icon>mdi-trash-can-outline</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </div>

              <v-btn text color="primary" to="/purchase" class="mt-8 font-weight-bold">
                <v-icon left>mdi-arrow-left</v-icon>
                {{ $t('cart.continue_shopping') }}
              </v-btn>
            </v-col>

            <!-- Order Summary -->
            <v-col cols="12" lg="4">
              <v-card class="pa-8 premium-card sticky-summary elevation-10" color="white">
                <h3 class="text-h5 font-weight-bold mb-8">Order Summary</h3>

                <div class="summary-details">
                  <div class="d-flex justify-space-between mb-4">
                    <span class="text-body-1 grey--text text--darken-1">{{ $t('cart.subtotal') }}</span>
                    <span class="text-body-1 font-weight-bold">₹{{ subtotal.toLocaleString('en-IN') }}</span>
                  </div>

                  <div v-if="discountInfo.percent > 0" class="d-flex justify-space-between mb-4 success--text">
                    <span class="text-body-1">{{ $t('cart.discount') }} ({{ discountInfo.percent }}%)</span>
                    <span class="text-body-1 font-weight-bold">-₹{{ discountAmount.toLocaleString('en-IN') }}</span>
                  </div>

                  <div v-if="discountInfo.gift" class="d-flex justify-space-between mb-4">
                    <span class="text-body-1 grey--text text--darken-1">Free Gift</span>
                    <v-chip size="small" color="accent" label outlined class="font-weight-bold">
                      <v-icon left x-small>mdi- उपहार</v-icon>
                      {{ discountInfo.gift }}
                    </v-chip>
                  </div>

                  <div class="d-flex justify-space-between mb-4" v-if="discountInfo.freeShipping">
                    <span class="text-body-1 success--text">{{ $t('cart.free_shipping') }}</span>
                    <v-icon color="success" small>mdi-truck-check</v-icon>
                  </div>
                </div>

                <v-divider class="my-6"></v-divider>

                <div class="d-flex justify-space-between mb-8">
                  <span class="text-h5 font-weight-bold">Grand Total</span>
                  <div class="text-right">
                    <span class="text-h4 font-weight-black festive-gradient">₹{{ finalTotal.toLocaleString('en-IN') }}</span>
                    <p class="text-caption grey--text mb-0 mt-1">Ready for checkout</p>
                  </div>
                </div>

                <!-- Contact Input -->
                <div class="mb-6">
                  <label class="text-caption font-weight-bold grey--text text--darken-2 mb-2 d-block">WhatsApp Number</label>
                  <v-text-field
                    v-model="customerPhone"
                    placeholder="Enter 10 digit number"
                    outlined
                    rounded
                    prepend-inner-icon="mdi-whatsapp"
                    background-color="grey lighten-5"
                    hide-details
                    class="rounded-lg"
                  ></v-text-field>
                </div>

                <v-btn 
                  block 
                  x-large 
                  color="green darken-1" 
                  dark 
                  class="rounded-xl elevation-8 mb-6 checkout-btn"
                  @click="checkout"
                  :loading="checkoutLoading"
                >
                  <v-icon left>mdi-whatsapp</v-icon>
                  Place Order on WhatsApp
                </v-btn>

                <div class="d-flex align-center justify-center grey--text text--darken-1">
                  <v-icon x-small color="grey" class="mr-2">mdi-lock-outline</v-icon>
                  <span class="text-caption">Secure Order Transmission</span>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { redirectToWhatsApp } from '@/utils/whatsappRedirect'

export default {
  name: 'CartPage',
  data() {
    return {
      customerPhone: '',
      checkoutLoading: false
    }
  },
  computed: {
    ...mapGetters('cart', [
      'cartItems',
      'subtotal',
      'discountInfo',
      'discountAmount',
      'finalTotal',
      'nextTierInfo'
    ]),
    progressToNextTier() {
      if (!this.nextTierInfo) return 100
      const thresholds = [3000, 5000, 10000]
      const currentThreshold = thresholds.find(t => this.subtotal < t) || 10000
      const prevThreshold = thresholds[thresholds.indexOf(currentThreshold) - 1] || 0
      const range = currentThreshold - prevThreshold
      const progress = this.subtotal - prevThreshold
      return Math.min((progress / range) * 100, 100)
    }
  },
  methods: {
    ...mapActions('cart', ['updateQuantity', 'removeFromCart', 'setCustomerPhone']),
    ...mapActions('orders', ['createOrder']),
    
    incrementQuantity(productId) {
      const item = this.cartItems.find(i => i.id === productId)
      if (item) {
        this.updateQuantity({ productId, quantity: item.quantity + 1 })
      }
    },
    
    decrementQuantity(productId) {
      const item = this.cartItems.find(i => i.id === productId)
      if (item && item.quantity > 1) {
        this.updateQuantity({ productId, quantity: item.quantity - 1 })
      }
    },
    
    removeItem(productId) {
      this.removeFromCart(productId)
    },
    
    async checkout() {
      if (!this.customerPhone || this.customerPhone.length < 10) {
        alert('Please enter a valid 10-digit WhatsApp number');
        return;
      }
      
      this.checkoutLoading = true
      try {
        // Set customer phone
        this.setCustomerPhone(this.customerPhone)
        
        // Create order object locally for redirection (avoiding Firestore error for now)
        const order = {
          items: this.cartItems,
          total: this.finalTotal,
          subtotal: this.subtotal,
          discount: this.discountAmount,
          customerPhone: this.customerPhone,
          discountInfo: this.discountInfo
        }
        
        // Create order in Firestore (this might fail but we catch it)
        try {
          await this.createOrder();
        } catch (e) {
          console.warn('Firestore order creation failed, proceeding to WhatsApp anyway.');
        }
        
        // Redirect to WhatsApp
        redirectToWhatsApp(order)
        
        // Clear cart
        this.$store.dispatch('cart/clearCart')
        
        // Show success message
        this.$root.$emit('order-placed')
      } catch (error) {
        console.error('Checkout error:', error)
      } finally {
        this.checkoutLoading = false
      }
    }
  }
}
</script>

<style scoped>
.cart-header {
  background: linear-gradient(135deg, #1A1A2E 0%, #C41E3A 100%);
  position: relative;
  overflow: hidden;
}

.cart-header::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
  opacity: 0.1;
}

.bg-light {
  background-color: #f8f9fa;
}

.sticky-summary {
  position: sticky;
  top: 90px;
}

.item-card {
  transition: all 0.3s ease;
}

.item-card:hover {
  border-color: rgba(212, 175, 55, 0.4) !important;
}

.quantity-controller {
  background: #f1f1f1;
}

.bg-grey-light {
  background: #f1f1f1;
}

.border-accent {
  border-left: 4px solid var(--v-accent-base) !important;
}

.checkout-btn {
  text-transform: none;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.empty-cart-animation {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
</style>
