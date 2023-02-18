<template>
  <div class="grid grid-cols-2 flex flex-wrap gap-6 lg:gap-32 h-full">
    <div class="col-span-2 space md:col-span-1 verify flex_col my-auto">
      <h1 class="text-gray-800 font-bold mb-2">
        Email Verification
      </h1>
      <p class="text-gray-600 mb-space mb-6">
        Please wait while we verification your email.
      </p>
      <button
              class="
                 h-10 w-64
                broder-0 bg-[#006696]
                text-white text-sm
                font-semibold
                flex
                items-center
                justify-center
              "
              @click.prevent="resolveToken"
            >
              Click To Activate Your Email
            </button>
      <div v-if="message.length > 0">
        <v-alert
          :message="message"
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
      <div v-if="loading == true" class="flex flex-col">
        <loader class="mx-auto md:mx-0" />
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/global/Loader'

export default {
  // layout: 'auth',
  // middleware: 'guest',
  components: {
    Loader,
  },

  data: () => ({
    user: null,
    redirectTo: '/',
    loading: false,
    message: '',
    success: false,
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
      this.loading = true;
      //console.log({
        //   email_hash: this.email_hash,
        //   hash_string: this.hash_string
        // })
      this.$axios
        .put(`/users/activate`, {
          email_hash: this.email_hash,
          hash_string: this.hash_string
        })
        .then((response) => {
          //console.log(response);
          this.success = true
          this.loading = false
          this.message = "Activation Successful"
          this.$router.push('/login')
        })
        .catch((error) => {
          const message = _.get(
            error,
            'response.data.message',
            'Invalid activication token'
          )
          // //console.log(error.response)
          this.message = "Email verification failed"
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
<style>
.verify {
  text-align: center;
}
</style>
