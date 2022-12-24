<template>
  <div class="grid grid-cols-2 gap-6 lg:gap-32 h-full">
    <div class="col-span-2 md:col-span-1 my-auto">
      <h1 class="text-center md:text-left text-gray-800 font-bold mb-2">
        Reset password
      </h1>
      <p class="text-center md:text-left text-gray-600 md:pr-20">
        Enter a new password and reset the password to your account.
      </p>
      <v-form
        id="reset-password-form"
        ref="form"
        class="py-4 md:py-8"
        :loading.sync="loading"
        :on-submit="resetPassword"
        :on-success="onSuccess"
      >
        <div class="form-group mb-5">
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
                  placeholder="New password"
                  type="password"
                />
              </show-password>
              <span v-show="errors.length" class="is-invalid">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
        </div>
        <div class="form-group mb-5">
          <div>
            <validation-provider
              v-slot="{ errors, classes }"
              name="repeat password"
              rules="required|password:@password"
            >
              <show-password>
                <input
                  id="input-re_password"
                  v-model="form.re_password"
                  class="form-input"
                  :class="{ ...classes, 'no-icon': errors.length }"
                  placeholder="Confirm new password"
                  type="password"
                />
              </show-password>
              <span v-show="errors.length" class="is-invalid">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
        </div>
        <template v-slot:footer>
          <div class="mb-4">
            <v-button class="w-full" :loading="loading">
              Reset password
            </v-button>
            <button
              class="btn btn-primary-outline inline-block mt-6 w-full"
              @click.prevent="requestPasswordReset"
            >
              Request password reset
            </button>
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
  middleware: 'auth',
  validate({ store }) {
    const hasChangedPassword = _.get(
      store,
      'state.auth.user.has_changed_password',
      true
    )
    return !hasChangedPassword
  },
  data: () => ({
    home: 'home',
    loading: false,
    form: {
      password: '',
      re_password: '',
    },
  }),
  methods: {
    requestPasswordReset() {
      this.$store.commit('auth/LOGOUT')
      this.$router.push('/forgot-password')
    },
    resetPassword() {
      // Submit the form.
      return this.$axios.post('/auth/reset-password', this.form)
    },
    async onSuccess() {
      // data cleanup
      this.$refs.form.reset()
      this.$store.commit('auth/SET_RESET_PASSWORD', false)

      await this.$store.dispatch('auth/fetchUser')

      setTimeout(() => this.$router.push('/'), 1000)
    },
    onError() {},
  },
}
</script>
