<template>
  <v-dialog :value="open" @input="v => $store.commit('ui/SET_PAYMENT_OPEN', v)" max-width="380">
    <v-card class="dialog-card text-center pa-6">
      <div class="d-flex align-center mb-4">
        <span class="dialog-icon mr-2"><v-icon color="white" small>mdi-qrcode-scan</v-icon></span>
        <span class="text-subtitle-1 font-weight-bold secondary--text">Scan &amp; Pay</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="close"><v-icon>mdi-close</v-icon></v-btn>
      </div>

      <div class="amount mb-4">₹{{ finalTotal.toLocaleString('en-IN') }}</div>

      <div class="qr-box mx-auto mb-3">
        <img v-if="qr" :src="qr" alt="UPI QR code" width="200" height="200" />
        <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
      </div>
      <div class="text-caption grey--text mb-5">Pay using any UPI app, then confirm below</div>

      <v-btn block large color="primary" depressed :loading="loading" @click="confirm">
        <v-icon left>mdi-whatsapp</v-icon> I have paid, send order
      </v-btn>
      <v-btn block text class="mt-2" @click="back">Back</v-btn>
    </v-card>
  </v-dialog>
</template>

<script>
import QRCode from 'qrcode'
import { mapGetters, mapState } from 'vuex'
import { buildUpiLink } from '@/utils/payment'
import { redirectToWhatsApp } from '@/utils/whatsappRedirect'

export default {
  name: 'PaymentDialog',
  data() {
    return { qr: '', loading: false }
  },
  computed: {
    ...mapState('ui', { open: 'paymentOpen', details: 'checkoutDetails' }),
    ...mapGetters('cart', ['cartItems', 'subtotal', 'discountInfo', 'finalTotal'])
  },
  watch: {
    async open(v) {
      if (!v) return
      this.qr = ''
      this.qr = await QRCode.toDataURL(buildUpiLink(this.finalTotal), { width: 400, margin: 1 })
    }
  },
  methods: {
    close() { this.$store.commit('ui/SET_PAYMENT_OPEN', false) },
    back() {
      this.$store.commit('ui/SET_PAYMENT_OPEN', false)
      this.$store.commit('ui/SET_CHECKOUT_OPEN', true)
    },
    async confirm() {
      this.loading = true
      try {
        const order = {
          items: this.cartItems,
          subtotal: this.subtotal,
          discount: this.discountInfo.percent,
          freeGift: this.discountInfo.gift,
          freeShipping: this.discountInfo.freeShipping,
          finalAmount: this.finalTotal,
          customerPhone: this.details.phone
        }
        try {
          await this.$store.dispatch('orders/createOrder')
        } catch (e) {
          console.warn('Order could not be saved, continuing to WhatsApp.')
        }
        redirectToWhatsApp(order)
        this.$store.dispatch('cart/clearCart')
        this.$store.dispatch('ui/closeAll')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.dialog-card { border-radius: 20px !important; }
.dialog-icon { width: 28px; height: 28px; border-radius: 8px; background: #1F8A4C; display: inline-flex; align-items: center; justify-content: center; }
.amount { font-size: 2rem; font-weight: 800; color: #0F3D24; }
.qr-box { width: 220px; height: 220px; padding: 10px; border: 2px solid #E3F3E9; border-radius: 16px; display: flex; align-items: center; justify-content: center; }
</style>
