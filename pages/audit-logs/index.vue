<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <v-nav-title
            ><span class="text-blue-600">Audit Logs</span></v-nav-title
          >
          <div class="flex-grow">
            <v-search v-model="search" placeholder="Search logs" />
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="flex mt-3">
          <div class="flex flex-row flex-grow gap-5">
          </div>
        </div>
        <div class="flex flex-col mt-3">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div class="overflow-hidden">
                <table>
                  <thead>
                    <tr>
                      <th scope="col" class="pr-6">Last seen</th>
                      <th scope="col" class="px-6">Activity</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="(dona, index) in logs"
                      :key="index"
                      class="cursor-pointer"
                      @click.prevent="$router.push('/audit-logs/' + index)"
                    >
                      <td class="pr-6">
                        <div class="text-base text-gray-500">
                          Sunday Nov 29, 2020
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{dona.activity}}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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

  data() {
    return {
      search: '',
      status: '',
      data_range: '',
      filters: ['Active', 'Inactive'],
      logs: [],
    }
  },
  computed: {
      ...mapState({
      log: (state) => state.app.logs,
    })
  },
  watch: {
    log(newValue, oldValue){
      console.log(newValue)
      this.logs = newValue;
    }
  },
  mounted() {
    // reset errors
    this.$store.commit('app/SET_FORM_ERRORS', false)

    // fetch org
    this.$store.dispatch('app/fetchLogs');
  },
}
</script>
