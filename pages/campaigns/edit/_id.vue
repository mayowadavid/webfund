<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <div class="flex-grow">
            <v-nav-title show-back-button>
              <span class="text-blue-600">Edit campaign</span>
            </v-nav-title>
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="sm:grid grid-cols-12 gap-x-12">
          <div class="col-span-12 md:col-span-10 lg:col-span-7">
            <v-form
              id="edit-profile-form"
              ref="form"
              class="pt-8"
              :loading.sync="loading"
              :on-submit="updateCampaign"
            >
              <div class="mb-6">
                <p class="text-sm text-gray-500 max-w-sm leading-6 font-normal">
                  This basic information will represent your campaign on your
                  campaign page, on your campaign card, and in searches.
                </p>
              </div>
              <div class="sm:grid grid-cols-2 gap-x-6">
                <div class="flex flex-col">
                  <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="campaign type"
                      rules="required"
                    >
                      <label for="input-role">Campaign Type</label>
                      <div class="cs-select" :class="classes">
                        <select v-model="form.campaign_type" class="input">
                          <option defaultValue hidden value="">Select campaign type</option>
                          <option
                            v-for="camp in campaign_types"
                            :key="camp"
                            :value="camp"
                          >
                            {{ camp }}
                          </option>
                        </select>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                  <div class="form-group mb-5">
                    <label for="input-title">Campaign Title</label>
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="title"
                        rules="required"
                      >
                        <input
                          id="input-title"
                          v-model="form.title"
                          class="form-input"
                          :class="classes"
                          placeholder="Enter title"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-group mb-5">
                    <label for="input-description">Campaign Description</label>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="description"
                      rules="required"
                    >
                      <textarea
                        id="input-description"
                        v-model="form.description"
                        class="form-input"
                        :class="classes"
                        placeholder="Campaign Description"
                      >
                      </textarea>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                  <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="interval"
                      rules="required"
                    >
                      <label for="input-interval">Interval</label>
                      <div class="cs-select" :class="classes">
                        <select v-model="form.interval" class="input">
                          <option defaultValue hidden value="">Select interval</option>
                          <option
                            v-for="int in intervals"
                            :key="int"
                            :value="int"
                          >
                            {{ int }}
                          </option>
                        </select>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                  <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="start date"
                      rules="required"
                    >
                      <label for="input-start_date">Start Date</label>
                      <div class="cs-select" :class="classes">
                        <input v-model="form.start_date" class="form-input" type="date"/>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="flex flex-col">
                  <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="processing fee"
                      rules="required"
                    >
                      <label for="input-processing_fee">Processing fee</label>
                      <div class="cs-select" :class="classes">
                        <validation-provider
                        v-slot="{ errors, classes }"
                        name="processing fee"
                        rules="required"
                      >
                        <input
                          id="input-title"
                          v-model="form.processing_fee_by"
                          class="form-input"
                          :class="classes"
                          placeholder="Enter processing fee"
                          type="tel"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                  <div class="form-group mb-5">
                    <label for="input-commission_fee">Commission fee</label>
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="commission_fee"
                        rules="required"
                      >
                        <input
                          id="input-commission_fee"
                          v-model="form.commission_fee"
                          class="form-input"
                          :class="classes"
                          placeholder="Commission fee"
                          type="tel"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="plan"
                      rules="required"
                    >
                      <label for="input-plan">Plan</label>
                      <div class="cs-select" :class="classes">
                        <select v-model="form.plan" class="input">
                          <option defaultValue hidden value="">Select plan</option>
                          <option
                            v-for="plan in plans"
                            :key="plan.id"
                            :value="plan.id"
                          >
                            {{ plan.name }}
                          </option>
                        </select>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                  <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="end date"
                      rules="required"
                    >
                      <label for="input-end_date">End Date</label>
                      <div class="cs-select" :class="classes">
                        <input v-model="form.end_date" class="form-input" type="date"/>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
              </div>
              <template v-slot:footer>
                <div class="mt-6 mb-4">
                  <v-button :loading="loading">Update</v-button>
                </div>
              </template>
            </v-form>
          </div>
          <div class="col-span-5 my-auto">
            <div class="mb-6">
              <v-alert
                color="yellow"
                message="1000 x 640 recommended resolution"
                :dismissable="true"
              />
            </div>
            <div class="grid grid-cols-2 gap-6">
              <!-- <v-uploader :notice="true" :limit="upload_limit" /> -->
              <div
                v-for="(file, index) in Array(4).keys()"
                :key="index"
                class="flex border-2 rounded-lg h-40"
                :class="{
                  'border-blue-500': index === 0,
                  'border-dashed border-gray-300': index !== 0,
                }"
              >
                <div
                  class="flex-inline rounded-full bg-blue-500 w-12 h-12 m-auto"
                  :class="{ 'pt-0.5': index !== 0 }"
                >
                  <svg
                    v-if="index !== 0"
                    class="text-white mx-auto my-4"
                    width="12"
                    height="12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.5 6.5V12h1V6.5H12v-1H6.5V0h-1v5.5H0v1h5.5z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    v-else
                    class="text-white mx-auto my-4"
                    width="16"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.088 1.326a2.25 2.25 0 00-3.182 0l-8.92 8.92a.5.5 0 00-.128.22L.685 14.7a.5.5 0 00.615.615l4.235-1.173a.499.499 0 00.22-.128l8.92-8.92a2.252 2.252 0 000-3.182l-.587-.586zM3.076 10.57l7.3-7.3 2.354 2.354-7.3 7.3-2.354-2.354zm-.47.944l1.88 1.88-2.601.722.72-2.602zm11.361-7.127l-.53.53-2.354-2.354.53-.53a1.25 1.25 0 011.768 0l.586.586c.488.489.488 1.28 0 1.768z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  layout: 'dashboard',
  scrollToTop: true,
  data: () => ({
    loading: false,
    campaign_types: ['crowdfunding'],
    intervals: ['weekly', 'monthly', 'yearly'],
    plans: [],
    form: {
      campaign_type: '',
      title: '',
      description: '',
      processing_fee_by: '',
      commission_fee: '',
      interval: '',
      plan: '',
      start_date: '',
      end_date: '',
    },
  }),
  computed: {
      ...mapState({
      campData: (state) => state.app.campaign,
      plan: (state) => state.app.plans
    })
  },
  watch: {
    campData(newValue, oldValue){
     this.form = {...newValue};
     },
     plan(newValue, oldValue){
      this.plans = newValue
     }
  },
  mounted(){
    // fetch campaign
    this.$store.dispatch('app/fetchCampaign', this.$route.params.id);
    this.$store.dispatch('app/fetchPlan');
  },
  methods: {
    updateCampaign() {},
  },
}
</script>
