<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification show-back-button />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title show-back-button>Add director</v-nav-title>
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
                <validation-provider
                  v-slot="{ errors, classes }"
                  name="bank name"
                  rules="required"
                >
                  <div class="cs-select" :class="classes">
                    <select v-model="form.bank_name" class="input">
                      <option value="">Bank Name</option>
                      <option
                        v-for="org_type in organization_types"
                        :key="org_type.id"
                        :value="org_type.id"
                      >
                        {{ org_type.name }}
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
                    name="account number"
                    rules="required|phone"
                  >
                    <input
                      id="input-account_number"
                      v-model="form.account_number"
                      class="form-input"
                      :class="classes"
                      placeholder="Account Number"
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
                    name="org name"
                    rules="required"
                  >
                    <input
                      id="input-org_name"
                      v-model="form.org_name"
                      class="form-input"
                      :class="classes"
                      placeholder="Organization’s Name (Autofilled)"
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

export default {
  layout: 'dashboard',
  scrollToTop: true,
  data: () => ({
    loading: false,
    success: false,
    form: {
      bank_name: '',
      account_number: '',
      org_name: '',
    },
  }),
  methods: {
    onSubmit() {},
    onSuccess() {},
  },
}
</script>
