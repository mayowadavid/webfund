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
        <div class="tab_wrapper mb10 flex_row">
          <div class="tab_container mb7 flex_row">
              <div
              v-for="(tab, i) in tabControl"
              :key="i"
              @click="handleTab(i)"
              :class="tabIndex == i && 'active_button'"
               class="tab_button menu-btn">
                <p class="md:flex cursor-pointer text-center mr-12 font-medium text-xl text-gray-600">{{tabs[i]}}</p>
              </div>
          </div>
          <div class="mb3 tag_drop">
            <select>
              <option>30 Days</option>
              <option>7 Days</option>
            </select>
          </div>

        </div>
        <hr class="border-gray-300 mx-4 md:mx-0" />
           <div
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
                {{ tabControl[tabIndex]?.total }}
              </h3>
              <p class="text-sm md:text-base text-gray-500 font-medium">
                Total {{ tabs[tabIndex] }}s
              </p>
            </div>
            <div class="right-section w-1/2 pl-6 md:pl-32">
              <h3 class="text-gray-700 font-bold">
                {{ tabControl[tabIndex]?.today }}
              </h3>
              <p class="text-sm md:text-base text-gray-500 font-medium">
                Today's {{ tabs[tabIndex] }}s
              </p>
            </div>
          </div>
        <div
        class="chart-wrapper mt-10 mb-12"
        >
          <ClientOnly>
            <line-chart
              v-if="loaded"
              :data="reportDatas.data"
              :options="reportDatas.options"
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
import { Chart  } from 'chart.js'
export default {
  layout: 'dashboard',
  data: () => ({
    activeTab: 0,
    user: {
      fullname: ''
    },
    loaded: false,
    tabIndex: 0,
    tabs: ['Donation', 'Campaign', 'Donor', 'Payout'],
    tabControl: [],
    reportDatas: {
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
          datasets: [],
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
    },
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
    let { donations, campaign, donors, payout} = newValue;
    const month = donations.month;
    const secmonth = campaign.month;
     const thirdmonth = payout.month;
    let datasets =  [
      {
              label: 'month',
              data: month,
              fill: true,
              borderColor: '#26B872',
              backgroundColor: ['#26B872'],
              tension: 0.1,
      },
      {
              label: 'secmonth',
              data: secmonth,
              fill: true,
              borderColor: '#A00000',
              backgroundColor: ['#A00000'],
              tension: 0.1,
      },
      {
              label: 'thirdmonth',
              data: thirdmonth,
              fill: true,
              borderColor: '#F79D33',
              backgroundColor: ['#F79D33'],
              tension: 0.1,
      },
      ];
    let reportCopy = {...this.reportDatas}
    reportCopy.data.datasets = datasets;
    this.reportDatas = {...reportCopy};
    this.loaded = true;

    // copy donation monthly details and duplicate chart template
    let donation = donations;
    let donor = donors;
    this.tabControl= [donation, campaign, donor, payout];
  }
    },
  mounted(){
   this.user = {...this.user, ...this.$store.getters['auth/user']};
   // fetch org
    this.$store.dispatch('auth/fetchOrganization');
    // fetch report
    this.$store.dispatch('auth/fetchOrganizationReport');
  },
  methods: {
    handleTab(i){
      this.tabIndex = i;
    }
  }
}
</script>
<style>
.tab_button > p {
  padding-bottom: 15px;
}

.active_button > p {
  color: #0396C2;
  border-bottom: 3px solid #0396C2;
}

.tag_drop {
  display: flex;
  justify-content: flex-end;
}

.tag_drop > select {
  padding: 10px 20px;
  border: 2px solid #2b384c;
}

.off {
  display: none;
}

</style>
