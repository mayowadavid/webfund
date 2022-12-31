<template>
  <div class="grid grid-cols-2 gap-6 lg:gap-32 h-full">
    <div class="col-span-2 md:col-span-1 my-auto">
      <h1 class="text-center md:text-left text-gray-800 font-bold mb-2">
        Forgot password
      </h1>
      <p class="text-center md:text-left text-gray-600 md:pr-20">
        Don't worry, just enter the email address you registered with and we
        will send you a link to reset your password.
      </p>
      <v-form
        id="forgot-password-form"
        ref="form"
        class="py-4 md:py-8"
        :data="form"
        :loading.sync="loading"
        :on-submit="proceed"
        :on-success="onSuccess"
      >
        <div class="form-group hang-label mb-5">
          <label for="input-email">Email address</label>
          <div>
            <validation-provider
              v-slot="{ errors, classes }"
              name="email"
              rules="required|email"
            >
              <input
                id="input-email"
                v-model="form.email"
                class="form-input"
                :class="classes"
                placeholder="Enter your email here"
                type="email"
              />
              <span v-show="errors.length" class="is-invalid">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
        </div>
        <template v-slot:footer>
          <div class="mb-4">
            <v-button class="w-full" :loading="loading">
              Send Password reset Link
            </v-button>
            <nuxt-link
              to="/login"
              class="btn btn-primary-outline block w-full mt-6 text-center"
            >
              Already have an account, Log in
            </nuxt-link>
          </div>
        </template>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'guest',
  data: () => ({
    loading: false,
    form: {
      email: '',
    },
  }),
  methods: {
    proceed() {
      // Submit the form.
      return this.$axios.post('/users/send-password-reset-email', {
        email: this.form.email,
      })
    },
    onSuccess() {
      this.$refs.form.reset()
      this.form.email = ''
    },
  },
}
</script>
