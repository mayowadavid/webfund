<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification show-back-button />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title show-back-button>Organization Profile Details</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div
          class="
            grid grid-cols-12
            mt-4
            md:mt-12 md:gap-x-12
            lg:gap-x-24
            gap-y-12
          "
        >
          <div class="col-span-12 md:col-span-8 lg:col-span-7">
            <v-form
              id="signup-form"
              ref="form"
              :loading.sync="loading"
              :on-submit="updateProfile"
              :on-success="onSuccess"
            >
              <div class="text-left mb-4">
                <p class="leading-5 text-gray-600">
                  Whether you're just starting out or ready to grow your
                  nonprofit's fundraising, we've got it covered.
                </p>
              </div>

              <div class="form-group mb-5">
                <div>
                  <validation-provider
                    v-slot="{ errors, classes }"
                    name="organization name"
                    rules="required"
                  >
                    <input
                      id="input-organization_name"
                      v-model="form.name"
                      class="form-input"
                      :class="classes"
                      placeholder="Organization name"
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
                  name="organization type"
                  rules="required"
                >
                  <div class="cs-select" :class="classes">
                    <select v-model="form.organisation_type" class="input">
                      <option defaultValue hidden value="">Organization type</option>
                      <option
                        v-for="org_type in organization_types"
                        :key="org_type"
                        :value="org_type"
                      >
                        {{ org_type }}
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
                  name="organization category"
                  rules="required"
                >
                  <div class="cs-select" :class="classes">
                    <select v-model="form.category" class="input">
                      <option defaultValue hidden value="">Organization category</option>
                      <option
                        v-for="org_cat in organization_categories"
                        :key="org_cat"
                        :value="org_cat"
                      >
                        {{ org_cat }}
                      </option>
                    </select>
                  </div>
                  <span v-show="errors.length" class="is-invalid">
                    {{ errors[0] }}
                  </span>
                </validation-provider>
              </div>
              <div class="form-group mb-5">
                <div>
                  <validation-provider
                    v-slot="{ errors, classes }"
                    name="website"
                    rules="required"
                  >
                    <input
                      id="input-website"
                      v-model="form.website"
                      class="form-input"
                      :class="classes"
                      placeholder="Website (Optional)"
                    />
                    <span v-show="errors.length" class="is-invalid">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
              </div>
              <div class="form-group mb-4">
                <div>
                  <validation-provider
                    v-slot="{ errors, classes }"
                    name="website"
                    rules="required"
                  >
                    <textarea
                      id="input-description"
                      v-model="form.description"
                      class="form-input"
                      :class="classes"
                      placeholder="Description about your organization"
                    ></textarea>
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
                    name="organization phone number"
                    rules="required|phone"
                  >
                    <input
                      id="input-organization_phone_number"
                      v-model="form.business_phone"
                      class="form-input"
                      :class="classes"
                      placeholder="Organization phone number"
                      type="tel"
                    />
                    <span v-show="errors.length" class="is-invalid">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
              </div>
              <template v-slot:footer>
                <div class="flex flex-auto gap-6 mt-8">
                  <div class="w-full md:w-1/2 lg:w-1/3">
                    <v-button :loading="loading" block>
                      Save &amp; Continue
                    </v-button>
                  </div>
                </div>
              </template>
            </v-form>
          </div>
          <div class="col-span-12 md:col-span-4 lg:col-span-5 xl:col-span-4">
            <business-logo-card />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import parseMobile from 'libphonenumber-js/mobile'
import { mapState } from 'vuex';
export default {
  layout: 'dashboard',
  scrollToTop: true,
  data: () => ({
    loading: false,
    success: false,
    countries: [],
    organization_categories: ['church', 'tech'],
    organization_types: ['non-profit', 'tech'],
    all_states: [],
    states: [],
    cities: [],
    form: {
      name: '',
      organisation_type: '',
      category: '',
      website: '',
      description: '',
      business_phone: '',
      address: '',
      landmark: '',
      city: '',
      state: '',
      country: '',
    },
  }),
  computed: {
      ...mapState({
      orgData: (state) => state.auth.org,
    })
  },
  watch: {
    orgData(newValue, oldValue){
      console.log(newValue);
      this.form = {
        ...this.form, ...newValue
      };
    }
  },
 mounted() {
     // reset errors
    this.$store.commit('app/SET_FORM_ERRORS', false)

    // fetch org
    this.$store.dispatch('auth/fetchOrganization');
  },
  methods: {
    async updateProfile() {
      // navigate steps
      if (this.activeTab < 2) return await this.gotoNext()

      const form = { ...this.form }
      // parse phone numbers

      // Submit the form.
      return this.$store.dispatch('auth/updateOrganization', form);
    },
    onSuccess(resp) {
      // data cleanup
      console.log(resp)
    },
  },
}
</script>
