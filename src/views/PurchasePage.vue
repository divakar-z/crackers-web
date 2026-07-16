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
            <v-btn x-large color="white" light class="primary--text font-weight-bold rounded-lg elevation-4" to="/cart">
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
            <v-icon color="accent" size="32">mdi-gift</v-icon>
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
            color="accent"
            size="50"
            width="4"
            class="d-none d-sm-flex"
          >
            <v-icon color="accent" small>mdi-star</v-icon>
          </v-progress-circular>
        </div>
      </v-alert>
    </v-container>

    <!-- Main Content -->
    <section class="py-12 px-4 bg-light">
      <v-container fluid>
        <v-row>
          <!-- Sidebar Filters -->
          <v-col cols="12" md="3" class="d-none d-md-block">
            <div class="sticky-filter">
              <h4 class="text-overline grey--text mb-4">{{ $t('purchase.categories') }}</h4>
              <v-list flat color="transparent" class="pa-0">
                <v-list-item-group v-model="activeCategoryIndex" color="primary">
                  <v-list-item 
                    class="rounded-lg mb-2"
                    @click="activeCategory = null"
                  >
                    <v-list-item-icon><v-icon>mdi-view-grid-outline</v-icon></v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium">{{ $t('purchase.all_products') }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-list-item 
                    v-for="cat in categories" 
                    :key="cat.slug"
                    class="rounded-lg mb-2"
                    @click="activeCategory = cat.slug"
                  >
                    <v-list-item-icon><v-icon>mdi-firework</v-icon></v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium">{{ $t(`categories.${cat.slug}`) }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>

              <v-divider class="my-6"></v-divider>

              <h4 class="text-overline grey--text mb-4">{{ $t('purchase.sort') }}</h4>
              <v-select
                v-model="sortBy"
                :items="sortOptions"
                item-text="text"
                item-value="value"
                outlined
                rounded
                dense
                background-color="white"
              ></v-select>
            </div>
          </v-col>

          <!-- Products Grid -->
          <v-col cols="12" md="9">
            <!-- Mobile Filters & Title -->
            <div class="d-md-none mb-6">
              <v-select
                v-model="activeCategory"
                :items="categoryOptions"
                item-text="text"
                item-value="value"
                outlined
                rounded
                dense
                label="Select Category"
                background-color="white"
              ></v-select>
            </div>

            <div class="d-flex align-center justify-space-between mb-8">
              <h2 class="text-h5 font-weight-bold grey--text text--darken-3">
                {{ activeCategoryName }}
                <span class="text-body-2 font-weight-medium grey--text ml-2">({{ filteredProducts.length }} items)</span>
              </h2>
              <div class="d-none d-md-block" style="width: 200px;">
                <v-text-field
                  placeholder="Search crackers..."
                  prepend-inner-icon="mdi-magnify"
                  dense
                  hide-details
                  outlined
                  rounded
                  background-color="white"
                ></v-text-field>
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
                cols="6" 
                sm="4" 
                lg="3" 
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
  background: linear-gradient(135deg, #C41E3A 0%, #1A1A2E 100%);
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
  background-color: #f8f9fa;
}

.gift-icon-wrapper {
  background: rgba(255, 107, 53, 0.1);
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

