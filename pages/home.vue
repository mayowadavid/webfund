<template>
  <div class="w-full">
    <div class="w-full bg-gradient-to-b from-[#E1F7FE] to-[#E1F7FE33] pb-10">
      <Navbar transparent />

      <div class="banner px-4 sm:px-5 lg:px-10">
        <div class="paragraph m8 sm10 flex-wrap flex_col">
          <p class="m10 sm10">{{ paragragphOne }}</p>
          <p class="m10 sm10">{{ paragragphTwo }}</p>
        </div>
        <div class="flex space items-center justify-center mx-auto">
          <a href="/signup">
            <button
              class="h-10 w-32 broder-0 bg-[#006696] text-white text-sm font-semibold flex items-center justify-center"
            >
              Start campaign
            </button>
          </a>
          <a href="/solution">
            <button
              class="h-10 w-32 ml-2 border border-[#0396C2] text-[#0396C2] text-sm font-semibold flex items-center justify-center"
            >
              Learn more
            </button>
          </a>
        </div>
      </div>
      <div class="container mx-auto px-4 sm:px-5 lg:px-10">
        <slider
          v-if="campaigns.length > 0"
          :campaigns="campaigns"
          @donation="toggleEditModal"
          title="Top Fundraising"
        >
        </slider>
        <organization-grid v-if="nonProfits"></organization-grid>
      </div>
    </div>
    <div
      v-if="campaigns.length > 0"
      class="w-full bg-gradient-to-b from-[#fff] to-[#E1F7FE] py-10"
    >
      <div class="container mx-auto px-4 sm:px-5 lg:px-10">
        <slider
          @donation="toggleEditModal"
          :campaigns="campaigns"
          title="Closing Campaign"
        >
        </slider>
      </div>
    </div>
    <div class="middle_content space px-4 sm:px-5 lg:px-10">
      <div class="headers_content px-4 sm:px-5 lg:px-10">
        <p class="mb5 m10 sm10">
          {{ creativeContent[contentIndex].title }}
        </p>
      </div>
      <div class="body_content mb8 flex_row px-4 sm:px-5 lg:px-10">
        <p class="mb45 mb-5 m10">{{ creativeContent[contentIndex].body }}</p>
        <p class="mb45 m10">{{ creativeContent[contentIndex].body }}</p>
      </div>
      <div class="middle_button space mb10 flex_row px-4 sm:px-5 lg:px-10">
        <div
          v-for="(tab, key) in creativeContent"
          :key="key"
          @click="changeContent(key)"
          id="0"
          class="middle_but"
          :class="contentIndex == key && 'active_wrap'"
        >
          <p>{{ tab.name }}</p>
        </div>
        <!-- <div @click="changeContent" id="1" class="middle_but">
                <p>Secure donations</p>
            </div>
            <div @click="changeContent" id="2" class="middle_but">
                <p>Manage teams</p>
            </div> -->
      </div>
      <div class="call_to_action mb10 flex_row px-4 sm:px-5 lg:px-10">
        <div class="side_action flex_col mb5 m10 sm10 px-4 sm:px-5 lg:px-10">
          <div class="action_content">
            <p class="m10 sm10">Modernize your donations</p>
            <p class="m10 sm10">
              Convert online donors with smart donation forms augmented with the
              latest digitaltechniques. Full flexibility so you look like a pro
            </p>
          </div>
          <div class="action_button">
            <a href="/crowdfunding">
              <button
                class="h-10 w-32 broder-0 bg-[#006696] text-white text-sm font-semibold flex items-center justify-center"
              >
                Donation form
              </button>
            </a>
            <a href="/solution">
              <button
                class="h-10 w-32 ml-2 border border-[#0396C2] text-[#0396C2] text-sm font-semibold flex items-center justify-center"
              >
                Learn more
              </button>
            </a>
          </div>
        </div>
        <div
          class="side_action sm-tp1 m-tp1 flex_col mb5 m10 sm10 px-4 sm:px-5 lg:px-10"
        >
          <div class="action_form_wrapper sm10 m10 right_form mb8 shadows">
            <div class="action_outer_wrap flex_col">
              <div class="first_action_layer m10 sm10 mb9 shadows">
                <div class="donation_form_wrapper reset flex_col">
                  <p>Redeem church offering</p>
                  <div class="flex mb-space tag_mb items-center mb10">
                    <img class="w-5 mr-3" src="/icon/tag.svg" alt="" />
                    <p class="text-[14px] font-light text-[#575B68]">
                      Offering
                    </p>
                  </div>
                  <div class="flex mb-space mb10 items-center">
                    <p
                      class="h-10 w-full mb-2 font-semibold flex items-center justify-center px-10 bg-[#006696] text-white text-sm"
                    >
                      Donate
                    </p>
                  </div>
                  <div class="org_content mb-space m10 sm10 mb10 flex_row">
                    <div class="org_avatar flex_row mb15">
                      <img src="/rccg.png" alt="" srcset="" />
                    </div>
                    <div class="org_con_col mb8 reset flex_col">
                      <p>Redeem Christian Church of God</p>
                      <p>Donation organizer</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="report_campaign name mb9 flex_row">
                <p>Report this campaign</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full py-20 px-5 md:px-16">
      <div
        class="bg-white shadows xl:max-w-[1200px] lg:max-w-[900px] p-10 text-center mx-auto"
      >
        <h3 class="text-3xl font-bold text-[#2B384C] mb-8">
          Sign up for free and get started
        </h3>
        <p
          class="text-base text-center text-[#575B68] font-light mb-5 max-w-[31rem] mx-auto"
        >
          Convert online donors with smart donation forms augmented with the
          latest digital techniques. Full flexibility so you look like a pro
        </p>
        <div class="flex items-center justify-center mx-auto">
          <a href="/signup">
            <button
              class="h-10 w-32 broder-0 bg-[#006696] text-white text-sm font-semibold flex items-center justify-center"
            >
              Get Started
            </button>
          </a>
          <a href="/solution">
            <button
              class="h-10 w-32 ml-2 border border-[#0396C2] text-[#0396C2] text-sm font-semibold flex items-center justify-center"
            >
              Learn more
            </button>
          </a>
        </div>
      </div>
    </div>
    <div
      class="support_showcase space sm-off m-off mb8 px-4 sm:px-5 lg:px-10 flex_row"
    >
      <img src="/business day.png" alt="" srcset="" />
      <img src="/guardian.png" alt="" srcset="" />
      <img src="/press-release.png" alt="" srcset="" />
      <img src="/punch.jpg" alt="" srcset="" />
      <img src="/this day.png" alt="" srcset="" />
    </div>
    <!-- Edit donation modal -->
    <modal-make-donation
      :show="edit_modal"
      :campaign_id="campaign_id"
      @hide="toggleEditModal"
    />
  </div>
