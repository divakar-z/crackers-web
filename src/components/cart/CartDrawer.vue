<template>
  <v-navigation-drawer
    :value="open"
    @input="v => $store.commit('ui/SET_CART_OPEN', v)"
    app right temporary fixed width="400"
    class="cart-drawer"
  >
    <div class="drawer-head d-flex align-center pa-4">
      <v-icon color="primary" class="mr-2">mdi-cart-outline</v-icon>
      <span class="text-h6 font-weight-bold secondary--text">Your Cart</span>
      <v-chip x-small color="primary" dark class="ml-2">{{ cartItemCount }}</v-chip>
      <v-spacer></v-spacer>
      <v-btn icon small @click="close"><v-icon>mdi-close</v-icon></v-btn>
    </div>
    <v-divider></v-divider>

    <div v-if="cartItems.length === 0" class="text-center pa-10">
      <v-icon size="72" color="grey lighten-2">mdi-cart-off</v-icon>
      <p class="grey--text mt-4">{{ $t('cart.empty') }}</p>
      <v-btn color="primary" depressed to="/purchase" @click="close">{{ $t('cart.continue_shopping') }}</v-btn>
    </div>

    <template v-else>
      <div class="drawer-body pa-4">
        <div v-if="nextTierInfo" class="tier-hint mb-4 pa-3">
          <div class="text-caption font-weight-medium mb-2">
            <v-icon x-small color="primary">mdi-gift-outline</v-icon>
            Add ₹{{ nextTierInfo.amount.toLocaleString('en-IN') }} more to unlock {{ nextTierInfo.tier }}
          </div>
          <v-progress-linear :value="progress" color="primary" height="6" rounded></v-progress-linear>
        </div>
        <div v-else class="tier-hint mb-4 pa-3 text-caption font-weight-bold">
          <v-icon x-small color="primary">mdi-check-decagram</v-icon>
          Best offer unlocked: {{ discountInfo.percent }}% OFF + {{ discountInfo.gift }} FREE
        </div>

        <div v-for="item in cartItems" :key="item.id" class="cart-row d-flex align-center mb-3">
          <v-img
            :src="item.imageUrl || 'https://via.placeholder.com/100x100?text=Cracker'"
            width="56" height="56" max-width="56" class="rounded-lg mr-3 flex-grow-0"
          ></v-img>
          <div class="flex-grow-1" style="min-width: 0">
            <div class="text-body-2 font-weight-bold text-truncate">{{ item.name }}</div>
            <div class="text-caption grey--text">₹{{ item.price.toLocaleString('en-IN') }}</div>
            <div class="d-inline-flex align-center mt-1">
              <v-btn icon x-small @click="change(item, -1)"><v-icon x-small>mdi-minus</v-icon></v-btn>
              <span class="mx-2 text-body-2 font-weight-bold">{{ item.quantity }}</span>
              <v-btn icon x-small @click="change(item, 1)"><v-icon x-small>mdi-plus</v-icon></v-btn>
            </div>
          </div>
          <div class="text-right ml-2">
            <div class="text-body-2 font-weight-black secondary--text">
              ₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}
            </div>
            <v-btn icon x-small color="error" @click="removeFromCart(item.id)">
              <v-icon small>mdi-trash-can-outline</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <div class="drawer-foot pa-4">
        <div class="d-flex justify-space-between text-body-2 mb-1">
          <span class="grey--text text--darken-1">{{ $t('cart.subtotal') }}</span>
          <span>₹{{ subtotal.toLocaleString('en-IN') }}</span>
        </div>
        <div v-if="discountInfo.percent > 0" class="d-flex justify-space-between text-body-2 mb-1 primary--text">
          <span>{{ $t('cart.discount') }} ({{ discountInfo.percent }}%)</span>
          <span>-₹{{ discountAmount.toLocaleString('en-IN') }}</span>
        </div>
        <div class="d-flex justify-space-between mt-2 mb-4">
          <span class="text-subtitle-1 font-weight-bold">Total</span>
          <span class="text-h6 font-weight-black secondary--text">₹{{ finalTotal.toLocaleString('en-IN') }}</span>
        </div>
        <v-btn block large color="primary" depressed @click="startCheckout">Checkout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'CartDrawer',
  computed: {
    ...mapState('ui', { open: 'cartOpen' }),
    ...mapGetters('cart', ['cartItems', 'cartItemCount', 'subtotal', 'discountInfo', 'discountAmount', 'finalTotal', 'nextTierInfo']),
    progress() {
      const t = [0, 3000, 5000, 10000]
      const hi = t.find(x => x > this.subtotal) || 10000
      const lo = t[t.indexOf(hi) - 1] || 0
      return Math.min(((this.subtotal - lo) / (hi - lo)) * 100, 100)
    }
  },
  methods: {
    ...mapActions('cart', ['updateQuantity', 'removeFromCart']),
    ...mapActions('ui', ['startCheckout']),
    close() { this.$store.commit('ui/SET_CART_OPEN', false) },
    change(item, d) {
      if (item.quantity + d < 1) return
      this.updateQuantity({ productId: item.id, quantity: item.quantity + d })
    }
  }
}
</script>

<style scoped>
.cart-drawer { z-index: 300 !important; }
.drawer-body { max-height: calc(100vh - 260px); overflow-y: auto; }
.drawer-foot { position: absolute; bottom: 0; left: 0; right: 0; background: #fff; border-top: 1px solid rgba(15, 61, 36, 0.1); }
.tier-hint { background: #F1FAF4; border-radius: 12px; }
.cart-row { border-bottom: 1px solid rgba(15, 61, 36, 0.06); padding-bottom: 12px; }
</style>
