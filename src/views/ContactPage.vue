<template>
  <div class="contact-page">
    <!-- Header -->
    <section class="contact-header py-16">
      <div class="hero-overlay"></div>
      <v-container class="relative z-10">
        <v-row align="center" justify="center">
          <v-col cols="12" md="8" class="text-center">
            <v-icon size="80" color="white" class="mb-6 floating">mdi-phone-classic</v-icon>
            <h1 class="text-h2 font-weight-black white--text mb-4">
              {{ $t('contact.title') }}
            </h1>
            <p class="text-h6 white--text opacity-80 max-600 mx-auto">
              {{ $t('contact.subtitle') }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Contact Info Cards -->
    <section class="py-16 px-4 bg-light">
      <v-container>
        <v-row class="mt-n16 relative z-20">
          <!-- Address -->
          <v-col cols="12" md="4" class="mb-6">
            <v-card class="pa-8 text-center premium-card h-100" elevation="10">
              <div class="icon-circle mb-6 mx-auto bg-primary-light">
                <v-icon size="36" color="primary">mdi-map-marker-radius</v-icon>
              </div>
              <h3 class="text-h5 font-weight-bold mb-4">
                {{ $t('contact.address_title') }}
              </h3>
              <p class="text-body-1 grey--text text--darken-2 line-height-relaxed">
                {{ $t('contact.address') }}<br>
                <span class="text-caption">(Pernaikanpatti to Thayilpatti)</span>
              </p>
              <v-btn text color="primary" class="mt-4 font-weight-bold">
                Get Directions <v-icon right small>mdi-open-in-new</v-icon>
              </v-btn>
            </v-card>
          </v-col>

          <!-- Phone Numbers -->
          <v-col cols="12" md="4" class="mb-6">
            <v-card class="pa-8 text-center premium-card h-100" elevation="10">
              <div class="icon-circle mb-6 mx-auto bg-success-light">
                <v-icon size="36" color="success">mdi-whatsapp</v-icon>
              </div>
              <h3 class="text-h5 font-weight-bold mb-4">
                {{ $t('contact.phone_title') }}
              </h3>
              <div class="d-flex flex-column align-center">
                <v-btn text x-large color="grey darken-3" href="tel:+919942159948" class="mb-2 rounded-pill">
                  <v-icon left color="success">mdi-phone</v-icon>
                  9942159948
                </v-btn>
                <v-btn text x-large color="grey darken-3" href="tel:+919894094418" class="mb-2 rounded-pill">
                  <v-icon left color="success">mdi-phone</v-icon>
                  9894094418
                </v-btn>
              </div>
            </v-card>
          </v-col>

          <!-- Email -->
          <v-col cols="12" md="4" class="mb-6">
            <v-card class="pa-8 text-center premium-card h-100" elevation="10">
              <div class="icon-circle mb-6 mx-auto bg-accent-light">
                <v-icon size="36" color="accent">mdi-email-outline</v-icon>
              </div>
              <h3 class="text-h5 font-weight-bold mb-4">
                {{ $t('contact.email_title') }}
              </h3>
              <v-btn text color="grey darken-3" href="mailto:crackersdhanalakshmi@gmail.com" class="rounded-pill text-none">
                crackersdhanalakshmi@gmail.com
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Quick Support Section -->
    <section class="py-16 bg-dark text-center">
      <v-container>
        <h2 class="text-h3 white--text font-weight-bold mb-8">Quick Support</h2>
        <v-row justify="center">
          <v-col cols="12" md="10">
            <div class="d-flex flex-wrap justify-center gap-6">
              <v-btn x-large color="green darken-1" dark class="px-10 rounded-xl elevation-8" href="https://wa.me/919942159948">
                <v-icon left>mdi-whatsapp</v-icon>
                Chat on WhatsApp
              </v-btn>
              <v-btn x-large color="primary" dark class="px-10 rounded-xl elevation-8" href="tel:+919942159948">
                <v-icon left>mdi-phone</v-icon>
                Call Support
              </v-btn>
              <v-btn x-large outlined color="white" class="px-10 rounded-xl" to="/purchase">
                <v-icon left>mdi-shopping</v-icon>
                Start Shopping
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Map Section -->
    <section class="py-16 px-4">
      <v-container>
        <div class="text-center mb-12">
          <h2 class="text-h4 font-weight-bold festive-gradient">Our Location</h2>
          <p class="grey--text">Visit us for a direct experience</p>
        </div>
        <v-card class="premium-card overflow-hidden elevation-12">
          <div class="map-placeholder d-flex align-center justify-center grey lighten-3" style="height: 400px;">
             <!-- In a real app, embed Google Map here -->
             <div class="text-center">
               <v-icon size="80" color="grey lighten-1">mdi-map-search-outline</v-icon>
               <h3 class="text-h6 grey--text mt-4">Sivakasi Factory Outlet</h3>
               <v-btn color="primary" class="mt-4 rounded-lg px-8">View on Google Maps</v-btn>
             </div>
          </div>
        </v-card>
      </v-container>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ContactPage'
}
</script>

<style scoped>
.contact-header {
  background: linear-gradient(135deg, #1A1A2E 0%, #C41E3A 100%);
  position: relative;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-image: radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%);
}

.bg-light { background-color: #f8f9fa; }
.bg-dark { background-color: #1A1A2E; }

.icon-circle {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.bg-primary-light { background-color: rgba(212, 175, 55, 0.1); }
.bg-success-light { background-color: rgba(76, 175, 80, 0.1); }
.bg-accent-light { background-color: rgba(255, 107, 53, 0.1); }

.relative { position: relative; }
.z-10 { z-index: 10; }
.z-20 { z-index: 20; }

.max-600 { max-width: 600px; }
.line-height-relaxed { line-height: 1.8; }
.gap-6 { gap: 24px; }

.floating {
  animation: floating 3s ease-in-out infinite;
}

@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.bg-light { background-color: #fbfbfb; }

.opacity-80 { opacity: 0.8; }
</style>
