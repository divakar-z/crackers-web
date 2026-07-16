<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero py-16">
      <div class="hero-overlay"></div>
      <v-container class="relative z-10">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <v-icon size="80" color="white" class="mb-6 floating">mdi-information-outline</v-icon>
            <h1 class="text-h2 font-weight-black white--text mb-4">
              {{ $t('about.title') }}
            </h1>
            <h2 class="text-h5 white--text opacity-80 max-600 mx-auto">
              {{ $t('about.subtitle') }}
            </h2>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Welcome Section -->
    <section class="py-16 px-4">
      <v-container>
        <v-row justify="center" class="mt-n16 relative z-20">
          <v-col cols="12" md="10" lg="8">
            <v-card class="pa-10 premium-card text-center" elevation="10">
              <h2 class="text-h4 font-weight-bold festive-gradient mb-8">Our Journey</h2>
              <p class="text-h6 grey--text text--darken-2 mb-8" style="line-height: 1.8;">
                {{ $t('about.intro') }}
              </p>
              <v-divider class="my-8 opacity-10"></v-divider>
              <div class="text-body-1 grey--text text--darken-1 mb-6 leading-relaxed">
                {{ $t('about.experience') }}
              </div>
              <v-chip color="primary" class="font-weight-bold px-6 py-4" dark label>
                {{ $t('about.commitment') }}
              </v-chip>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Experience Cards -->
    <section class="py-16 bg-light">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="mb-6" v-for="(item, i) in experienceItems" :key="i">
            <v-card class="pa-8 text-center premium-card h-100" hover>
              <v-avatar :color="item.color + ' lighten-4'" size="80" class="mb-6">
                <v-icon size="40" :color="item.color">{{ item.icon }}</v-icon>
              </v-avatar>
              <h3 class="text-h2 font-weight-black mb-2" :class="item.color + '--text'">{{ item.value }}</h3>
              <p class="text-h6 grey--text text--darken-1">{{ item.label }}</p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Quality Stats -->
    <section class="stats-section py-20 text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="6" md="4" class="mb-10 mb-md-0" v-for="(stat, i) in stats" :key="i">
            <div class="stat-circle mb-6 mx-auto">
              <v-icon size="40" color="white">{{ stat.icon }}</v-icon>
            </div>
            <h2 class="text-h2 font-weight-black white--text mb-2">{{ stat.value }}</h2>
            <p class="text-h6 white--text opacity-60">{{ $t(stat.label) }}</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Footer CTA -->
    <section class="py-16">
      <v-container>
        <v-card class="premium-card pa-12 text-center primary white--text overflow-hidden">
          <div class="cta-bg"></div>
          <div class="relative z-10">
            <h3 class="text-h3 font-weight-bold mb-6">Ready to light up your celebrations?</h3>
            <p class="text-h6 opacity-80 mb-10 max-600 mx-auto">Explore our premium collection of Sivakasi crackers at the best wholesale prices.</p>
            <div class="d-flex flex-wrap justify-center gap-4">
              <v-btn x-large light color="white" class="primary--text font-weight-bold rounded-lg px-10" to="/purchase">
                Browse Shop
              </v-btn>
              <v-btn x-large outlined color="white" class="rounded-lg px-10" to="/contact">
                Contact Us
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  data() {
    return {
      experienceItems: [
        { icon: 'mdi-store', value: '7', label: 'Years Trading Experience', color: 'primary' },
        { icon: 'mdi-handshake', value: '15', label: 'Years Field Experience', color: 'secondary' },
        { icon: 'mdi-account-group', value: '25+', label: 'Years Team Experience', color: 'accent' }
      ],
      stats: [
        { icon: 'mdi-firework', value: '200+', label: 'about.stats.products' },
        { icon: 'mdi-emoticon-happy-outline', value: '500+', label: 'about.stats.clients' },
        { icon: 'mdi-star-face', value: '100%', label: 'about.stats.satisfaction' }
      ]
    }
  }
}
</script>

<style scoped>
.about-hero {
  background: linear-gradient(135deg, #C41E3A 0%, #1A1A2E 100%);
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%);
}

.bg-light { background-color: #fbfbfb; }

.stats-section {
  background: #1A1A2E;
  position: relative;
}

.stat-circle {
  width: 90px;
  height: 90px;
  border: 2px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cta-bg {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%);
}

.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.relative { position: relative; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.max-600 { max-width: 600px; }
.leading-relaxed { line-height: 1.8; }
.opacity-10 { opacity: 0.1; }
.opacity-60 { opacity: 0.6; }
.opacity-80 { opacity: 0.8; }
.gap-4 { gap: 16px; }
</style>
