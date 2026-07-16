<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-8 elevation-12">
          <div class="text-center mb-6">
            <v-avatar color="primary" size="64" class="mb-4">
              <v-icon size="36" dark>mdi-shield-account</v-icon>
            </v-avatar>
            <h1 class="text-h5 font-weight-bold">Admin Login</h1>
            <p class="text-body-2 grey--text">Dhanalakshmi Crackers</p>
          </div>

          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="login">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              prepend-icon="mdi-email"
              outlined
              dense
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              outlined
              dense
              required
            ></v-text-field>

            <v-alert v-if="error" type="error" dense class="mb-4">
              {{ error }}
            </v-alert>

            <v-btn
              type="submit"
              color="primary"
              block
              large
              :loading="loading"
              :disabled="!valid"
            >
              <v-icon left>mdi-login</v-icon>
              Login
            </v-btn>
          </v-form>

          <v-divider class="my-6"></v-divider>

          <v-btn text block color="grey" to="/">
            <v-icon left>mdi-arrow-left</v-icon>
            Back to Home
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AdminLogin',
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      showPassword: false,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters'
      ]
    }
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'authError', 'isLoading']),
    loading() {
      return this.isLoading
    },
    error() {
      return this.authError
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    async login() {
      if (this.$refs.form.validate()) {
        const success = await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        })
        if (success) {
          this.$router.push('/admin')
        }
      }
    }
  },
  watch: {
    isAuthenticated(val) {
      if (val) {
        this.$router.push('/admin')
      }
    }
  }
}
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
  background: linear-gradient(135deg, #1A1A2E 0%, #16213E 100%);
}
</style>
