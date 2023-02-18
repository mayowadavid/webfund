<template>
  <div class="grid grid-cols-2 gap-6 lg:gap-32 h-full">
    <div class="col-span-2 md:col-span-1 my-auto">
      <h1 class="text-center md:text-left text-gray-800 font-bold mb-2">
        Reset password
      </h1>
      <p class="text-center md:text-left text-gray-600 md:pr-20">
        input your new password
      </p>
      <v-form
        id="reset-password-form"
        ref="form"
        class="py-4 md:py-8"
        :loading.sync="loading"
        :on-submit="resolveToken"
        :on-success="onSuccess"
        :message="message"
      >
        <div class="form-group hang-label mb-5">
          <label for="input-email">New Password</label>
          <div>
            <validation-provider
              v-slot="{ errors, classes }"
              name="password"
              rules="required"
            >
              <input
                id="input-email"
                v-model="password"
                class="form-input"
                :class="classes"
                placeholder="Enter your new password here"
                type="password"
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
              Reset Password
            </v-button>
          </div>
        </template>
      </v-form>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/global/Loader'

export default {
  layout: 'auth',
  middleware: 'guest',
  components: {
    Loader,
  },

  data: () => ({
    user: null,
    redirectTo: '/',
    loading: false,
    message: false,
    success: false,
    message: '',
    password: '',
    email_hash: '',
    hash_string: ''
  }),

  mounted(){
    let { token } = this.$route.params;
    const result = token.split('-');
    this.email_hash = result[0],
    this.hash_string = result[1];
  },

  methods: {
    resolveToken() {
      const password = this.password;
      return this.$axios
        .post(`users/reset-password`,
        {
          email_hash: this.email_hash,
          hash_string: this.hash_string,
          password
        })
        .then((response) => {
          this.success = true
          //console.log(response)
        })
        .catch((error) => {
          const message = _.get(
            error,
            'response.data.message',
            'Invalid authentication token'
          )
          // //console.log(error.response)
          this.message = message
          this.loading = false
        })
    },
    onSuccess(resp) {
      //console.log(resp)
    }
  },

  head() {
    return {
      title: 'Verify Email',
    }
  },
}
</script>
