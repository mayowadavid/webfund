<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile />
    <div class="px-6 md:px-6 lg:px-10 xl:px-16">
      <topbar-progress
        :title="`Hi, ${user.fullname}`"
        sub-title="Whether you're just starting out or ready to grow your nonprofit's fundraising, we've got it covered."
        progress="4"
        class="mb-6 md:mb-12"
        hide-progress
      />
      <div class="tag-wrapper w-full">
        <v-tabs :items="tabs" :active.sync="activeTab">
          <div
            v-for="(tab, index) in tabsData"
            :key="index"
            class="
              tag-content-stat
              flex
              items-center
              divide-x divide-gray-300
              mt-8
            "
          >
            <div class="left-section w-1/2">
              <h3 class="text-gray-700 font-bold">
                {{ tab.total }}
              </h3>
              <p class="text-sm md:text-base text-gray-500 font-medium">
                Total {{ tab.name }}s
              </p>
            </div>
            <div class="right-section w-1/2 pl-6 md:pl-32">
              <h3 class="text-gray-700 font-bold">
                {{ tab.today }}
              </h3>
              <p class="text-sm md:text-base text-gray-500 font-medium">
                Today's {{ tab.name }}s
              </p>
            </div>
          </div>
          <template v-slot:right>
            <button
              class="
                flex
                text-gray-700 text-base
                items-center
                md:absolute
                right-0
                space-x-5
                border
                pl-4
                py-2
                pr-4
                focus:outline-none
                border-blue-500
                md:border-gray-600
                justify-self-stretch
              "
            >
              <span class="text-blue-500 md:text-gray-600 font-medium">
                30 Days
              </span>
              <svg
                class="text-blue-500 md:text-gray-600 pointer-events-none"
                width="16"
                height="10"
                viewBox="0 0 16 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.43909 9.12944L15.8272 1.74127C16.0635 1.49668 16.0567 1.10693 15.8121 0.870706C15.5735 0.640258 15.1952 0.640258 14.9567 0.870706L8.00381 7.82359L1.05093 0.870706C0.810529 0.630338 0.420774 0.630338 0.180371 0.870706C-0.0599956 1.11115 -0.0599956 1.50086 0.180371 1.74127L7.56853 9.12944C7.80897 9.3698 8.19868 9.3698 8.43909 9.12944Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </template>
        </v-tabs>
        <div class="chart-wrapper mt-10 mb-12">
          <ClientOnly>
            <line-chart
              :data="tab_chart.data"
              :options="tab_chart.options"
              :width="300"
              :height="250"
              :styles="chartStyles"
            />
          </ClientOnly>
        </div>
      </div>
      <div
        class="
          flex flex-col
          md:flex-row
          items-center
          divide-y
          md:divide-x md:divide-y-0
          divide-gray-300
          gap-10
          md:gap-20
          mt-8
          mb-10
        "
      >
        <div class="w-full md:w-1/2">
          <h4 class="mb-4 md:mb-5"><strong>Success rate</strong></h4>
          <ClientOnly>
            <doughnut-chart
              :data="success_rate.data"
              :options="success_rate.options"
              :width="300"
              :styles="chartStyles"
            />
          </ClientOnly>
        </div>
        <div class="w-full md:w-1/2 pt-10 md:pt-0">
          <h4 class="mb-4 md:mb-5 md:pl-12"><strong>Payment issues</strong></h4>
          <ClientOnly>
            <doughnut-chart
              :data="payment_issues.data"
              :options="payment_issues.options"
              :width="300"
              :styles="chartStyles"
            />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  data: () => ({
    activeTab: 0,
    user: {
      fullname: ''
    },
    tabs: ['Donations', 'Campaigns', 'Donor', 'Payout'],
    tabsData: [
      {
        name: 'Donation',
        total: '₦12,231,450',
        today: '₦12,231,450',
      },
      {
        name: 'Campaign',
        total: 20,
        today: 1,
      },
      {
        name: 'Donor',
        total: 200,
        today: 50,
      },
      {
        name: 'Payout',
        total: '₦12,231,450',
        today: '₦431,450',
      },
    ],
  }),

  created() {
    this.$store.commit('app/SET_PAGE_TITLE', 'Dashboard')
  },

  computed: {
    ...mapState({
      title: (state) => state.app.pageTitle,
      orgData: (state) => state.auth.org,
      reportData: (state) => state.auth.report,
    }),
    chartStyles() {
      return {
        maxWidth: '100%',
        position: 'relative',
      }
    },
    tab_chart() {
      return {
        data: {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              label: 'My First Dataset',
              data: [
                100000, 200000, 300000, 300000, 400000, 600000, 900000, 800000,
                500000, 400000, 300000, 200000,
              ],
              fill: true,
              borderColor: '#F5F5F5',
              backgroundColor: ['rgba(245,	245,	245, 0.5)'],
              tension: 0.1,
            },
            {
              label: 'My Second Dataset',
              data: [
                400000, 200000, 600000, 300000, 300000, 900000, 300000, 400000,
                500000, 600000, 700000, 900000,
              ],
              fill: true,
              borderColor: '#F79D33',
              backgroundColor: ['rgba(247,	157,	51, 0.5)'],
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  drawBorder: false,
                },
                ticks: {
                  callback(label) {
                    return label / 1000 + 'k'
                  },
                },
              },
            ],
          },
        },
      }
    },
    success_rate() {
      return {
        data: {
          datasets: [
            {
              data: [88, 12],
              backgroundColor: ['#26B872', '#FFBE48'],
            },
          ],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: ['Successful', 'Processing Error'],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: this.$device.isMobile ? 'bottom' : 'right',
            align: 'center',
            labels: {
              usePointStyle: true,
              boxWidth: 16,
              boxHeight: 16,
              borderRadius: 8,
              padding: 18,
            },
          },
        },
      }
    },
    payment_issues() {
      return {
        data: {
          datasets: [
            {
              data: [2, 1],
              backgroundColor: ['#A00000', '#ED5E3F'],
            },
          ],
          // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: ['Fraud Blocked', 'System Errors'],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: this.$device.isMobile ? 'bottom' : 'right',
            align: 'center',
            labels: {
              usePointStyle: true,
              boxWidth: 16,
              boxHeight: 16,
              borderRadius: 8,
              padding: 18,
            },
          },
        },
      }
    },
  },
  watch: {
  orgData(newValue, oldValue){
      },
  reportData(newValue, oldValue){
  }
    },
  mounted(){
   this.user = {...this.user, ...this.$store.getters['auth/user']};
   // fetch org
    this.$store.dispatch('auth/fetchOrganization');
    // fetch report
    this.$store.dispatch('auth/fetchOrganizationReport');
  },
}
</script>
