<template>
  <v-dialog :value="open" @input="v => $store.commit('ui/SET_LOGIN_OPEN', v)" max-width="380">
    <v-card class="dialog-card pa-6">
      <div class="d-flex align-center mb-4">
        <span class="dialog-icon mr-2"><v-icon color="white" small>mdi-account</v-icon></span>
        <span class="text-subtitle-1 font-weight-bold secondary--text">Admin Login</span>
        <v-spacer></v-spacer>
        <v-btn icon small @click="close"><v-icon>mdi-close</v-icon></v-btn>
      </div>
      <v-form ref="form" @submit.prevent="submit">
        <v-text-field v-model="email" label="Email" type="email" outlined dense
          :rules="[v => /.+@.+\..+/.test(v) || 'Enter a valid email']"></v-text-field>
        <v-text-field v-model="password" label="Password" outlined dense
          :type="show ? 'text' : 'password'" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show" :rules="[v => v.length >= 6 || 'Min 6 characters']"></v-text-field>
        <v-alert v-if="authError" type="error" dense text class="mb-3">{{ authError }}</v-alert>
        <v-btn type="submit" block large color="primary" depressed :loading="isLoading">Login</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'LoginDialog',
  data() {
    return { email: '', password: '', show: false }
  },
  computed: {
    ...mapState('ui', { open: 'loginOpen' }),
    ...mapGetters('auth', ['authError', 'isLoading'])
  },
  methods: {
    close() { this.$store.commit('ui/SET_LOGIN_OPEN', false) },
    async submit() {
      if (!this.$refs.form.validate()) return
      const ok = await this.$store.dispatch('auth/login', { email: this.email, password: this.password })
      if (ok) {
        this.close()
        this.$router.push('/admin')
      }
    }
  }
}
</script>

<style scoped>
.dialog-card { border-radius: 20px !important; }
.dialog-icon { width: 28px; height: 28px; border-radius: 8px; background: #1F8A4C; display: inline-flex; align-items: center; justify-content: center; }
</style>
