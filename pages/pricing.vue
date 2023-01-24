<template>
  <div class="w-full">
    <div class="w-full bg-gradient-to-b from-[#E1F7FE] to-[#E1F7FE33] pb-10">
      <Navbar transparent />

    <div class="banner px-4 sm:px-5 lg:px-10">
          <div class="paragraph m8 sm10 flex-wrap flex_col">
                <p class="m10 sm10">{{paragragphOne}}</p>
                <p class="m10 sm10">{{paragragphTwo}}</p>
          </div>
          <div class="flex space items-center justify-center mx-auto">
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
                Start campaign
              </button>
              </a>
              <a href="/solution">
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
               </a>
          </div>
    </div>
    <div class="pring_card_row mb10 space px-4 sm:px-5 lg:px-10">
      <div class="pricing_wrapper flex_row px-4 sm:px-5 lg:px-10">
        <div v-for="(item, i) in donationFees" :key="i" :class="item.active == true ? ' active_card price_card m-tp1 m10 sm10 shadows mb3': `price_card m-tp1 m10 sm10 shadows mb3`">
            <div :class="item.active == true ? ' active_p price_title flex_row' : 'price_title flex_row'">
                <p>{{item.name}}</p>
            </div>
            <div :class="item.active == true ? 'active_p price_percent flex_row': 'price_percent flex_row'">
                <p>{{item.rate}}</p>
            </div>
            <div v-for="(name, index) in item.options" :key="index" class="price_footer flex_row">
                <div :class="item.active == true ? 'active_p price_option m10 sm10 mb5 flex_row' : 'price_option m10 sm10 mb5 flex_row'">
                    <img src="/check.png" alt="" srcset="">
                    <p>{{name}}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    <div class="pricing_calculator space px-4 sm:px-5 lg:px-10 flex_row mb10">
        <div class="donor_con m10 sm10 px-4 sm:px-5 lg:px-10 mb5 flex_col calculator_detail">
            <p class="mb7 m10 sm10">Enter an amount into the calculator to see our charges</p>
            <p class="mb7 m10 divider">We Understand the importance of what you do andd we are helping you make more
                impact. it does not matter if you are just starting out or not
            </p>
        </div>
        <div class="price_calculator m10 sm10 px-4 sm:px-5 lg:px-10 shadows mb4">
            <div class="charge_title reset_border">
                <p>Wefundx Charges</p>
            </div>
            <div class="charge_option mb-tp5">
              <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="campaign type"
                      rules="required"
                    >
                      <div class="cs-select" :class="classes">
                        <select @change="handleChange" v-model="processOption" class="input">
                          <option defaultValue hidden value="">Processing fee</option>
                          <option
                            v-for="(process, i) in processing"
                            :key="i"
                            :value="process.name"
                          >
                            {{ process.name }}
                          </option>
                        </select>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
              </div>
            </div>
            <div class="form-group mb-5">
              <div>
                <validation-provider
                  v-slot="{ errors, classes }"
                  name="commission_fee"
                  rules="required"
                >
                  <input
                    @change="handleChange"
                    id="input-commission_fee"
                    v-model="amount"
                    class="form-input"
                    :class="classes"
                    placeholder="amount"
                    type="tel"
                  />
                  <span v-show="errors.length" class="is-invalid">
                    {{ errors[0] }}
                  </span>
                </validation-provider>
              </div>
            </div>
            <div class="charge_result mb-space mb-tp5 flex_row">
                <div class="charge_res_wrap mb5">
                    <p>We will settle you</p>
                    <p>{{result || 0}}</p>
                </div>
                <div class="charge_res_wrap flex_col mb5">
                    <p>Wefundx fee</p>
                    <p>{{fee || 0}}</p>
                </div>
            </div>
            <div class="charge_setup mb-tp5 flex_col">
                <div v-for="(item, i) in chargeBenefit" :key="i" class="donor_pay_row set_up_p flex_row mb10">
                    <img src="/check.png" alt="">
                    <p class="mb8">{{item}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="pricing_faq mb10">
            <div class="pricing_faq_wrapper px-4 sm:px-5 lg:px-10 flex_row">
                <div class="faq_title m10 sm10 px-4 sm:px-5 lg:px-10 mb5">
                    <p class="m10 sm10">Frequently Asked Questions</p>
                </div>
                <div class="faq_body m10 sm10 px-4 sm:px-5 lg:px-10 mb5 flex_row">
                    <div class="faq_questions flex_col">
                        <p class="mb-5 m10 sm10">Why Transfer fee to donors?</p>
                        <p class="mb6 m10 sm10 mb-5 mb-tp5">To ensure that the amount intended to be donated is fully directed to our Organisation
                            and to inform donors of the necessary platform fee associated with donations
                        </p>
                    </div>
                    <div class="faq_questions mb-tp5 flex_col">
                        <p class="mb-5 m10">Who cover the processing fee?</p>
                        <p class="mb6 m10 sm10 mb-tp5">When you choose to cover the platform processing fee. the fee is deducted from
                            every successful donation that is completed for your Organisation when you are
                            ready for payout.
                        </p>
                    </div>
                </div>
            </div>
    </div>
    </div>
    <div class="w-full py-20 px-5 md:px-16">
      <div class="bg-white shadows xl:max-w-[1200px] lg:max-w-[900px] p-10 text-center mx-auto">
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
            <a href="/solution">
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
            </a>
        </div>
      </div>
    </div>
     <div class="support_showcase space sm-off m-off mb8 px-4 sm:px-5 lg:px-10 flex_row">
            <img src="/business day.png" alt="" srcset="">
            <img src="/guardian.png" alt="" srcset="">
            <img src="/press-release.png" alt="" srcset="">
            <img src="/punch.jpg" alt="" srcset="">
            <img src="/this day.png" alt="" srcset="">
      </div>
      <!-- Edit donation modal -->
      <modal-make-donation :show="edit_modal" :campaign_id="campaign_id" @hide="toggleEditModal" />
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
      campaign: true,
      campaign_id: '',
      nonProfits: false,
      status: '',
      processOption: '',
      fee: '',
      result: '',
      amount: '',
      donationFees: [
        {name: "Local Donations", rate: "5%", active: false, options: ['cards', 'Bank Transfer', 'USSD', "Bank", 'QR']},
      {name: "Bitcoin", rate: "7%", active: true, options: ['Donate by paying through your bitcoin wallet']},
      {name: 'International Donations', rate: '6.5%', active: false, options: ['cards', 'Bank Transfer', 'USSD', 'Bank', 'QR']}],
      chargeBenefit: ['Zero maintenance fee', 'Free, automatic settlement within 24 hours', 'Volume discounts available', 'No hidden fees or charges'],
      processing: [{name: 'organisation', rate: '5%'}, {name: 'non-profit', rate: '5%'}, {name: 'international', rate: '6%'}],
      filters: ['Failed payment', 'Success payment'],
      paragragphOne: 'Together, we can raise more donations for your organization',
      paragragphTwo: 'we understand the importance of what you do and we are helping you make more impact. it does not matter if you are just starting outvor not'
    }
  },
  created() {
    this.$store.commit('app/SET_PAGE_TITLE', 'Home')
  },

  methods: {
    filterChangeHandler(status) {
      this.filter_no_scroll = status
    },
    handleChange(e){
      if(this.processOption.length > 0){
        this.processing.map((data)=>{
          if(data.name == this.processOption && this.amount.length > 0){
          let rate = data.rate;
          const amount = this.amount;
          rate = parseFloat(rate);
          const balance = (rate/100) * amount;
          this.fee = balance;
          this.result = amount - balance;
          }
        });
      }
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

