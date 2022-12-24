<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification show-back-button />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title show-back-button>Contact</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 mt-4 md:mt-12 md:gap-x-12 lg:gap-x-24">
          <div class="col-span-12 md:col-span-8 lg:col-span-7">
            <v-form
              id="signup-form"
              ref="form"
              :loading.sync="loading"
              :on-submit="onSubmit"
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
                    name="website"
                    rules="required"
                  >
                    <input
                      id="input-website"
                      v-model="form.website"
                      class="form-input"
                      :class="classes"
                      placeholder="Website"
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
                    name="business address"
                    rules="required"
                  >
                    <input
                      id="input-business_address"
                      v-model="form.address"
                      class="form-input"
                      :class="classes"
                      placeholder="Business Address"
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
                    name="business dispute email"
                    rules="required"
                  >
                    <input
                      id="input-business_dispute_email"
                      v-model="form.dispute_email"
                      class="form-input"
                      :class="classes"
                      placeholder="Business Dispute Email Address"
                      type="email"
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
                    name="business support email"
                    rules="required"
                  >
                    <input
                      id="input-business_support_email"
                      v-model="form.support_email"
                      class="form-input"
                      :class="classes"
                      placeholder="Business Support Email Address"
                      type="email"
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
                    name="facebook username"
                    rules="required"
                  >
                    <input
                      id="input-facebook_username"
                      v-model="form.facebook"
                      class="form-input"
                      :class="classes"
                      placeholder="Facebook Username"
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
                    name="instagram username"
                    rules="required"
                  >
                    <input
                      id="input-instagram_username"
                      v-model="form.instagram"
                      class="form-input"
                      :class="classes"
                      placeholder="Instagram Username"
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
                    name="business phone number"
                    rules="required|phone"
                  >
                    <input
                      id="input-business_phone_number"
                      v-model="form.business_phone"
                      class="form-input"
                      :class="classes"
                      placeholder="Business Phone Number"
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
                  <!-- <div class="col-span-1">
                  <button
                    type="button"
                    class="btn btn-primary-outline w-full"
                    @click.prevent="goBack"
                  >
                    Back
                  </button>
                </div> -->
                  <div class="w-full md:w-1/2 lg:w-1/3">
                    <v-button :loading="loading" class="w-full">
                      Save &amp; Continue
                    </v-button>
                  </div>
                </div>
              </template>
            </v-form>
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
    form: {
      id: '',
      website: '',
      address: '',
      dispute_email: '',
      support_email: '',
      facebook: '',
      instagram: '',
      business_phone: '',
    },
  }),
  computed: {
      ...mapState({
      orgData: (state) => state.auth.org,
    })
  },
  watch: {
    orgData(newValue, oldValue){
        this.form = {...this.form, ...newValue};
    }
  },
   mounted() {
    // reset errors
    this.$store.commit('app/SET_FORM_ERRORS', false)

    // fetch org
    this.$store.dispatch('auth/fetchOrganization');
  },
  methods: {
    onSubmit() {
      const form = {...this.form};
      return this.$store.dispatch('auth/updateOrganization', form);
    },
    onSuccess(resp) {
      console.log(resp)
    },
  },
}
</script>
