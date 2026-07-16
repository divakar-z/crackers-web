<template>
  <v-card 
    class="product-card" 
    :class="{ 'sold-out': product.isSoldOut }"
    hover
    outlined
  >
    <!-- Product Image -->
    <div class="product-image-wrapper">
      <v-img
        :src="product.imageUrl || defaultImage"
        :alt="product.name"
        aspect-ratio="1"
        class="product-image"
        :class="{ 'greyscale': product.isSoldOut }"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-row>
        </template>
      </v-img>

      <!-- Sold Out Overlay -->
      <v-overlay v-if="product.isSoldOut" absolute color="error" opacity="0.7">
        <v-chip color="error" label>
          <v-icon left small>mdi-close-circle</v-icon>
          {{ $t('purchase.sold_out') }}
        </v-chip>
      </v-overlay>

      <!-- Discount Badge -->
      <v-chip 
        v-if="discountInfo.percent > 0 && !product.isSoldOut" 
        class="discount-badge"
        color="accent"
        small
        label
      >
        {{ discountInfo.percent }}% OFF
      </v-chip>
    </div>

    <v-card-text class="pb-0">
      <!-- Product Name -->
      <h3 class="text-subtitle-1 font-weight-bold text-truncate mb-1" :title="product.name">
        {{ product.name }}
      </h3>

      <!-- Category -->
      <v-chip x-small outlined color="secondary" class="mb-2">
        {{ $t(`categories.${product.category}`) || product.category }}
      </v-chip>

      <!-- Price -->
      <div class="d-flex align-center justify-space-between">
        <div>
          <span class="text-h6 font-weight-bold primary--text">
            ₹{{ product.price.toLocaleString('en-IN') }}
          </span>
          <span 
            v-if="discountInfo.percent > 0" 
            class="text-body-2 text-decoration-line-through grey--text ml-2"
          >
            ₹{{ originalPrice.toLocaleString('en-IN') }}
          </span>
        </div>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn 
        block 
        :color="product.isSoldOut ? 'grey' : 'primary'"
        :disabled="product.isSoldOut"
        @click="addToCart"
        :loading="loading"
      >
        <v-icon left small>mdi-cart-plus</v-icon>
        {{ product.isSoldOut ? $t('purchase.sold_out') : $t('purchase.add_to_cart') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      defaultImage: 'https://via.placeholder.com/300x300?text=Cracker'
    }
  },
  computed: {
    ...mapGetters('cart', ['discountInfo']),
    originalPrice() {
      if (this.product.originalPrice) return this.product.originalPrice
      if (this.discountInfo.percent > 0) {
        return Math.round(this.product.price / (1 - this.discountInfo.percent / 100))
      }
      return this.product.price
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    async addToCart() {
      if (this.product.isSoldOut) return
      
      this.loading = true
      try {
        await this.$store.dispatch('cart/addToCart', this.product)
        this.$emit('added')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.product-card.sold-out {
  opacity: 0.7;
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
}

.product-image {
  transition: transform 0.3s ease;
}

.product-card:hover .product-image:not(.greyscale) {
  transform: scale(1.05);
}

.greyscale {
  filter: grayscale(100%);
}

.discount-badge {
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
