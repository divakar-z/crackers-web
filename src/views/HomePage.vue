<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <v-container fill-height>
        <v-row align="center" justify="center" class="hero-content py-16">
          <v-col cols="12" md="8" class="text-center animate-up">
            <div class="hero-chip mb-6 d-inline-block">
              <v-chip color="rgba(255,255,255,0.2)" dark label class="px-6 font-weight-bold">
                ✨ SIVAKASI'S FINEST CRACKERS
              </v-chip>
            </div>
            <h1 class="text-h2 text-md-h1 font-weight-black white--text mb-6 hero-title">
              {{ $t('home.title') }}
            </h1>
            <p class="text-h6 text-md-h5 white--text mb-10 hero-subtitle">
              {{ $t('home.subtitle') }}
            </p>
            <div class="d-flex flex-wrap justify-center gap-4">
              <v-btn x-large color="white" light class="primary--text font-weight-bold px-10 rounded-lg hover-scale" to="/purchase">
                <v-icon left>mdi-shopping</v-icon>
                {{ $t('home.shop_now') }}
              </v-btn>
              <v-btn x-large outlined dark class="px-10 rounded-lg" to="/contact">
                <v-icon left>mdi-whatsapp</v-icon>
                Contact Us
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
      
      <!-- Statistics/Trust Badges -->
      <div class="hero-badges py-6">
        <v-container>
          <v-row justify="center">
            <v-col cols="6" sm="3" v-for="badge in trustBadges" :key="badge.text" class="text-center">
              <v-icon color="white" size="32" class="mb-2">{{ badge.icon }}</v-icon>
              <div class="white--text font-weight-bold">{{ badge.text }}</div>
            </v-col>
          </v-row>
        </v-container>
      </div>
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

    <!-- Discount Tiers Section -->
    <section class="discount-section py-16">
      <v-container>
        <v-row justify="center" class="mb-12">
          <v-col cols="12" md="8" class="text-center">
            <h2 class="text-h3 font-weight-bold white--text mb-4">
              🎉 Exclusive Wholesale Offers
            </h2>
            <p class="text-h6 white--text opacity-80">Bulk orders enjoy massive savings & free gifts!</p>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="4" v-for="tier in discountTiers" :key="tier.amount">
            <v-card class="discount-card-premium pa-8 text-center" :class="tier.class">
              <div class="tier-icon mb-6">
                <v-icon size="64" :color="tier.iconColor">{{ tier.icon }}</v-icon>
              </div>
              <h3 class="text-h4 font-weight-black mb-2">{{ tier.discount }}% OFF</h3>
              <div class="text-h6 mb-6 opacity-80">Orders above ₹{{ tier.amount.toLocaleString('en-IN') }}</div>
              <v-divider dark class="mb-6 opacity-20"></v-divider>
              <div class="text-subtitle-1 mb-2">FREE GIFT:</div>
              <v-chip class="font-weight-bold" :color="tier.giftColor" dark>{{ tier.gift }}</v-chip>
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
      trustBadges: [
        { icon: 'mdi-truck-delivery', text: 'Fast Shipping' },
        { icon: 'mdi-shield-check', text: 'Safe Handling' },
        { icon: 'mdi-certificate', text: 'Quality Assured' },
        { icon: 'mdi-cash-multiple', text: 'Best Price' }
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
        { amount: 3000, discount: 50, gift: '100 Wala', icon: 'mdi-tag', iconColor: 'success', giftColor: 'success', class: 'tier-silver' },
        { amount: 5000, discount: 70, gift: '500 Wala', icon: 'mdi-star', iconColor: 'warning', giftColor: 'warning', class: 'tier-gold' },
        { amount: 10000, discount: 80, gift: '1000 Wala', icon: 'mdi-trophy', iconColor: 'error', giftColor: 'error', class: 'tier-platinum' }
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
  background: linear-gradient(135deg, #1A1A2E 0%, #C41E3A 100%);
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(255, 107, 53, 0.1) 0%, transparent 50%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-badges {
  background: rgba(0,0,0,0.2);
  backdrop-filter: blur(5px);
  position: relative;
  z-index: 2;
}

.hero-title {
  line-height: 1.1;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.hero-subtitle {
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.discount-section {
  background: #1A1A2E;
  position: relative;
}

.discount-card-premium {
  border-radius: 24px !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  transition: all 0.4s ease;
}

.discount-card-premium:hover {
  transform: translateY(-12px);
  background: rgba(255, 255, 255, 0.08) !important;
  border-color: rgba(212, 175, 55, 0.4) !important;
}

.tier-gold { border-bottom: 4px solid #D4AF37 !important; }
.tier-silver { border-bottom: 4px solid #C0C0C0 !important; }
.tier-platinum { border-bottom: 4px solid #E5E4E2 !important; }

.category-circle-card {
  border-radius: 20px !important;
  transition: all 0.3s ease;
}

.category-circle-card:hover {
  background: var(--v-primary-base) !important;
  color: white !important;
}

.category-circle-card:hover .v-icon {
  color: white !important;
}

.hover-scale:hover {
  transform: scale(1.05);
}

.leading-relaxed {
  line-height: 1.8;
}

.gap-4 {
  gap: 16px;
}

.animate-up {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>


