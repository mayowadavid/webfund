<template>
  <div class="w-full">
    <div class="w-full bg-gradient-to-b from-[#E1F7FE] to-[#E1F7FE33] pb-10">
      <Navbar transparent />
      <div class="container mx-auto px-4 sm:px-5 lg:px-10">
        <div class="mt-16 mb-10 flex flex-col items-center">
          <p class="text-2xl font-bold text-[#2B384C]">Crowdfunding</p>
          <div class="flex my-8">
            <button
              class="
                h-14
                md:px-20 px-7
                py-5
                rounded-l-[35px]
                border border-[#0396C2]
                text-[#0396C2] md:text-lg text-base
                font-bold
                flex
                items-center
                justify-center
              "
              :class="[campaign ? 'active-btn' : '']"
              @click="toggleTab"
            >
              Campaigns
            </button>
            <button
              class="
                h-14
                md:px-20 px-7
                py-5
                rounded-r-[35px]
                border border-[#0396C2]
                text-[#0396C2] md:text-lg text-base
                font-bold
                flex
                items-center
                justify-center
              "
              :class="[nonProfits ? 'active-btn' : '']"
              @click="toggleTab"
            >
              Non-Profits
            </button>
          </div>
          <v-filter
            v-model="status"
            label="Filter"
            :filters="filters"
            @toggle="filterChangeHandler"
          />
        </div>

        <slider v-if="campaign" title="Top Fundraising"> </slider>
        <organization-grid v-if="nonProfits"></organization-grid>
      </div>
    </div>

    <div v-if="campaign" class="w-full bg-gradient-to-b from-[#fff] to-[#E1F7FE] py-10">
      <div class="container mx-auto px-4 sm:px-5 lg:px-10">
        <slider title="Closing Campaign"> </slider>
      </div>
    </div>
    
    <div class="w-full bg-[#006696] py-20 px-5 md:px-16">
      <div class="bg-white xl:max-w-[1200px] lg:max-w-[900px] p-10 text-center mx-auto">
        <h3 class="text-3xl font-bold text-[#2B384C] mb-8">
          Sign up for free and get started
        </h3>
        <p class="text-base text-center text-[#575B68] font-light mb-5 max-w-[31rem] mx-auto">
          Convert online donors with smart donation forms augmented with the latest digital techniques. Full flexibility so you look like a pro
        </p>
        <div class="flex items-center justify-center mx-auto">
          <button
              class="
                h-10 w-32
                broder-0 bg-[#006696]
                text-white text-sm
                font-semibold
                flex
                items-center
                justify-center
              "
            >
              Get Started
            </button>
            <button
              class="
                h-10 w-32 ml-2
                border border-[#0396C2]
                text-[#0396C2] text-sm
                font-semibold
                flex
                items-center
                justify-center
              "
            >
              Learn more
            </button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  layout: 'landing',

  data() {
    return {
      items: 10,
      filter_no_scroll: false,
      campaign: true,
      nonProfits: false,
      status: '',
      filters: ['Failed payment', 'Success payment'],
    }
  },

  created() {
    this.$store.commit('app/SET_PAGE_TITLE', 'Home')
  },

  methods: {
    filterChangeHandler(status) {
      this.filter_no_scroll = status
    },
    toggleTab() {
      this.campaign = !this.campaign
      this.nonProfits = !this.nonProfits
    },
  },
}
</script>

<style>
.active-btn {
  background: #0396c2;
  color: #fff;
}
</style>