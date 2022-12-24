<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <div class="flex-grow">
            <v-nav-title show-back-button>
              <span class="text-blue-600">View donor details</span>
            </v-nav-title>
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="shadow-lg border border-gray-200 px-6 py-5 mt-6">
          <div class="flex flex-row gap-28">
            <div>
              <div class="text-base text-gray-500 md:mb-2">First Name</div>
              <div class="text-base text-gray-800 font-medium">
                James Blunt Black
              </div>
            </div>
            <div>
              <div class="text-base text-gray-500 md:mb-2">Email Address</div>
              <div class="text-base text-gray-800 font-medium">
                jamesblunt@gmail.com
              </div>
            </div>
            <div>
              <div class="text-base text-gray-500 md:mb-2">No of donations</div>
              <div class="text-base text-gray-800 font-medium">7 Donations</div>
            </div>
            <div>
              <div class="text-base text-gray-500 md:mb-2">
                Total amount donated
              </div>
              <div class="text-base text-gray-800 font-medium">₦259,000</div>
            </div>
            <div class="my-auto ml-auto">
              <v-button
                size="sm"
                type="button"
                :outline="true"
                @click.prevent="$router.push('/donors/view/' + 1)"
              >
                View details
              </v-button>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <h5 class="text-lg md:text-2xl font-semibold text-gray-800">
            Donations
          </h5>
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
                      <th scope="col" class="px-6">Donation date</th>
                      <th scope="col" class="px-6">Donor name</th>
                      <th scope="col" class="px-6">Donation type</th>
                      <th scope="col" class="px-6">Channel</th>
                      <th scope="col" class="px-6">Amount donated</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(dono, index) in donors" :key="index">
                      <td class="pr-6">
                        <span
                          class="status capitalize"
                          :class="{
                            success: dono.status === 'success',
                            danger: dono.status === 'canceled',
                          }"
                        >
                          {{ dono.status }}
                        </span>
                      </td>
                      <td class="px-6">
                        <div class="text-base text-gray-500">
                          {{ dono.date }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ dono.name }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base text-gray-500">
                          {{ dono.type }}
                        </div>
                      </td>
                      <td class="px-6 text-base text-gray-500">
                        <span class="tag pill">{{ dono.channel }}</span>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ dono.amount }}
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
export default {
  layout: 'dashboard',
  scrollToTop: true,

  data() {
    return {
      donors: require('@/static/json/donations.json'),
    }
  },
}
</script>
