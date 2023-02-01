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

        <div v-if="campaign" class="campaign_row mb10 flex_row">
          <div class="mb3 m10 sm10" v-for="(item, i) in campaigns" :key="i">
              <div class="bg-white h-[596px] w-full 2xl:max-w-[400px] xl:max-w-[385px] ">
                <a :href="'/campaigns/preview/'+ item.id">
                <img class="w-full h-[265px]" :src="item.image" alt="" />
                </a>
                <div class="w-full p-5 py-3">
                  <a :href="'/campaigns/preview/'+ item.id">
                  <h5 class="text-base font-bold mb-2">
                    {{item.title}}
                  </h5>
                  <div class="flex items-start mb-2">
                    <img class="w-10 h-10 rounded-full" :src='item.organisation.logo' alt="" />
                    <div class="ml-3">
                      <p class="font-bold text-sm">
                        {{item.organisation.name}}
                      </p>
                      <p class="text-xs text-[#9598A3]">{{item.organisation.category}}</p>
                    </div>
                  </div>
                  <p class="text-sm font-bold ml-auto text-right text-[#575B68]">
                    {{item.lapsed }}
                  </p>
                  <p class="text-xs font-normal text-[#575B68] mb-2">
                    {{item.created_day}}
                  </p>
                  </a>
                  <div class="flex items-center mb-2">
                    <img class="w-5 mr-3" src="/icon/tag.svg" alt="" />
                    <p class="text-[14px] font-light text-[#575B68]">
                      {{item?.campaign_type}}
                    </p>
                  </div>

                  <div class="my-4 w-full">
                    <progress-bar
                      bar-color="#26B872"
                      :val="item.percentage"
                      size="12"
                    ></progress-bar>
                    <p class="text-sm font-normal text-[#575B68] mt-1">
                      {{item.campaign_target}} target goal
                    </p>
                  </div>

                  <div class="flex flex-col items-center px-5">
                    <p
                      class="
                        h-[48px]
                        w-full
                        mb-2
                        font-semibold
                        flex
                        items-center
                        justify-center
                        px-10
                        bg-[#006696]
                        text-white text-sm
                      "
                      :id="item.id"
                      @click="handlePopUp"
                    >
                      Donate Now
                    </p>
                    <div class="flex items-center">
                      <img class="w-7 mr-2" src="/icon/people.svg" alt="" />
                      <p class="text-sm font-normal text-[#0396C2]">
                        {{item.donor_count}} people have donation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <organization-grid v-if="nonProfits"></organization-grid>
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
          <a href="/signup">
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
            </a>
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
    <!-- Edit donation modal -->
      <modal-make-donation :show="edit_modal" :campaign_id="campaign_id" @hide="toggleEditModal" />
  </div>
</template>
<script>
import ProgressBar from 'vue-simple-progress';
import { mapState } from 'vuex';
export default {
  layout: 'landing',
  scrollToTop: true,
  data() {
    return {
      show: false,
      items: 10,
       loading: false,
      campaigns: [],
      edit_modal: false,
      filter_no_scroll: false,
      campaign: true,
      campaign_id: '',
      nonProfits: false,
      status: '',
      filters: ['Failed payment', 'Success payment'],
    }
  },

  computed: {
      ...mapState({
      campData: (state) => state.app.allCampaign,
    })
  },

  created() {
    this.$store.commit('app/SET_PAGE_TITLE', 'Home')
  },
  watch: {
    campData(newValue, oldValue){
      console.log(newValue);
      const d = new Date();
      const today = d.getDate();
      const daysLeft = (startDate, endDate) => {
          startDate = new Date(startDate);
          endDate =  new Date(endDate);
          const millisecondsPerDay = 1000 * 60 * 60 * 24;
          const startDateUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
          const endDateUTC = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
          return Math.floor((endDateUTC - startDateUTC) / millisecondsPerDay);
          };
      const reformat = newValue.map((n)=>{
        let {
          end_date,
          start_date,
          campaign_target,
          total_donated,
          } = n;
          let number = Number(campaign_target.replace(/[^0-9.-]+/g,""));
          const percentage = (total_donated/number) * 100;
          // calculate to see expired date
          const dayCheck = daysLeft(start_date, end_date);
          const created_day = parseInt(dayCheck) == today ? "Today": parseInt(dayCheck) + ' days ago';
          let lapsed = dayCheck + ' days left';
          lapsed = (parseInt(dayCheck) < 0) ? 'expired': lapsed;
          return {created_day, lapsed, percentage, ...n};
      })
     this.campaigns = reformat;
     }
  },
  mounted(){
    // fetch campaign
    this.$store.dispatch('app/fetchAllCampaign');
  },

  methods: {
    filterChangeHandler(status) {
      this.filter_no_scroll = status
    },
    handlePopUp(ev) {
      const id = ev.target.id;
      this.campaign_id = id;
      this.edit_modal = !this.edit_modal;
    },
    toggleEditModal(value) {
      this.campaign_id = value;
      this.edit_modal = !this.edit_modal;
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

.campaign_row {
  justify-content: space-between;
}

</style>
