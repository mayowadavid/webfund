<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <div class="flex-grow">
            <v-nav-title show-back-button>
              <span class="text-blue-600">View activity</span>
            </v-nav-title>
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 mt-8 md:gap-x-12 lg:gap-x-16">
          <div class="md:col-span-6 lg:col-span-5 space-y-6">
            <div>
              <p class="text-sm text-gray-500 mb-2">User</p>
              <p class="font-medium text-gray-800">{{log.user?.fullname}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Role</p>
              <p class="font-medium text-gray-800">{{log.user?.role}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Email address</p>
              <p class="font-medium text-gray-800">{{log.user?.email}}</p>
            </div>
          </div>
          <div class="md:col-span-6 lg:col-span-5 space-y-6">
            <div>
              <p class="text-sm text-gray-500 mb-2">IP Address</p>
              <p class="font-medium text-gray-800">{{log?.ip_address}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Date</p>
              <p class="font-medium text-gray-800">Sep, 2019 - 21:09 pm</p>
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
  data(){
    return {
    log: {}
    }
  },
  computed: {
      ...mapState({
      logs: (state) => state.app.logs,
    })
  },
  watch: {
    logs(newValue, oldValue){
      this.log = newValue[this.$route.params.id];
      console.log(this.log);
    }
  },
  mounted() {
    // fetch org
    this.$store.dispatch('app/fetchLogs');
  }
}
</script>
