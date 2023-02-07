<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <v-nav-title><span class="text-blue-600">Donors</span></v-nav-title>
          <div class="flex-grow">
            <v-search
              v-model="search"
              placeholder="Search Donations, Donor ID"
            />
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="flex mt-3">
          <div class="flex flex-wrap flex-row flex-grow gap-5">
            <v-filter v-model="status" label="Status" :filters="filters" />
            <v-filter v-model="channel" label="Channel" :filters="channel_filters" />
            <!-- <v-filter v-model="interval" label="Interval" :filters="filters" /> -->
            <v-filter
              v-model="data_range"
              label="Date Range"
              :filters="filters"
            />
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
                      <th scope="col" class="pr-6">Last donated</th>
                      <th scope="col" class="px-6">Donor name</th>
                      <th scope="col" class="px-6">No of donation</th>
                      <th scope="col" class="px-6">Amount donated</th>
                      <th scope="col" class="px-6">Total donated</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="(dono, index) in donations"
                      :key="index"
                      class="cursor-pointer"
                      @click.prevent="
                        $router.push('/donors/' + dono.total_donated)
                      "
                    >
                      <td class="pr-6">
                        <div class="text-base text-gray-500">
                          {{ dono.last_donated }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ dono.name }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base text-gray-500">
                          {{ dono.total_donated }} Donations
                        </div>
                      </td>
                      <td class="px-6 text-base text-gray-500">
                        <span class="font-medium">{{
                          dono.amount_donated
                        }}</span>
                        to Church Alter Re-construction
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ dono.total_amount }}
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
import { filterArray } from '~/utils'
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
      filters: ['Failed payment', 'Success payment'],
      donations: require('@/static/json/donors.json'),
      donationsCopy: require('@/static/json/donors.json'),
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
   methods: {
    filterChangeHandler(status) {
      this.filter_no_scroll = status
    },
    filterFunction () {
       this.donations = filterArray(this.donations, this.filterOption)
    },
    setInput(data) {
      if(this.filters.includes(data)){
        this.filterOption = [{key: 'status', value: data}];
      } else {
        this.donations = [...this.donationsCopy];
      }
    },
  },
}
</script>
