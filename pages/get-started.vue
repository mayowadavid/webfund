<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-6 md:px-6 lg:px-10 xl:px-16 mb-10 md:mb-16">
      <topbar-progress
        :title="!$device.isMobile ? title : ''"
        sub-title="Whether you're just starting out or ready to grow your nonprofit's fundraising, we've got it covered."
        :steps="8"
        :step="4"
        class="flex-grow mb-8 md:mb-12"
      />
      <div class="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
        <icon-card
          title="Add CAC document"
          button="Add CAC detaills"
          @click="$router.push('/settings/organization/documents')"
        />
        <icon-card
          title="Set up teams"
          button="Add a member"
          @click="$router.push('/settings/teams')"
        />
        <icon-card
          title="Set up bank account"
          button="Add bank account"
          @click="$router.push('/settings/organization/bank-account')"
        />
        <icon-card
          title="Add business logo"
          button="Add a logo"
          @click="$router.push('/settings/organization/profile')"
        />
        <icon-card
          title="API documentation"
          button="View API keys"
          @click="$router.push('/settings/api-keys-webhooks')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  created() {
    this.$store.commit('app/SET_PAGE_TITLE', 'Get Started')
  },

  computed: {
    ...mapState({
      title: (state) => state.app.pageTitle,
    }),
  },
}
</script>
