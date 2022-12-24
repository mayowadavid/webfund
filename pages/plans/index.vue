<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <v-nav-title><span class="text-blue-600">Plans</span></v-nav-title>
          <div class="flex-grow">
            <v-search v-model="search" placeholder="Search plans" />
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="flex mt-3">
          <div class="flex flex-row flex-grow gap-5 mr-10">
            <v-filter v-model="status" label="Status" :filters="filters" />
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
            @click.prevent="toggleAddModal"
          >
            <svg
              class="text-white mr-3 my-auto"
              width="25"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M5.5 16h14M10.5 19h4"
                  stroke="currentColor"
                  stroke-width="1.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <rect
                  x="4.5"
                  y="2"
                  width="16"
                  height="20"
                  rx="2"
                  stroke="currentColor"
                  stroke-width="1.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <circle
                  cx="12.5"
                  cy="9"
                  r="3.35"
                  stroke="currentColor"
                  stroke-width="1.3"
                />
                <path
                  d="M20.5 4.35a.65.65 0 100 1.3v-1.3zm0 14a.65.65 0 100 1.3v-1.3zm0-12.7h2v-1.3h-2v1.3zm2.35.35v12h1.3V6h-1.3zm-.35 12.35h-2v1.3h2v-1.3zm.35-.35a.35.35 0 01-.35.35v1.3A1.65 1.65 0 0024.15 18h-1.3zM22.5 5.65a.35.35 0 01.35.35h1.3a1.65 1.65 0 00-1.65-1.65v1.3zM4.114 4.35a.65.65 0 010 1.3v-1.3zm.386 14a.65.65 0 110 1.3v-1.3zm-.386-12.7H2.5v-1.3h1.614v1.3zM2.15 6v12H.85V6h1.3zm.35 12.35h2v1.3h-2v-1.3zM2.15 18c0 .193.157.35.35.35v1.3A1.65 1.65 0 01.85 18h1.3zM2.5 5.65a.35.35 0 00-.35.35H.85c0-.911.739-1.65 1.65-1.65v1.3z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <path
                    fill="currentColor"
                    transform="translate(.5)"
                    d="M0 0h24v24H0z"
                  />
                </clipPath>
              </defs>
            </svg>
            <span class="flex-inline my-auto">Add plan</span>
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
                      <th scope="col" class="px-6">Plan name</th>
                      <th scope="col" class="px-6">Plan Interval</th>
                      <th scope="col" class="px-6">Plan Amount</th>
                      <th scope="col" class="px-6">Plan Id</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="(dona, index) in plans"
                      :key="index"
                      class="cursor-pointer"
                      @click.prevent="$router.push('/plans/' + index)"
                    >
                      <td class="pr-6">
                        <span
                          class="status capitalize"
                          :class="{
                            success: dona.status === 'active',
                            warning: dona.status === 'inactive',
                            danger: dona.status === 'canceled',
                          }"
                        >
                          {{ dona.status }}
                        </span>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ dona.name }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ dona.interval }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base text-gray-500">
                          {{ dona.amount }}
                        </div>
                      </td>
                      <td class="px-6">
                        <div class="text-base font-medium text-gray-900">
                          {{ dona.id }}
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
      <!-- Add plan modal -->
      <modal-add-plan :show="plan_modal" @hide="toggleAddModal" />
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
      plan_modal: false,
      search: '',
      status: '',
      channel: '',
      interval: '',
      data_range: '',
      filters: ['Active', 'Canceled'],
      plans: [],
    }
  },
  computed: {
      ...mapState({
      orgPlans: (state) => state.app.plans,
    })
  },
  watch: {
    orgPlans(newValue, oldValue){
      console.log(newValue)
      this.plans = newValue;
    }
  },
  mounted() {
    // reset errors
    this.$store.commit('app/SET_FORM_ERRORS', false)

    // fetch org
    this.$store.dispatch('app/fetchPlan');
  },
  methods: {
    toggleAddModal() {
      this.plan_modal = !this.plan_modal;
    },
  },
}
</script>
