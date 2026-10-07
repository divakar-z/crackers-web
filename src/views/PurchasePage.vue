<template>
  <div class="purchase-page">
    <!-- Header -->
    <section class="purchase-header py-12">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6">
            <h1 class="text-h3 font-weight-black white--text mb-2">
              {{ $t('purchase.title') }}
            </h1>
            <p class="text-h6 white--text opacity-80 mb-0">
              {{ $t('purchase.subtitle') }}
            </p>
          </v-col>
          <v-col cols="12" md="6" class="text-md-right">
            <v-btn x-large color="white" light class="secondary--text font-weight-bold rounded-lg elevation-4" @click="$store.dispatch('ui/openCart')">
              <v-badge :content="cartItemCount" :value="cartItemCount > 0" color="accent" inline overlap>
                <v-icon left>mdi-cart</v-icon>
              </v-badge>
              {{ $t('purchase.view_cart') }} • ₹{{ subtotal.toLocaleString('en-IN') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Discount Banner -->
    <v-container class="mt-n8 relative z-10" v-if="nextTierInfo">
      <v-alert 
        color="white" 
        class="premium-card py-4"
        elevation="10"
      >
        <div class="d-flex align-center">
          <div class="gift-icon-wrapper mr-4">
            <v-icon color="primary" size="32">mdi-gift</v-icon>
          </div>
          <div>
            <div class="text-h6 font-weight-bold grey--text text--darken-3">
              Unlock {{ nextTierInfo.tier }}!
            </div>
            <div class="text-body-1 grey--text text--darken-1">
              Add just <span class="primary--text font-weight-bold">₹{{ nextTierInfo.amount.toLocaleString('en-IN') }}</span> more to your cart.
            </div>
          </div>
          <v-spacer></v-spacer>
          <v-progress-circular
            :value="60"
            color="primary"
            size="50"
            width="4"
            class="d-none d-sm-flex"
          >
            <v-icon color="primary" small>mdi-star</v-icon>
          </v-progress-circular>
        </div>
      </v-alert>
    </v-container>

    <!-- Main Content -->
    <section class="py-12 px-4 bg-light">
      <v-container fluid>
        <v-row>
          <!-- Products Grid -->
          <v-col cols="12">
            <!-- Category chips -->
            <div class="chip-row mb-6">
              <v-chip
                v-for="opt in categoryOptions"
                :key="String(opt.value)"
                :color="activeCategory === opt.value ? 'primary' : 'white'"
                :dark="activeCategory === opt.value"
                class="mr-2 mb-2 font-weight-medium"
                @click="activeCategory = opt.value"
              >{{ opt.text }}</v-chip>
            </div>

            <div class="d-flex align-center justify-space-between mb-8">
              <h2 class="text-h5 font-weight-bold grey--text text--darken-3">
                {{ activeCategoryName }}
                <span class="text-body-2 font-weight-medium grey--text ml-2">({{ filteredProducts.length }} items)</span>
              </h2>
              <div style="width: 200px;">
                <v-select
                  v-model="sortBy"
                  :items="sortOptions"
                  item-text="text"
                  item-value="value"
                  dense
                  hide-details
                  outlined
                  rounded
                  background-color="white"
                ></v-select>
              </div>
            </div>

            <!-- Loading State -->
            <v-row v-if="loading">
              <v-col cols="6" sm="4" lg="3" v-for="n in 8" :key="n">
                <v-skeleton-loader type="card, list-item-two-line"></v-skeleton-loader>
              </v-col>
            </v-row>

            <!-- Products -->
            <v-row v-else-if="filteredProducts.length > 0">
              <v-col 
                cols="12" 
                sm="6" 
                md="4" 
                v-for="product in filteredProducts" 
                :key="product.id"
                class="animate-in"
              >
                <ProductCard :product="product" @added="onProductAdded" />
              </v-col>
            </v-row>

            <!-- Empty State -->
            <v-row v-else>
              <v-col cols="12" class="text-center py-16">
                <div class="empty-state-canvas mb-6">
                  <v-icon size="100" color="grey lighten-2">mdi-package-variant-closed</v-icon>
                </div>
                <h3 class="text-h5 grey--text text--darken-2">No items found</h3>
                <p class="text-body-1 grey--text">We couldn't find any crackers in this category.</p>
                <v-btn color="primary" text @click="activeCategory = null">Show All Products</v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProductCard from '@/components/products/ProductCard.vue'

export default {
  name: 'PurchasePage',
  components: {
    ProductCard
  },
  data() {
    return {
      sortBy: 'default',
      activeCategory: null,
      activeCategoryIndex: 0
    }
  },
  computed: {
    ...mapGetters('products', ['allProducts', 'categories', 'isLoading', 'sortedProducts']),
    ...mapGetters('cart', ['cartItemCount', 'subtotal', 'nextTierInfo']),
    loading() {
      return this.isLoading
    },
    activeCategoryName() {
      if (!this.activeCategory) return this.$t('purchase.all_products')
      const cat = this.categories.find(c => c.slug === this.activeCategory)
      return cat ? this.$t(`categories.${cat.slug}`) : this.activeCategory
    },
    sortOptions() {
      return [
        { text: this.$t('purchase.sort_options.default'), value: 'default' },
        { text: this.$t('purchase.sort_options.price_low'), value: 'price-low' },
        { text: this.$t('purchase.sort_options.price_high'), value: 'price-high' },
        { text: this.$t('purchase.sort_options.popular'), value: 'popular' }
      ]
    },
    categoryOptions() {
      return [
        { text: this.$t('purchase.all_products'), value: null },
        ...this.categories.map(cat => ({
          text: this.$t(`categories.${cat.slug}`),
          value: cat.slug
        }))
      ]
    },
    filteredProducts() {
      let products = this.sortBy === 'default' 
        ? this.allProducts 
        : this.sortedProducts(this.sortBy)
      
      if (this.activeCategory) {
        products = products.filter(p => p.category === this.activeCategory)
      }
      
      return products
    }
  },
  methods: {
    onProductAdded() {
      this.$root.$emit('cart-item-added')
    }
  }
}
</script>

<style scoped>
.purchase-header {
  background: linear-gradient(135deg, #1F6B3A 0%, #0F3D24 100%);
  position: relative;
  overflow: hidden;
}

.purchase-header::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
  opacity: 0.1;
}

.relative { position: relative; }
.z-10 { z-index: 10; }

.sticky-filter {
  position: sticky;
  top: 90px;
}

.bg-light {
  background-color: #F1FAF4;
}
.chip-row { display: flex; flex-wrap: wrap; }

.gift-icon-wrapper {
  background: rgba(31, 138, 76, 0.1);
  padding: 12px;
  border-radius: 12px;
}

.animate-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.leading-relaxed { line-height: 1.6; }
.opacity-80 { opacity: 0.8; }
</style>

