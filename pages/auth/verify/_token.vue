<template>
  <div class="grid grid-cols-2 gap-6 lg:gap-32 h-full">
    <div class="col-span-2 md:col-span-1 my-auto">
      <h1 class="text-center md:text-left text-gray-800 font-bold mb-2">
        Email Verification
      </h1>
      <p class="text-center md:text-left text-gray-600 mb-6 md:pr-20">
        Please wait while we verification your email.
      </p>
      <div v-if="!loading">
        <v-alert
          :message="
            $options.filters.capitalize(message, {
              onlyFirstLetter: true,
            })
          "
          :color="success ? 'green' : 'red'"
          class="mb-8"
        />
        <button
          class="btn btn-primary-outline inline-block"
          @click.prevent="$router.push('/login')"
        >
          Go to login
        </button>
      </div>
      <div v-else class="flex flex-col">
        <loader class="mx-auto md:mx-0" />
      </div>
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
    loading: true,
    message: false,
    success: false,
  }),

  created() {
    this.$store.commit('app/SET_PAGE_TITLE', 'Verify Email')

    const token = _.get(this.$route, 'params.token', null)

    if (token) this.resolveToken(token)
    else this.$router.push('/login')
  },

  methods: {
    resolveToken(token) {
      this.$axios
        .get(`/auth/verify/${token}`)
        .then((response) => {
          this.success = true
          this.loading = false
          this.message = response.data.message
        })
        .catch((error) => {
          const message = _.get(
            error,
            'response.data.message',
            'Invalid activication token'
          )
          // console.log(error.response)
          this.message = message
          this.loading = false
        })
    },
  },

  head() {
    return {
      title: 'Verify Email',
    }
  },
}
</script>
