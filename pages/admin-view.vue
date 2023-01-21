<template>
<div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <v-nav-title><span class="text-blue-600">Organizations</span></v-nav-title>
          <div class="flex-grow">
            <v-search v-model="search" placeholder="Search organization" />
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mb-3 mt-3" />
        <div class="flex flex-col mt-3">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div class="overflow-hidden">
                <table>
                  <thead>
                    <tr>
                      <th scope="col" class="pr-6">Status</th>
                      <th scope="col" class="px-6">Date</th>
                      <th scope="col" class="px-6">Name</th>
                      <th scope="col" class="px-6">Phone</th>
                      <th scope="col" class="px-6">Category</th>
                    </tr>
                  </thead>
                  
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Report an issue modal -->
      <modal-request-payout :show="request_modal" @hide="toggleRequestModal" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      request_modal: false,
      search: '',
      status: '',
      org: [],
      payouts: require('@/static/json/payouts.json'),
    }
  },
  computed: {
    ...mapState({
      title: (state) => state.app.pageTitle,
      allOrgData: (state) => state.auth.allOrg,
    })},
  watch: {
  allOrgData(newValue, oldValue){
      console.log(newValue, '100');
    },
  },
  mounted(){
    // fetch org
    this.$store.dispatch('auth/fetchAllOrganization');
  },
  methods: {
    toggleRequestModal() {
      this.request_modal = !this.request_modal
    },
  },
}
</script>
