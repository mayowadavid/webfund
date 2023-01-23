<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <dash-settings-navbar-mobile />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title>Organization</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div
          class="
            grid grid-cols-12
            mt-5
            md:mt-12
            gap-y-6
            md:gap-x-12
            lg:gap-x-16
          "
        >
          <div class="md:order-last col-span-12 md:col-span-4 lg:col-span-5">
            <progress-circle-step show-steps :step="step" :steps="steps" />
          </div>
          <div class="col-span-12 md:col-span-8 lg:col-span-7">
            <div class="grid gap-y-6 lg:gap-y-6">
              <icon-card-list
                title="Profile Details"
                button="Setup"
                @click="$router.push('/settings/organization/profile')"
              />
              <icon-card-list
                title="Documents"
                button="Setup"
                @click="$router.push('/settings/organization/documents')"
              />
              <icon-card-list
                title="Contact"
                button="Setup"
                @click="$router.push('/settings/organization/contact')"
              />
              <icon-card-list
                title="Bank Account"
                button="Setup"
                @click="$router.push('/settings/organization/bank-account')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  layout: 'dashboard',
  scrollToTop: true,
  data: () => ({
    loading: false,
    success: false,
    step: 1,
    steps: ['Profile Details', 'Documents', 'Contact', 'Bank Account'],
    form: {
      old_password: '',
      password: '',
      re_password: '',
    },
  }),
  computed: {
      ...mapState({
      orgData: (state) => state.auth.org,
    })
  },
  watch: {
    orgData(newValue, oldValue){
        if(newValue.business_phone?.length > 0){
         return this.step = 3;
        }else if(newValue?.tin?.length > 0){
          return this.step = 2;
        }else if(newValue?.name.length > 0){
            return this.step = 1;
        }
    }
  },
   mounted() {
    // reset errors
    this.$store.commit('app/SET_FORM_ERRORS', false)

    // fetch org
    this.$store.dispatch('auth/fetchOrganization');
  },
}
</script>
