<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <v-nav-title
            ><span class="text-blue-600">Campaigns</span></v-nav-title
          >
          <div class="flex-grow">
            <v-search
              v-model="search"
              placeholder="Search campaign, member ID"
            />
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mb-3 mt-3" />
        <div class="flex flex-wrap mt-3">
          <div class="flex flex-ro flex-wrap flex-grow gap-5 mr-8 md:mb-0 mb-4">
            <v-filter v-model="status" label="Status" :filters="filters" />
            <!-- <v-filter v-model="channel" label="Channel" :filters="filters" /> -->
            <!-- <v-filter v-model="interval" label="Interval" :filters="filters" /> -->
            <v-filter
              v-model="data_range"
              label="Date Range"
              :filters="filters"
            />
          </div>
          <v-button
            class="flex"
            size="sm"
            type="button"
            @click.prevent="$router.push('/campaigns/start-a-campaign')"
          >
            <svg
              class="text-white mr-3 my-auto"
              width="24"
              height="20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.355 17.074a.483.483 0 00.439-.052.472.472 0 00.206-.39V1.474a.472.472 0 00-.645-.442L6.121 5.737H2.895C1.85 5.737 1 6.587 1 7.632v2.842c0 1.045.85 1.895 1.895 1.895h1.01l.89 6.224a.474.474 0 00.468.407h2.842a.47.47 0 00.47-.527L7.97 13.08l10.385 3.994zm-12.68.979l-.813-5.684h1.26l.852.327.6 5.357h-1.9zm12.377-2.111L6.684 11.569V6.537l11.368-4.373v13.778zM1.947 7.632c0-.523.425-.947.948-.947h2.842v4.736H2.895a.948.948 0 01-.948-.947V7.632zm18.08-1.159a.473.473 0 00.656.132l2.842-1.895A.473.473 0 1023 3.922l-2.842 1.895a.473.473 0 00-.132.656zm3.236 8.738a.47.47 0 01-.263-.08l-2.842-1.895a.474.474 0 01.525-.788l2.842 1.895a.474.474 0 01-.262.868zM20.42 10h2.842a.474.474 0 000-.948h-2.841a.474.474 0 000 .947z"
                fill="currentColor"
              />
            </svg>
            <span class="flex-inline my-auto">Add a campaign</span>
          </v-button>
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
                      <th scope="col" class="pr-6">Status</th>
                      <th scope="col" class="px-6">Campaign title</th>
                      <th scope="col" class="px-6">Type</th>
                      <th scope="col" class="px-6">No of donors</th>
                      <th scope="col" class="px-6">Amount donated</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="(dona, index) in campaigns"
                      :key="index"
                      class="cursor-pointer"
                      @click.prevent="$router.push('/campaigns/' + dona.id)"
                    >
                      <td class="pr-6">
                        <span
                          class="status capitalize"
                          :class="{
                            success: dona.status === 'active',
                            primary: dona.status === 'completed',
                            warning: dona.status === 'draft',
                          }"
                        >
                          {{ dona.status }}
                        </span>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ dona.title }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base text-gray-500">
                          {{ dona.campaign_type }}
                        </div>
                      </td>
                      <td class="px-6 text-base text-gray-500">
                        {{ dona.donor_count }}
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ dona.total_donated }}
                        </div>
                      </td>
                    </tr>
                    <no-table-data
                      v-if="!campaigns || !campaigns.length"
                      title="Add a Campaign"
                      description="Please add a new campaign to start seeing data here"
                    />
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
      channel: '',
      interval: '',
      data_range: '',
      filters: ['Failed ', 'Success'],
      campaigns: [],
    }
  },
  computed: {
      ...mapState({
      campData: (state) => state.app.allCampaign,
    })
  },
   watch: {
    campData(newValue, oldValue){
      console.log(newValue)
     this.campaigns = newValue;
     }
  },
  mounted(){
    // fetch campaign
    this.$store.dispatch('app/fetchAllCampaign');
  }
}
</script>
