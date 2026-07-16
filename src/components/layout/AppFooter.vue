<template>
  <v-footer padless class="footer-section mt-12">
    <v-container class="py-12">
      <v-row>
        <!-- Company Info -->
        <v-col cols="12" md="4" class="mb-8 mb-md-0">
          <div class="d-flex align-center mb-6">
            <v-icon size="40" color="white" class="mr-3">mdi-firework</v-icon>
            <span class="text-h5 font-weight-bold white--text">{{ $t('home.title') }}</span>
          </div>
          <p class="text-body-1 white--text mb-6" style="opacity: 0.8; line-height: 1.6;">
            {{ $t('footer.tagline') }}
          </p>
          <div class="d-flex">
            <v-btn icon color="white" class="mr-2 glass-effect"><v-icon>mdi-facebook</v-icon></v-btn>
            <v-btn icon color="white" class="mr-2 glass-effect"><v-icon>mdi-instagram</v-icon></v-btn>
            <v-btn icon color="white" class="glass-effect"><v-icon>mdi-whatsapp</v-icon></v-btn>
          </div>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="12" sm="6" md="4" class="mb-8 mb-md-0 pl-md-10">
          <h4 class="text-h6 font-weight-bold white--text mb-6">Quick Links</h4>
          <v-list dark flat color="transparent" class="pa-0">
            <v-list-item 
              v-for="link in quickLinks" 
              :key="link.to" 
              :to="link.to"
              class="px-0 min-h-0 mb-2"
            >
              <v-list-item-content class="py-0">
                <v-list-item-title class="white--text" style="opacity: 0.8;">
                  {{ $t(link.text) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Contact Info -->
        <v-col cols="12" sm="6" md="4">
          <h4 class="text-h6 font-weight-bold white--text mb-6">{{ $t('contact.title') }}</h4>
          <div class="contact-info">
            <div class="d-flex mb-4">
              <v-icon color="white" class="mr-3 mt-1" size="20">mdi-map-marker</v-icon>
              <div class="white--text" style="opacity: 0.8;">
                Sivakasi, Tamil Nadu, India
              </div>
            </div>
            <div class="d-flex mb-4">
              <v-icon color="white" class="mr-3" size="20">mdi-phone</v-icon>
              <div class="white--text" style="opacity: 0.8;">
                <a href="tel:+919942159948" class="white--text text-decoration-none">9942159948</a>, 
                <a href="tel:+919894094418" class="white--text text-decoration-none">9894094418</a>
              </div>
            </div>
            <div class="d-flex">
              <v-icon color="white" class="mr-3" size="20">mdi-email</v-icon>
              <a href="mailto:crackersdhanalakshmi@gmail.com" class="white--text text-decoration-none" style="opacity: 0.8;">
                crackersdhanalakshmi@gmail.com
              </a>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-10" style="border-color: rgba(255,255,255,0.1) !important;"></v-divider>

      <v-row align="center">
        <v-col cols="12" md="6" class="text-center text-md-left">
          <span class="white--text text-body-2" style="opacity: 0.6;">
            &copy; {{ new Date().getFullYear() }} Dhanalakshmi Crackers. All Rights Reserved.
          </span>
        </v-col>
        <v-col cols="12" md="6" class="text-center text-md-right">
          <v-chip color="green darken-2" dark class="px-4">
            <v-icon left>mdi-whatsapp</v-icon>
            Safe & Secure Shopping
          </v-chip>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      quickLinks: [
        { text: 'nav.home', to: '/' },
        { text: 'nav.about', to: '/about' },
        { text: 'nav.purchase', to: '/purchase' },
        { text: 'nav.safety', to: '/safety' },
        { text: 'nav.contact', to: '/contact' }
      ]
    }
  }
}
</script>

<style scoped>
.footer-section {
  background: linear-gradient(135deg, #1A1A2E 0%, #16213E 100%) !important;
  position: relative;
  overflow: hidden;
}

.footer-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #D4AF37, #C41E3A, #D4AF37);
}

.contact-info a:hover {
  color: #D4AF37 !important;
  text-decoration: underline !important;
}

.min-h-0 {
  min-height: auto !important;
}
</style>
