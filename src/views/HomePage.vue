<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <v-container class="hero-container">
        <v-row align="center" class="hero-content py-12">
          <v-col cols="12" md="7" class="animate-up">
            <v-chip small label class="hero-chip mb-5 font-weight-bold">
              <v-icon left x-small color="accent">mdi-star</v-icon>
              Sivakasi's Finest Crackers
            </v-chip>
            <h1 class="hero-title font-weight-black white--text mb-4">
              Premium Crackers at <span class="hero-accent">Best Prices</span>
            </h1>
            <p class="hero-subtitle white--text mb-6">
              Quality firecrackers from the heart of Sivakasi — up to 80% off with free gifts on bulk orders!
            </p>
            <div class="hero-stats d-flex mb-8">
              <div v-for="stat in heroStats" :key="stat.label" class="hero-stat mr-8">
                <div class="hero-stat-value accent--text">{{ stat.value }}</div>
                <div class="hero-stat-label white--text">{{ stat.label }}</div>
              </div>
            </div>
            <div class="d-flex flex-wrap hero-actions">
              <v-btn large color="accent" class="secondary--text font-weight-bold px-8 mr-3 mb-2" to="/purchase">
                <v-icon left>mdi-shopping</v-icon>
                {{ $t('home.shop_now') }}
              </v-btn>
              <v-btn large outlined dark class="px-8 mb-2" to="/contact">
                <v-icon left>mdi-whatsapp</v-icon>
                WhatsApp
              </v-btn>
            </div>
          </v-col>

          <!-- Floating offer badges -->
          <v-col cols="12" md="5" class="d-flex flex-column align-md-end">
            <div class="logo-seal mb-6 align-self-center">
              <v-icon size="56" color="accent">mdi-firework</v-icon>
              <div class="logo-seal-text">Dhanalakshmi<br>Crackers</div>
            </div>
            <div
              v-for="tier in discountTiers"
              :key="tier.amount"
              class="offer-pill mb-3"
            >
              <span class="offer-dot" :style="{ background: tier.dot }"></span>
              <strong>{{ tier.discount }}% OFF</strong>
              above ₹{{ tier.amount.toLocaleString('en-IN') }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Our Products / Offer tiers -->
    <section class="products-section py-12">
      <v-container>
        <div class="text-center mb-10">
          <v-chip small label class="section-chip mb-3 font-weight-bold">Wholesale Offers</v-chip>
          <h2 class="section-title mb-2">Our Products</h2>
          <p class="section-sub mb-0">Explore our wide range of quality firecrackers at the best prices</p>
        </div>
        <v-row>
          <v-col cols="12" md="4" v-for="tier in discountTiers" :key="tier.amount">
            <v-card class="tier-card pa-6" outlined to="/purchase">
              <div class="tier-icon mb-4" :style="{ background: tier.dot }">
                <v-icon color="white">{{ tier.icon }}</v-icon>
              </div>
              <div class="text-body-2 grey--text text--darken-1">Above ₹{{ tier.amount.toLocaleString('en-IN') }}</div>
              <h3 class="tier-discount mb-3">{{ tier.discount }}% OFF</h3>
              <v-chip small label :color="tier.dot" dark class="font-weight-bold">
                <v-icon left x-small>mdi-gift</v-icon> Free {{ tier.gift }}
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Welcome Section -->
    <section class="py-16 Welcome-section">
      <v-container>
        <v-row align="center">
          <v-col cols="12" md="6" class="pr-md-10">
            <h2 class="text-h3 font-weight-bold mb-6 festive-gradient">
              {{ $t('home.welcome') }}
            </h2>
            <p class="text-body-1 grey--text text--darken-2 mb-8 leading-relaxed">
              {{ $t('home.firecrackers_intro') }}
            </p>
            <v-row>
              <v-col cols="12" sm="6" v-for="(feat, i) in features" :key="i">
                <div class="d-flex align-center mb-4">
                  <v-icon color="primary" class="mr-3">mdi-check-circle</v-icon>
                  <span class="font-weight-medium">{{ feat }}</span>
                </div>
              </v-col>
            </v-row>
            <v-btn large color="primary" class="mt-8 rounded-lg" to="/about">
              Learn More
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-card class="premium-card overflow-hidden">
              <v-img src="https://images.unsplash.com/photo-1533230393124-4f056d68f643?w=800" height="400">
                <div class="fill-height d-flex align-end pa-6" style="background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);">
                  <div class="white--text">
                    <h3 class="text-h5 font-weight-bold">Tradition Meets Quality</h3>
                    <p class="text-body-2 mb-0 opacity-80">Celebrating 50+ years of excellence in Sivakasi.</p>
                  </div>
                </div>
              </v-img>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Categories Circular Preview -->
    <section class="py-16 px-4">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold festive-gradient mb-2">Explore Our Range</h2>
          <p class="grey--text">Handpicked categories for your celebrations</p>
        </div>

        <v-row>
          <v-col 
            cols="6" 
            sm="4" 
            md="3" 
            lg="2" 
            v-for="cat in categories" 
            :key="cat.slug"
            class="animate-in"
          >
            <v-card 
              :to="`/category/${cat.slug}`" 
              class="category-circle-card pa-6 text-center premium-card"
              hover
            >
              <div class="icon-wrapper mb-4">
                <v-icon size="32" color="primary">mdi-firework</v-icon>
              </div>
              <h4 class="text-body-2 font-weight-bold text-uppercase">
                {{ $t(`categories.${cat.slug}`) }}
              </h4>
            </v-card>
          </v-col>
        </v-row>

        <div class="text-center mt-12">
          <v-btn x-large color="primary" rounded to="/purchase" class="px-12 elevation-8 hover-scale">
            View All Products
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomePage',
  data() {
    return {
      heroStats: [
        { value: '200+', label: 'Products' },
        { value: '500+', label: 'Happy Customers' },
        { value: '80%', label: 'Max Discount' }
      ],
      features: [
        'Premium Quality Raw Materials',
        'Traditional Craftsmanship',
        'Strict Safety Standards',
        'Wholesale Rates',
        'Echo Friendly Options',
        'Across India Delivery'
      ],
      discountTiers: [
        { amount: 3000, discount: 50, gift: '100 Wala', icon: 'mdi-tag', dot: '#1F8A4C' },
        { amount: 5000, discount: 70, gift: '500 Wala', icon: 'mdi-star', dot: '#F5B800' },
        { amount: 10000, discount: 80, gift: '1000 Wala', icon: 'mdi-trophy', dot: '#E5484D' }
      ]
    }
  },
  computed: {
    ...mapGetters('products', ['categories'])
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #0F3D24 0%, #1F6B3A 100%);
  overflow: hidden;
}
.hero-overlay {
  position: absolute; inset: 0; z-index: 1;
  background-image: radial-gradient(circle at 15% 25%, rgba(245, 184, 0, 0.12) 0%, transparent 45%),
                    radial-gradient(circle at 85% 75%, rgba(46, 155, 80, 0.35) 0%, transparent 50%);
}
.hero-container, .hero-content { position: relative; z-index: 2; }
.hero-chip { background: rgba(255, 255, 255, 0.14) !important; color: #fff !important; }
.hero-title { font-size: 3rem; line-height: 1.1; }
.hero-accent { color: #F5B800; }
.hero-subtitle { opacity: 0.85; max-width: 520px; font-size: 1.05rem; }
.hero-stat-value { font-size: 1.6rem; font-weight: 800; }
.hero-stat-label { font-size: 0.8rem; opacity: 0.8; }
.logo-seal {
  width: 150px; height: 150px; border-radius: 50%;
  border: 3px solid #F5B800;
  background: rgba(255, 255, 255, 0.08);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  color: #fff; text-align: center; font-weight: 700; font-size: 0.8rem;
}
.offer-pill {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff; border-radius: 999px; padding: 8px 18px; font-size: 0.9rem;
  backdrop-filter: blur(6px);
}
.offer-dot { display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 8px; }

.products-section { background: #F1FAF4; }
.section-chip { background: rgba(31, 138, 76, 0.12) !important; color: #1F8A4C !important; }
.section-title { font-size: 2rem; font-weight: 800; color: #0F3D24; }
.section-sub { color: #5b6b62; }
.tier-card {
  border-radius: 18px !important;
  border: 1px solid rgba(15, 61, 36, 0.1) !important;
  transition: all 0.25s ease;
}
.tier-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(15, 61, 36, 0.12) !important; }
.tier-icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.tier-discount { font-size: 1.8rem; font-weight: 800; color: #0F3D24; }

.category-circle-card { border-radius: 20px !important; transition: all 0.3s ease; }
.category-circle-card:hover { background: var(--v-primary-base) !important; color: white !important; }
.category-circle-card:hover .v-icon { color: white !important; }
.hover-scale:hover { transform: scale(1.05); }
.leading-relaxed { line-height: 1.8; }
.animate-up { animation: fadeInUp 0.9s ease-out; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 600px) {
  .hero-title { font-size: 2.1rem; }
}
</style>
