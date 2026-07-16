<template>
  <div class="safety-page">
    <!-- Header -->
    <section class="safety-header py-16">
      <div class="hero-overlay"></div>
      <v-container class="relative z-10">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <v-icon size="80" color="white" class="mb-6 floating">mdi-shield-account-outline</v-icon>
            <h1 class="text-h2 font-weight-black white--text mb-4">
              {{ $t('safety.title') }}
            </h1>
            <p class="text-h6 white--text opacity-80 max-600 mx-auto">
              {{ $t('safety.subtitle') }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Do's and Don'ts -->
    <section class="py-16 px-4 bg-light">
      <v-container>
        <v-row class="mt-n16 relative z-20">
          <!-- Do's -->
          <v-col cols="12" md="6" class="mb-6">
            <v-card class="pa-10 premium-card h-100 border-success" elevation="10">
              <div class="d-flex align-center mb-8">
                <div class="icon-circle bg-success-light mr-4">
                  <v-icon color="success" size="32">mdi-check-bold</v-icon>
                </div>
                <h2 class="text-h4 font-weight-bold success--text">
                  {{ $t('safety.dos_title') }}
                </h2>
              </div>

              <v-list flat color="transparent">
                <v-list-item 
                  v-for="(item, index) in $t('safety.dos')" 
                  :key="index"
                  class="px-0 mb-4"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon color="success" size="20">mdi-checkbox-marked-circle-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-body-1 grey--text text--darken-3 line-height-relaxed" style="white-space: normal;">
                      {{ item }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>

          <!-- Don'ts -->
          <v-col cols="12" md="6" class="mb-6">
            <v-card class="pa-10 premium-card h-100 border-error" elevation="10">
              <div class="d-flex align-center mb-8">
                <div class="icon-circle bg-error-light mr-4">
                  <v-icon color="error" size="32">mdi-close-thick</v-icon>
                </div>
                <h2 class="text-h4 font-weight-bold error--text">
                  {{ $t('safety.donts_title') }}
                </h2>
              </div>

              <v-list flat color="transparent">
                <v-list-item 
                  v-for="(item, index) in $t('safety.donts')" 
                  :key="index"
                  class="px-0 mb-4"
                >
                  <v-list-item-icon class="mr-3">
                    <v-icon color="error" size="20">mdi-alert-circle-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-body-1 grey--text text--darken-3 line-height-relaxed" style="white-space: normal;">
                      {{ item }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Responsibility Section -->
    <section class="responsibility-section py-20 text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10" lg="8">
            <v-icon size="80" color="white" class="mb-8 opacity-40">mdi-leaf-circle-outline</v-icon>
            <h2 class="text-h3 font-weight-black white--text mb-6">
              {{ $t('safety.responsibility.title') }}
            </h2>
            <p class="text-h5 white--text opacity-80 leading-relaxed font-weight-light">
              {{ $t('safety.responsibility.message') }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Final CTA -->
    <section class="py-16 bg-light">
      <v-container>
        <v-card class="premium-card pa-12 text-center" elevation="4">
          <h3 class="text-h4 font-weight-bold grey--text text--darken-3 mb-6">
            Celebrate Safely with Dhanalakshmi Crackers
          </h3>
          <p class="text-body-1 grey--text max-600 mx-auto mb-10">We prioritize your safety above all. Follow these guidelines for a memorable and safe celebration.</p>
          <v-btn x-large color="primary" rounded to="/purchase" class="px-12 elevation-8 hover-scale">
            <v-icon left>mdi-shopping</v-icon>
            Start Safe Shopping
          </v-btn>
        </v-card>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: 'SafetyPage'
}
</script>

<style scoped>
.safety-header {
  background: linear-gradient(135deg, #1A1A2E 0%, #28A745 100%);
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
}

.bg-light { background-color: #fbfbfb; }

.icon-circle {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.bg-success-light { background-color: rgba(76, 175, 80, 0.1); }
.bg-error-light { background-color: rgba(244, 67, 54, 0.1); }

.border-success { border-top: 6px solid #4CAF50 !important; }
.border-error { border-top: 6px solid #F44336 !important; }

.responsibility-section {
  background: linear-gradient(135deg, #1A1A2E 0%, #16213E 100%);
  position: relative;
}

.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.line-height-relaxed { line-height: 1.6; }
.max-600 { max-width: 600px; }
.relative { position: relative; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }
.opacity-40 { opacity: 0.4; }
.opacity-80 { opacity: 0.8; }
.leading-relaxed { line-height: 1.8; }
</style>
