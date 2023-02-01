<template>
  <div class="w-full">
    <div class="w-full bg-gradient-to-b from-[#E1F7FE] to-[#E1F7FE33] pb-5">
      <Navbar transparent />
      <div class="container mx-auto px-4 sm:px-5 lg:px-10">
        <div class="mt-16 mb-10 flex flex-wrap items-start justify-center">
          <div class="mb-6 flex flex-col items-center justify-center">
            <img class="h-60 w-60 mx-auto" :src="organisation.logo" alt />
          </div>
          <div class="lg:ml-16 md:ml-10 ml-5 max-w-[776px]">
            <h4 class="text-lg font-bold text-[#1E202A] mb-4">
              {{organisation.name}}
            </h4>
            <p class="text-[20px] font-normal text-[#1E202A] mb-5">
              {{organisation.category}}
            </p>
            <p class="text-[20px] font-normal text-[#1E202A] mb-10">
              {{organisation.address}}
            </p>
            <p class="text-[20px] font-normal text-[#1E202A] mb-5">
              {{organisation.description}}
            </p>
            <div class="flex justify-end mt-5">
              <nuxt-link class="text-[#F79D33] font-bold" to="#"
                >Learn More</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="plans.length > 0" class="bg-white w-full py-14">
      <div class="container mx-auto px-4 sm:px-5 lg:px-10">
        <h3 class="text-[#1E202A] font-bold text-lg text-center mb-8">
          Recurring Giving
        </h3>
        <div
          v-if="stage === 'start'"
          class="
            rounded-2xl
            border-2
            max-w-[850px]
            w-full
            p-3
            px-5
            pb-8
            mx-auto
            overflow-x-auto
          "
        >
          <table class="w-full border-0 min-w-[450px]">
            <thead align="center">
              <tr
                align="center"
                class="text-lg text-black font-semibold border-t-0"
              >
                <th class="text-center text-lg">Status</th>
                <th class="text-center text-lg">Plan Name</th>
                <th class="text-center text-lg">Plan Title</th>
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody class="font-medium">
              <tr
               v-for="plan in plans"
                :key="plan.id"
              class="border-b-2">
                <td align="center">
                  <p
                    class="
                      p-1
                      px-2
                      max-w-max
                      bg-[#D0FFE6]
                      rounded-xl
                      text-[#086936] text-sm
                      font-bold
                    "
                  >
                    {{plan.status}}
                  </p>
                </td>
                <td align="center">{{plan.name}}</td>
                <td align="center">{{plan.interval}}</td>
                <td align="center">
                  <v-button
                    class="h-12"
                   :loading="loading"
                    @click.prevent="gotoStage('info' + ',', plan.id)"
                  >
                    Join Plan
                  </v-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <v-card class="max-w-[400px] mx-auto" v-if="stage === 'info'" shadow>
          <!-- Donation info screen -->
          <div v-if="stage === 'info'" class="flex flex-col">
            <div class="flex flex-col flex-auto relative mb-6">
              <button
                class="absolute top-0 left-0 py-1.5 pr-3"
                @click.prevent="goBackToStage('start')"
              >
                <svg
                  width="10"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M.872 7.561L8.26.173a.616.616 0 01.87.87L2.177 7.996 9.13 14.95a.616.616 0 01-.87.87L.872 8.433a.616.616 0 010-.871z"
                    fill="#767E85"
                  />
                </svg>
              </button>
              <div class="text-center flex-grow pb-4 border-b border-gray-300">
                <span class="text-xl text-gray-600 font-semibold">
                  Donation
                </span>
              </div>
            </div>
            <v-form
              id="signup-form"
              ref="form"
              :loading.sync="loading"
              :on-submit="onSubmit"
              :on-success="onSuccess"
              success-message="Plan created successfullly"
            >
              <div class="form-group mb-5">
                <div>
                  <validation-provider
                    v-slot="{ errors, classes }"
                    name="donation"
                    rules="required"
                  >
                    <input
                      id="input-donation"
                      v-model="form.donation"
                      class="form-input"
                      :class="classes"
                      placeholder="₦ Enter your donation"
                    />
                    <span v-show="errors.length" class="is-invalid">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
              </div>
              <div class="mb-5">
                <span class="text-blue-600">Platform fee:</span>
                <span class="form-input text-blue-600">{{
                  form.donation && !isNaN(form.donation)? (5 / 100) * Number(form.donation): 0
                }}</span>
              </div>
              <div class="form-group mb-5">
                <div>
                  <validation-provider
                    v-slot="{ errors, classes }"
                    name="first_name"
                    rules="required"
                  >
                    <input
                      id="input-first_name"
                      v-model="form.first_name"
                      class="form-input"
                      :class="classes"
                      placeholder="First name"
                    />
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
                    name="last_name"
                    rules="required"
                  >
                    <input
                      id="input-last_name"
                      v-model="form.last_name"
                      class="form-input"
                      :class="classes"
                      placeholder="Last name"
                    />
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
                    name="address"
                    rules="required"
                  >
                    <input
                      id="input-address"
                      v-model="form.address"
                      class="form-input"
                      :class="classes"
                      placeholder="Email address"
                    />
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
                    name="address"
                    rules="required"
                  >
                    <v-checkbox
                      v-model="form.hide_public"
                      name="ussd"
                      value="ussd"
                      :class="classes"
                    >
                      Hide my information from the public
                    </v-checkbox>
                    <span v-show="errors.length" class="is-invalid">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
              </div>
              <template v-slot:footer>
                <div class="flex flex-row mt-5">
                  <v-button
                    :loading="loading"
                    block
                    class="mb-6"
                    @click.prevent="gotoStage()"
                  >
                    Continue
                  </v-button>
                </div>
              </template>
            </v-form>
            <div class="flex flex-auto">
              <div class="flex flex-row mx-auto">
                <i class="mr-4">
                  <img width="16" height="16" src="/secured-by-ajoo.ng.png" />
                </i>
                <div class="text-sm text-gray-600 my-auto">
                  Secured by <span class="font-medium">Wefundx</span>
                </div>
              </div>
            </div>
          </div>
        </v-card>
      </div>
    </div>

    <div class="bg-gradient-to-b from-[#E1F7FE] to-[#E1F7FE33] w-full py-8">
      <h3 class="text-[#1E202A] font-bold text-lg text-center mb-8">
        Campaigns
      </h3>
      <div class="container mx-auto px-4 sm:px-5 lg:px-10">
        <slider title=""> </slider>
      </div>
    </div>

    <div class="w-full bg-[#006696] py-20 px-5 md:px-16">
      <div
        class="
          bg-white
          xl:max-w-[1200px]
          lg:max-w-[900px]
          p-10
          text-center
          mx-auto
        "
      >
        <h3 class="text-3xl font-bold text-[#2B384C] mb-8">
          Sign up for free and get started
        </h3>
        <p
          class="
            text-base text-center text-[#575B68]
            font-light
            mb-5
            max-w-[31rem]
            mx-auto
          "
        >
          Convert online donors with smart donation forms augmented with the
          latest digital techniques. Full flexibility so you look like a pro
        </p>
        <div class="flex items-center justify-center mx-auto">
          <button
            class="
              h-10
              w-32
              broder-0
              bg-[#006696]
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
              h-10
              w-32
              ml-2
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
      stage: 'start',
      loading: false,
      form: {},
      organisation: {},
      plans: [],
      planId: ''
    }
  },
  async mounted() {
    // fetch campaign
    const res = await this.$store.dispatch('auth/fetchOrganizationBasic', this.$route.params.id)
    const resPlan = await this.$store.dispatch('auth/fetchOrganizationplan', this.$route.params.id)
    if (res) {
      this.organisation = {...res.organisation};
    }
    if(resPlan){
        this.plans =[...resPlan.plans]
    }
  },
  methods: {
    goBackToStage(stage, id) {
      this.stage = stage || 'start';
      this.planId = id;
    },
    gotoStage(stage) {
      this.loading = true
      setTimeout(() => {
        this.stage = stage || 'start'
        this.loading = false
      }, 300)
    },
    onSuccess() {},
    onSubmit() {},
  },
}
</script>
