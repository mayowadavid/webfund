<template>
  <div class="grid grid-cols-12 md:gap-8 lg:gap-16 h-full">
    <div
      class="
        col-span-12
        md:col-span-4
        lg:col-span-5
        md:order-last
        mt-8
        md:my-auto
      "
    >
      <div class="flex">
        <progress-circle-step
          show-steps
          :step="activeTab + 1"
          :steps="steps"
          class="mx-auto"
        />
      </div>
    </div>
    <div class="col-span-12 md:col-span-8 lg:col-span-7 my-auto">
      <v-form
        id="signup-form"
        ref="form"
        class="py-8"
        :loading.sync="loading"
        :on-submit="onSubmit"
        :on-success="onSuccess"
        :on-error="onError"
        success-message="Sign up successful check your mail to activate your account!"
      >
        <!-- Form Header -->

        <template v-slot:header>
          <h1
            class="
              text-center
              md:text-left
              text-gray-800
              font-bold
              leading-none
              mb-6
            "
          >
            {{ titles[activeTab] }}
          </h1>
          <p class="text-center md:text-left text-gray-600 mb-8 md:pr-20">
            {{ sub_titles[activeTab] }}
          </p>
        </template>

        <!-- Form Section 1 -->

        <fieldset v-if="activeTab === 0">
          <div class="form-group mb-5">
            <div>
              <validation-provider
                v-slot="{ errors, classes }"
                name="first name"
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
                name="last name"
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
                name="email"
                rules="required|email"
              >
                <input
                  id="input-email"
                  v-model="form.email"
                  class="form-input"
                  :class="classes"
                  placeholder="Email address"
                  type="email"
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
                name="phone number"
                rules="required|phone"
              >
                <input
                  id="input-phone_number"
                  v-model="form.phone_number"
                  class="form-input"
                  :class="classes"
                  placeholder="Phone number"
                  type="tel"
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
                name="password"
                rules="required"
              >
                <show-password>
                  <input
                    id="input-password"
                    v-model="form.password"
                    class="form-input"
                    :class="{ ...classes, 'no-icon': errors.length }"
                    placeholder="Password"
                    type="password"
                  />
                </show-password>
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
                name="repeat password"
                rules="required|password:@password"
              >
                <show-password>
                  <input
                    id="input-re_password"
                    v-model="form.re_password"
                    class="form-input"
                    :class="{ ...classes, 'no-icon': errors.length }"
                    placeholder="Confirm password"
                    type="password"
                  />
                </show-password>
                <span v-show="errors.length" class="is-invalid">
                  {{ errors[0] }}
                </span>
              </validation-provider>
            </div>
          </div>
          <div class="text-left my-4">
            <p class="leading-5 text-gray-600">
              By clicking the “Create My Account” button, you agree to Wefundx’s
              terms of acceptable use.
            </p>
          </div>
        </fieldset>

        <!-- All Footers -->

        <template v-slot:footer>
          <div v-if="activeTab === 0" class="mb-4">
            <button
            type="submit"
            class="btn btn-primary w-full"
            @click.prevent="proceed">
              Continue
            </button>
            <nuxt-link
              to="/login"
              class="btn btn-primary-outline w-full mt-6 block text-center"
            >
              Already have an account, Log in
            </nuxt-link>
          </div>

          <div v-if="activeTab === 1" class="grid grid-cols-2 gap-6 mt-8">
            <div class="col-span-1">
              <button
                type="button"
                class="btn btn-primary-outline w-full"
                @click.prevent="backTab"
              >
                Back
              </button>
            </div>
            <div class="col-span-1">
              <button
              type="submit"
              @click.prevent="proceed"
              class="btn btn-primary w-full"
              >Next</button>
            </div>
          </div>

          <div v-if="activeTab === 2" class="grid grid-cols-2 gap-6 mt-8">
            <div class="col-span-1">
              <button
                type="button"
                class="btn btn-primary-outline w-full"
                @click.prevent="goBack"
              >
                Back
              </button>
            </div>
            <div class="col-span-1">
              <v-button class="w-full" :loading="loading">
                Create account
              </v-button>
            </div>
          </div>
        </template>

        <!-- Form Section 2 -->

        <fieldset v-if="activeTab === 1">
          <div class="form-group mb-5">
            <div>
              <validation-provider
                v-slot="{ errors, classes }"
                name="organization name"
                rules="required"
              >
                <input
                  id="input-organization_name"
                  v-model="form.organization_name"
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
                <select v-model="form.organization_type" class="input">
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
                <select v-model="form.organization_category" class="input">
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
                rules="url"
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
                  v-model="form.organization_phone_number"
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
        </fieldset>

        <!-- Form Section 3 -->

        <fieldset v-if="activeTab === 2">
          <div class="form-group mb-5">
            <div>
              <validation-provider
                v-slot="{ errors, classes }"
                name="address"
                rules="required|min:5"
              >
                <input
                  id="input-address"
                  v-model="form.address"
                  class="form-input"
                  :class="classes"
                  placeholder="Address"
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
              name="country"
              rules="required"
            >
              <div class="cs-select" :class="classes">
                <select
                  v-model="form.country"
                  class="input"
                >
                  <option defaultValue hidden value="">Country</option>
                  <option
                    v-for="cont in countries"
                    :key="cont.name"
                    :value="cont.name"
                  >
                    {{ cont.name }}
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
              name="state"
              rules="required"
            >
              <div class="cs-select" :class="classes">
                <select
                  v-model="form.state"
                  class="input"
                  @change="changeCities"
                >
                  <option defaultValue hidden value="">State</option>
                  <option
                    v-for="state in states"
                    :key="state.name"
                    :value="state.name"
                  >
                    {{ state.name }}
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
              name="city"
              rules="required"
            >
              <div class="cs-select" :class="classes">
                <select
                  v-model="form.city"
                  class="input"
                  :disabled="!form.state"
                >
                  <option value="">City</option>
                  <option
                    v-for="city in cities"
                    :key="city"
                    :value="city"
                  >
                    {{ city }}
                  </option>
                </select>
              </div>
              <span v-show="errors.length" class="is-invalid">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
        </fieldset>
      </v-form>
    </div>
  </div>
