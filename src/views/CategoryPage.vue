<template>
  <div class="category-page">
    <!-- Header -->
    <section class="category-header py-8">
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <v-btn text dark to="/purchase" class="mb-4">
              <v-icon left>mdi-arrow-left</v-icon>
              Back to All Products
            </v-btn>
            <h1 class="text-h4 font-weight-bold white--text">
              {{ categoryName }}
            </h1>
            <p class="text-subtitle-1 white--text" style="opacity: 0.9;">
              {{ products.length }} products found
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Products Grid -->
    <section class="py-8 px-4">
      <v-container>
        <!-- Sort -->
        <v-row class="mb-6">
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="sortBy"
              :items="sortOptions"
              item-text="text"
              item-value="value"
              outlined
              dense
              :label="$t('purchase.sort')"
            ></v-select>
          </v-col>
        </v-row>

        <!-- Loading State -->
        <v-row v-if="loading">
          <v-col cols="6" md="4" lg="3" v-for="n in 8" :key="n">
            <v-skeleton-loader type="card"></v-skeleton-loader>
          </v-col>
        </v-row>

        <!-- Products -->
        <v-row v-else-if="sortedProductList.length > 0">
          <v-col 
            cols="6" 
            md="4" 
            lg="3" 
            v-for="product in sortedProductList" 
            :key="product.id"
          >
            <ProductCard :product="product" @added="onProductAdded" />
          </v-col>
        </v-row>

        <!-- Empty State -->
        <v-row v-else>
          <v-col cols="12" class="text-center py-12">
            <v-icon size="80" color="grey lighten-1">mdi-package-variant</v-icon>
            <h3 class="text-h6 grey--text mt-4">No products in this category</h3>
            <p class="text-body-2 grey--text mb-4">Check back later or browse other categories</p>
            <v-btn color="primary" to="/purchase">
              <v-icon left>mdi-shopping</v-icon>
              Browse All Products
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Other Categories -->
    <section class="py-8 px-4 grey lighten-4">
      <v-container>
        <h3 class="text-h5 font-weight-bold mb-6">Other Categories</h3>
        <v-row>
          <v-col 
            cols="6" 
            sm="4" 
            md="3" 
            lg="2" 
            v-for="cat in otherCategories" 
            :key="cat.slug"
          >
            <v-card 
              :to="`/category/${cat.slug}`" 
              class="category-card pa-4 text-center"
              hover
            >
              <v-icon size="32" color="primary" class="mb-2">mdi-firework</v-icon>
              <h4 class="text-body-2 font-weight-medium">
                {{ $t(`categories.${cat.slug}`) }}
              </h4>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProductCard from '@/components/products/ProductCard.vue'

export default {
  name: 'CategoryPage',
  components: {
    ProductCard
  },
  data() {
    return {
      sortBy: 'default',
      loading: true
    }
  },
  computed: {
    ...mapGetters('products', ['allProducts', 'categories', 'getProductsByCategory']),
    slug() {
      return this.$route.params.slug
    },
    categoryName() {
      const cat = this.categories.find(c => c.slug === this.slug)
      if (cat) {
        return this.$t(`categories.${cat.slug}`)
      }
      return this.slug
    },
    products() {
      return this.allProducts.filter(p => p.category === this.slug)
    },
    sortedProductList() {
      const products = [...this.products]
      switch (this.sortBy) {
        case 'price-low':
          return products.sort((a, b) => a.price - b.price)
        case 'price-high':
          return products.sort((a, b) => b.price - a.price)
        case 'popular':
          return products.sort((a, b) => b.popularity - a.popularity)
        default:
          return products
      }
    },
    otherCategories() {
      return this.categories.filter(cat => cat.slug !== this.slug)
    },
    sortOptions() {
      return [
        { text: this.$t('purchase.sort_options.default'), value: 'default' },
        { text: this.$t('purchase.sort_options.price_low'), value: 'price-low' },
        { text: this.$t('purchase.sort_options.price_high'), value: 'price-high' },
        { text: this.$t('purchase.sort_options.popular'), value: 'popular' }
      ]
    }
  },
  watch: {
    slug: {
      immediate: true,
      handler() {
        this.loadProducts()
      }
    }
  },
  methods: {
    ...mapActions('products', ['fetchProducts']),
    async loadProducts() {
      this.loading = true
      try {
        await this.fetchProducts()
      } finally {
        this.loading = false
      }
    },
    onProductAdded() {
      this.$root.$emit('cart-item-added')
    }
  }
}
</script>

<style scoped>
.category-header {
  background: linear-gradient(135deg, #D4AF37 0%, #FF6B35 100%);
}

.category-card {
  border-radius: 12px;
  transition: all 0.3s ease;
}

.category-card:hover {
  background: linear-gradient(135deg, #D4AF37 0%, #FF6B35 100%);
}

.category-card:hover .v-icon,
.category-card:hover h4 {
  color: white !important;
}
</style>
