<template>
  <div class="flex bg-white">
    <sidebar />
    <div class="dashboard flex flex-col flex-auto mx-auto">
      <!-- <dash-navbar v-else /> -->
      <nuxt />
      <!-- <dash-footer /> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',

  head() {
    return {
      title: this.title || 'Dashboard',
    }
  },

  computed: {
    ...mapState({
      title: (state) => state.app.pageTitle,
    }),
  },
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .dashboard {
    width: calc(100vw - 324px);
  }
}
</style>