</template>


<script>

export default {
  layout: 'auth',
  middleware: 'guest',
  scrollToTop: true,
  data: () => ({
    loading: false,
    activeTab: 0,
    done: [],
    countries: require('@/static/json/country.json'),
    organization_categories: ['crowdfunding'],
    organization_types: ['non-profit'],
    states: require('@/static/json/state.json'),
    cities: [],
    steps: [
      'Personal Information',
      'Organization Details',
      'Organization Address',
    ],
    titles: [
      'Get started',
      'Tell us more about the organization',
      'Add organization address',
    ],
    sub_titles: [
      `Whether you're just starting out or ready to grow your nonprofit's
      fundraising, we've got it covered.`,
      'We will help you get started based on your feedback.',
      `This will be used as your default business address. You can
      always change this later.`,
    ],
    form: {
      first_name: 'mayowa',
      last_name: 'david',
      email: 'mayowada0v0id0100@gmail.com',
      password: '123456',
      re_password: '123456',
      phone_number: '08130614615',
      organization_name: 'meger',
      organization_type: 'tech',
      organization_category: 'service',
      website: 'managerbran.com',
      description: 'test desscriptions',
      organization_phone_number: '09130614615',
      address: 'ibeju lekki',
      city: 'ibeju',
      state: 'lagos',
      country: 'Nigeria',
    },
  }),
  methods: {
    async onSubmit() {
      // navigate steps
      if (this.activeTab < 2) return await this.gotoNext()

      const form = { ...this.form }
      // create new user and organization.
      return  this.$store.dispatch('auth/createUser', this.form)
    },
    changeCities(){
      const {state} = this.form;
      this.states.find((s)=>{
        if(s.name == state){
            this.cities = s.cities;
            return s;
        }
        })
    },
    proceed() {
      this.nextTab();
    },
    onSuccess(resp) {
      // data cleanup
      console.log(resp);
       this.$store.dispatch('auth/onSuccess', resp.data)
       this.$store.dispatch('auth/createOrganisation', this.form)
      this.$refs.form.reset()
    },
    onError() {

    },
    nextTab(){
      this.activeTab += 1;
      window.scrollTo(0, 0)
    },
    backTab(){
      this.activeTab -= 1;
      window.scrollTo(0, 0)
    }
  },
}
</script>
