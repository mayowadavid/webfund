<template>
  <div class="w-screen lg:w-full h-full overflow-x-hidden">
    <dash-navbar-mobile />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <v-nav-title v-if="!$device.isMobile">
            <span class="text-blue-600">Donations</span>
          </v-nav-title>
          <div class="flex-grow">
            <v-search
              v-model="search"
              placeholder="Search donations, donor ID"
            />
          </div>
          <notifications v-if="!$device.isMobile" />
        </div>
        <hr class="w-full hidden lg:flex mt-3" />

        <div class="relative">
          <div
            class="py-3 -mx-5 px-5 md:mx-0 md:px-0"
            :class="{ 'overflow-x-auto': !filter_no_scroll }"
          >
            <div class="flex flex-row flex-grow gap-x-5 min-w-max pr-5 md:pr-0">
              <v-filter
                v-model="status"
                label="Status"
                :filters="filters"
                @toggle="filterChangeHandler"
              />
              <v-filter
                v-model="channel"
                label="Channel"
                :filters="channel_filters"
                @toggle="filterChangeHandler"
              />
              <!-- <v-filter
                v-model="interval"
                label="Interval"
                :filters="filters"
                @toggle="filterChangeHandler"
              /> -->
              <v-filter
                v-model="data_range"
                label="Date Range"
                :filters="filters"
                @toggle="filterChangeHandler"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
              <div class="overflow-hidden">
                <div
                  class="flex flex-col"
                  v-if="donations && donations.length"
                >
                  <div class="flex flex-col" v-if="$device.isMobile">
                    <div
                      v-for="(donation, index) in donations"
                      :key="index"
                      @click.prevent="
                        $router.push('/donations/' + donation.id)
                      "
                      class="flex flex-row border-t border-gray-300 pt-4 pb-3"
                    >
                      <div class="flex flex-col flex-auto gap-y-1">
                        <div class="text-sm font-medium text-gray-900">
                          {{ donation.donor_name }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ donation.donor_email }}
                        </div>
                        <div class="text-sm font-medium text-gray-900">
                          {{donor.updatedAt}}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ donation.createdAt || 'N/A' }}
                        </div>
                      </div>
                      <div class="text-base text-gray-500">
                        <span class="tag pill mr-auto">{{
                          'N/A'
                        }}</span>
                      </div>
                    </div>
                  </div>
                  <table v-else>
                    <thead>
                      <tr>
                        <th scope="col" class="pr-6">Status</th>
                        <th scope="col" class="px-6">Donation date</th>
                        <th scope="col" class="px-6">Donor name</th>
                        <th scope="col" class="px-6">Donation type</th>
                        <th scope="col" class="px-6">Channel</th>
                        <th scope="col" class="px-6">Amount donated</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr
                        v-for="(dona, index) in donations"
                        :key="index"
                        class="cursor-pointer"
                        @click.prevent="$router.push('/donations/' + 1)"
                      >
                        <td class="pr-6">
                          <span
                            class="status capitalize"
                            :class="{
                              success: dona.status === 'success',
                              danger: dona.status === 'canceled',
                            }"
                          >
                            {{ dona.status }}
                          </span>
                        </td>
                        <td class="px-6">
                          <div class="text-base text-gray-500">
                            {{ dona.createdAt }}
                          </div>
                        </td>
                        <td class="px-6">
                          <div class="text-base font-medium text-gray-900">
                            {{ dona.donor_name }}
                          </div>
                        </td>
                        <td class="px-6">
                          <div class="text-base text-gray-500">
                            {{ dona.donation_type || 'N/A' }}
                          </div>
                        </td>
                        <td class="px-6 text-base text-gray-500">
                          <span class="tag pill">{{ dona.channel }}</span>
                        </td>
                        <td class="px-6">
                          <div class="text-base font-medium text-gray-900">
                            {{ dona.amount }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <no-table-data
                  v-else
                  title="Add a Team Member"
                  description="Please add a new team member to start seeing data here"
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
import { mapState } from 'vuex';
export default {
  layout: 'dashboard',
  scrollToTop: true,
  data() {
    return {
      filter_no_scroll: false,
      search: '',
      status: '',
      adminOrgData: null,
      channel: '',
      interval: '',
      data_range: '',
      filters: ['Failed', 'Success'],
      channel_filters: [
        'Card',
        'Bank',
        'USSD',
        'Transfer',
        'QR Code ',
        'Bitcoin',
      ],
    }
  },
  computed: {
      ...mapState({
      donations: (state) => state.auth.donations,
    })
  },

  created() {
    this.$store.commit('app/SET_PAGE_TITLE', 'Donations')
  },
  mounted(){
    this.adminOrgData = this.$store.getters['auth/adminOrg'];
    this.$store.dispatch('auth/fetchDonations');
  },

  methods: {
    filterChangeHandler(status) {
      this.filter_no_scroll = status
    },
  },
}
</script>
