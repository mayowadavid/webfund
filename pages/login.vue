<template>
  <div class="grid grid-cols-2 gap-6 lg:gap-32 h-full">
    <div class="col-span-2 md:col-span-1 mt-8 md:my-auto">
      <h1 class="text-center md:text-left text-gray-800 font-bold mb-2">
        Welcome back!
      </h1>
      <p class="text-center md:text-left text-gray-600 md:pr-20">
        Log in with the email and password used during your account registration
      </p>
      <v-form
        id="forgot-password-form"
        ref="form"
        class="py-8"
        :loading.sync="loading"
        :on-submit="login"
        :on-success="onSuccess"
        success-message="Great, login was successful!"
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
        <div class="form-group hang-label">
          <label for="input-password">Password</label>
          <div>
            <validation-provider
              v-slot="{ errors, classes }"
              name="password"
              rules="required"
            >
              <show-password>
                <input
                  id="input-password"
                  v-model="form.password"
                  class="form-input"
                  :class="{ ...classes, 'no-icon': errors.length }"
                  placeholder="Enter your password here"
                  type="password"
                />
              </show-password>
              <span v-show="errors.length" class="is-invalid">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
        </div>
        <div class="text-left my-4">
          <nuxt-link
            to="/forgot-password"
            class="leading-5 text-blue-600 font-bold"
          >
            Forgot password?
          </nuxt-link>
        </div>
        <template v-slot:footer>
          <div class="mb-4">
            <v-button class="w-full" :loading="loading"> Sign in </v-button>
            <nuxt-link
              to="/signup"
              class="btn btn-primary-outline w-full mt-6 block text-center"
            >
              Don’t have an account, Sign up
            </nuxt-link>
          </div>
        </template>
      </v-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  layout: 'auth',
  middleware: 'guest',
  scrollToTop: true,
  data: () => ({
    loading: false,
    success: false,
    form: {
      email: '',
      password: '',
    },
  }),
  methods: {
    login() {
      const {email, password} = this.form;
      // Submit the form.
      return this.$axios.post('/users/login', {
        email,
        password
      })
    },
    onSuccess(resp) {
      console.log(resp);
      this.$store.dispatch('auth/onSuccess', resp.data)
    },
  },
}
</script>