</template>
<script>
export default {
  layout: 'landing',
  scrollToTop: true,
  data() {
    return {
      loading: false,
      items: 10,
      edit_modal: false,
      filter_no_scroll: false,
      campaigns: [],
      campaign_id: '',
      nonProfits: false,
      status: '',
      contentIndex: 0,
      creativeContent: [
        {
          title: 'Delight customers with a seamless donations experience',
          name: 'Crowdfunding',
          body: 'Converts online donors with smart donation forms augnmented with the latest digital techniques. Full flexibility so you look like a pro',
        },
        {
          title: 'Receive Donations from your Donors Securely',
          name: 'Secure donations',
          body: 'together with our partner, we have created a secure gateway for you to collect your donations without fear of fraud or security breach. We have chosen the best possible partners to ensure your details and that of your funds are secure from any digital breach.',
        },
        {
          title: 'Effectively invite and manage your team members',
          name: 'Manage Teams',
          body: 'Our platform makes it easy for you to invite your team members for various roles as required for your non-profits to be successful',
        },
      ],
      filters: ['Failed payment', 'Success payment'],
      paragragphOne: 'Payments infrastructure for fundraising and donations',
      paragragphTwo:
        'Connecting a population of over 100 millions of Nigerians that has been financially excluded to the crowd of donors for their unexpected and urgent financial need',
    }
  },
  created() {
    this.$store.commit('app/SET_PAGE_TITLE', 'Home')
  },
  async mounted() {
    // fetch campaign
    const res = await this.$store.dispatch('app/fetchAllCampaign')
    if (res) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const day = today.getDate();
      const today_date = year + '-' + ("0" + (month + 1)).slice(-2) + '-' + ("0" + day).slice(-2);
      const daysLeft = (startDate, endDate) => {
        startDate = new Date(startDate)
        endDate = new Date(endDate)
        const millisecondsPerDay = 1000 * 60 * 60 * 24
        const startDateUTC = Date.UTC(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        )
        const endDateUTC = Date.UTC(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate()
        )
        return Math.floor((endDateUTC - startDateUTC) / millisecondsPerDay)
      }
      const reformat = res.map((n, i) => {
        let { end_date, start_date, campaign_target, total_donated } = n
        let number = Number(campaign_target.replace(/[^0-9.-]+/g, ''))
        const percentage = (total_donated / number) * 100
        // calculate to see expired date
        const dayCheck = daysLeft(start_date, end_date)
        const current = daysLeft(start_date, today_date)
        const created_day =
          start_date == today_date
            ? 'Today'
            : parseInt(current) + ' days ago'
        let lapsed = dayCheck + ' days left'
        lapsed = parseInt(dayCheck) < 0 ? 'expired' : lapsed
        return { created_day, lapsed, percentage, ...n }
      })
      this.campaigns = reformat
    }
  },
  methods: {
    filterChangeHandler(status) {
      this.filter_no_scroll = status
    },
    toggleEditModal(value) {
      this.campaign_id = value
      this.edit_modal = !this.edit_modal
    },
    toggleTab() {
      this.campaign = !this.campaign
      this.nonProfits = !this.nonProfits
    },
    changeContent(value) {
      this.contentIndex = value
    },
  },
}
</script>
