<template>
  <v-dialog :value="open" @input="v => $store.commit('ui/SET_CHECKOUT_OPEN', v)" max-width="460" scrollable>
    <v-card class="dialog-card">
      <v-card-title class="d-flex align-center">
        <span class="dialog-icon mr-3"><v-icon color="white" small>mdi-cart-outline</v-icon></span>
        <span class="text-h6 font-weight-bold secondary--text">Checkout</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="close"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text class="pt-4">
        <v-form ref="form" @submit.prevent="pay">
          <v-text-field v-model="name" label="Full name" :rules="[v => !!v.trim() || 'Name is required']" outlined dense></v-text-field>
          <v-text-field v-model="phone" label="WhatsApp number" prefix="+91" maxlength="10"
            :rules="[v => /^\d{10}$/.test(v) || 'Enter a valid 10-digit number']" outlined dense></v-text-field>
          <v-textarea v-model="address" label="Delivery address" rows="2" auto-grow
            :rules="[v => !!v.trim() || 'Address is required']" outlined dense></v-textarea>
        </v-form>

        <div class="summary pa-4">
          <div class="text-overline grey--text">Order summary</div>
          <div v-for="item in cartItems" :key="item.id" class="d-flex justify-space-between text-body-2 mb-1">
            <span class="text-truncate mr-2">{{ item.name }} × {{ item.quantity }}</span>
            <span>₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}</span>
          </div>
          <v-divider class="my-3"></v-divider>
          <div class="d-flex justify-space-between text-body-2 mb-1">
            <span>{{ $t('cart.subtotal') }}</span><span>₹{{ subtotal.toLocaleString('en-IN') }}</span>
          </div>
          <div v-if="discountInfo.percent > 0" class="d-flex justify-space-between text-body-2 mb-1 primary--text">
            <span>{{ $t('cart.discount') }} ({{ discountInfo.percent }}%)</span>
            <span>-₹{{ discountAmount.toLocaleString('en-IN') }}</span>
          </div>
          <div v-if="discountInfo.gift" class="d-flex justify-space-between text-body-2 mb-1">
            <span>Free gift</span><strong>{{ discountInfo.gift }}</strong>
          </div>
          <div class="d-flex justify-space-between mt-2">
            <span class="font-weight-bold">Total</span>
            <span class="text-h6 font-weight-black secondary--text">₹{{ finalTotal.toLocaleString('en-IN') }}</span>
          </div>
        </div>
      </v-card-text>

      <v-card-actions class="pa-4 pt-0">
        <v-btn block large color="primary" depressed @click="pay">Proceed to Pay</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'CheckoutDialog',
  data() {
    return { name: '', phone: '', address: '' }
  },
  computed: {
    ...mapState('ui', { open: 'checkoutOpen' }),
    ...mapGetters('cart', ['cartItems', 'subtotal', 'discountInfo', 'discountAmount', 'finalTotal'])
  },
  methods: {
    close() { this.$store.commit('ui/SET_CHECKOUT_OPEN', false) },
    pay() {
      if (!this.$refs.form.validate()) return
      this.$store.dispatch('cart/setCustomerPhone', this.phone)
      this.$store.dispatch('ui/startPayment', { name: this.name, phone: this.phone, address: this.address })
    }
  }
}
</script>

<style scoped>
.dialog-card { border-radius: 20px !important; }
.dialog-icon { width: 32px; height: 32px; border-radius: 8px; background: #1F8A4C; display: inline-flex; align-items: center; justify-content: center; }
.summary { background: #F1FAF4; border-radius: 14px; }
</style>
