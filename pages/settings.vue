<template>
  <div class="flex flex-col lg:flex-row lg:h-full">
    <sub-menu-sidebar title="Settings" :options="menuItems" />
    <div class="flex flex-grow flex-col lg:pt-8">
      <nuxt-child />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',

  validate({ route, redirect }) {
    if (route.name === 'settings') redirect('/settings/profile')
    return true
  },

  data() {
    return {
      menuItems: require('~/static/json/settings-menu.json'),
    }
  },

  created() {
    this.$store.commit('app/SET_PAGE_TITLE', 'Settings')
  },
}
</script>
