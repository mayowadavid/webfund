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
      <div class="container mx-auto px-4 sm:px-5 lg:px-10">
        <slider v-if="campaign" title="Top Fundraising"> </slider>
        <organization-grid v-if="nonProfits"></organization-grid>
      </div>
    </div>

    <div v-if="campaign" class="w-full bg-gradient-to-b from-[#fff] to-[#E1F7FE] py-10">
      <div class="container mx-auto px-4 sm:px-5 lg:px-10">
        <slider title="Closing Campaign"> </slider>
      </div>
    </div>
    <div class="middle_content space px-4 sm:px-5 lg:px-10">
        <div class="headers_content px-4 sm:px-5 lg:px-10">
            <p class="mb5 m10 sm10">
                Delight customers with a seamless donations experience
            </p>
        </div>
        <div class="body_content mb8 flex_row px-4 sm:px-5 lg:px-10">
            <p class="mb45 m10">Converts online donors with smart donation forms
                augnmented with the latest digital techniques.
                Full flexibility so you look like a pro
            </p>
            <p class="mb45 m10">Converts online donors with smart donation forms
                augnmented with the latest digital techniques.
                Full flexibility so you look like a pro
            </p>
        </div>
        <div class="middle_button space mb10 flex_row px-4 sm:px-5 lg:px-10">
            <div class="middle_but active">
                <p>Crowdfunding</p>
            </div>
            <div class="middle_but">
                <p>Secure donations</p>
            </div>
            <div class="middle_but">
                <p>Manage teams</p>
            </div>
        </div>
        <div class="call_to_action mb10 flex_row px-4 sm:px-5 lg:px-10">
            <div class="side_action flex_col mb5 m10 sm10 px-4 sm:px-5 lg:px-10">
                <div class="action_content">
                    <p class="m10 sm10">Modernize your donations</p>
                    <p class="m10 sm10">Convert online donors with smart donation
                        forms augmented with the latest digitaltechniques.
                        Full flexibility so you look like a pro
                    </p>
                </div>
                <div class="action_button">
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
                      Donation form
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
            <div class="side_action sm-tp1 m-tp1 flex_col mb5 m10 sm10 px-4 sm:px-5 lg:px-10">
                <div class="action_form_wrapper sm10 m10 right_form mb8 shadows">
                    <div class="action_outer_wrap flex_col">
                        <div class="first_action_layer m7 sm7 mb85 shadows">
                            <div class="donation_form_wrapper reset flex_col">
                                <p>Redeem church offering</p>
                                <div class="flex mb-space tag_mb items-center mb10">
                                  <img class="w-5 mr-3" src="/icon/tag.svg" alt="" />
                                  <p class="text-[14px] font-light text-[#575B68]">
                                    Offering
                                  </p>
                                </div>
                                <div class="flex mb-space mb10 items-center">
                                  <a
                                    class="
                                      h-10
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
                                    href='/campaigns/preview/'
                                  >
                                    Donate
                                  </a>
                                </div>
                                <div class="org_content mb-space mb10 flex_row">
                                    <div class="org_avatar flex_row mb15">
                                        <img src="/rccg.png" alt="" srcset="">
                                    </div>
                                    <div class="org_con_col mb85 reset flex_col">
                                        <p>Redeem Christian Church of God</p>
                                        <p>Donation organizer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="report_campaign name mb7 flex_row">
                            <p>Report this campaign</p>
                        </div>
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
     <div class="support_showcase space sm-off m-off mb8 px-4 sm:px-5 lg:px-10 flex_row">
            <img src="/business day.png" alt="" srcset="">
            <img src="/guardian.png" alt="" srcset="">
            <img src="/press-release.png" alt="" srcset="">
            <img src="/punch.jpg" alt="" srcset="">
            <img src="/this day.png" alt="" srcset="">
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
      paragragphOne: 'Payments infrastructure for fundraising and donations',
      paragragphTwo: 'Connecting a population of over 100 millions of Nigerians that has been financially excluded to the crowd of donors for their unexpected and urgent financial need'
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

.paragraph {
    width: 50%;
    gap: 30px;
}

.paragraph > p:first-child {
    font-size: clamp(15px, 5vw, 45px);
    margin: 0;
    color: rgba(0, 102, 150, var(--tw-border-opacity));
    font-weight: bold;
    text-align: center;
}

.paragraph > p:last-child {
    font-size: clamp(8px, 5vw, 16px);
    font-weight: 300;
    color: rgb(80, 77, 77);
    text-align: center;
    width: 67%;
}

.space {
  padding: 65px 0;
}

.mb-space {
  padding: 4px 0;
}

.tag_mb {
  border-bottom: 2px solid rgb(235 230 230);
}

.headers_content {
    padding-bottom: 30px;
}

.headers_content > p {
    font-size: clamp(15px, 5vw, 45px);
    margin: 0;
    color: rgb(15, 148, 209);
    font-weight: bold;
}

.body_content {
    justify-content: space-between;
}

.body_content > p {
    font-size: clamp(8px, 5vw, 16px);
    color: black;
    font-weight: 300;
}

.middle_button {
    gap: 30px;
    justify-content: center;
}

.active {
    background-color: rgb(15, 148, 209);
    border-radius: 25px;
    padding: 8px 20px;
}

.middle_but > p {
    font-weight: 300;
    font-size: clamp(8px, 5vw, 16px);
    text-align: center;
    color: #000;
}

.active > p {
    color: #fff;
}

.action_button {
  display: flex;
  justify-content: flex-start !important;
  margin-right: auto;
  margin-top: 30px;
}

.support_showcase {
    gap: 25px;
    margin: 0 auto;
}

.support_showcase > img {
    width: 15%;
    height: 35px;
    object-fit: contain;
}
</style>
