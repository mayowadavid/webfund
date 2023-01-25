<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification show-back-button />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title show-back-button>Team Member</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="shadow-lg border border-gray-200 px-6 py-5 mt-6">
          <div
            class="
              relative
              flex flex-col
              md:flex-row
              gap-x-10
              lg:gap-x-28
              gap-y-4
            "
          >
            <div>
              <div class="text-sm md:text-base text-gray-500 md:mb-2">
                Full Name
              </div>
              <div class="text-sm md:text-base text-gray-800 font-medium">
                {{team?.fullname}}
              </div>
            </div>
            <div>
              <div class="text-sm md:text-base text-gray-500 md:mb-2">
                Email Address
              </div>
              <div class="text-sm md:text-base text-gray-800 font-medium">
                {{team?.email}}
              </div>
            </div>
            <div class="absolute md:relative my-auto ml-auto right-0">
              <v-button
                size="sm"
                type="button"
                :outline="true"
                @click.prevent="
                  $router.push('/settings/teams/edit/' + $route.params.id)
                "
              >
                Edit<span class="hidden md:inline"> Details</span>
              </v-button>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <h5 class="text-lg md:text-2xl font-semibold text-gray-800">
            Activity Log
          </h5>
        </div>
        <div class="flex flex-col mt-3">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div class="overflow-hidden">
                <div
                  class="flex flex-col"
                  v-if="
                    activity_log &&
                    activity_log.data &&
                    activity_log.data.length
                  "
                >
                  <div class="flex flex-col" v-if="$device.isMobile">
                    <div
                      v-for="(log, index) in activity_log.data"
                      :key="index"
                      @click.prevent="$router.push('/settings/teams/' + log.id)"
                      class="flex flex-row border-t border-gray-300 pt-4 pb-3"
                    >
                      <div class="flex flex-col flex-auto gap-y-1">
                        <div class="text-sm text-gray-500">
                          {{ log.last_seen || 'N/A' }}
                        </div>
                        <div class="text-sm text-gray-900">
                          {{ log.activity }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <table v-else>
                    <thead>
                      <tr>
                        <th scope="col" class="pr-6">Last seen</th>
                        <th scope="col" class="px-6">Activity</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(log, key) in activity_log" :key="key">
                        <td class="pr-6">
                          <div class="text-base text-gray-500">
                            {{ log.last_seen }}
                          </div>
                        </td>
                        <td class="px-6">
                          <div class="text-base font-medium text-gray-900">
                            {{ log.activity }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <no-table-data
                  v-else
                  title="Activity Log"
                  description="There's been no log"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  scrollToTop: true,

  async mounted() {
    // fetch teams
    const res = await this.$store.dispatch('auth/fetchTeam', this.$route.params.id);
    if(res){
        this.team = res.team_member;
    }
  },

  validate({ params }) {
    return params.id
  },

  data() {
    return {
      team: null,
      activity_log: require('@/static/json/activity-log.json'),
    }
  },
}
</script>
