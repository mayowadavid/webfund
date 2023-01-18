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
                <div>
                  <validation-provider
                    v-slot="{ errors, classes }"
                    name="fullname"
                    rules="required"
                  >
                    <input
                      id="input-website"
                      v-model="form.fullname"
                      class="form-input"
                      :class="classes"
                      placeholder="full name"
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
                    rules="required"
                  >
                    <input
                      id="input-website"
                      v-model="form.email"
                      class="form-input"
                      :class="classes"
                      placeholder="email"
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
                    name="phone"
                    rules="required"
                  >
                    <input
                      id="input-website"
                      v-model="form.phone"
                      class="form-input"
                      :class="classes"
                      placeholder="phone"
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
                  name="organization category"
                  rules="required"
                >
                  <div class="cs-select" :class="classes">
                    <select v-model="form.means_of_identification" class="input">
                      <option defaultValue hidden value="">Select Means of identification</option>
                      <option
                        v-for="mid in identifications"
                        :key="mid"
                        :value="mid"
                      >
                        {{ mid }}
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
                      name="means_of_identification"
                    >
                      <div class="cs-select" :class="classes">
                        <input class="form-input" @input="handleChange" name="means_of_identification" type="file"/>
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
                    name="address"
                    rules="required"
                  >
                     <textarea
                        id="input-description"
                        v-model="form.address"
                        class="form-input"
                        :class="classes"
                        placeholder="address"
                      >
                      </textarea>
                    <span v-show="errors.length" class="is-invalid">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
              </div>
              <template v-slot:footer>
                <div class="flex flex-auto gap-6 mt-8">
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
    identifications: ['Passport', 'Drivers license', 'Voters card', 'NIN'],
    form: {
      fullname: '',
      email: '',
      phone: '',
      address: '',
      means_of_identification: '',
      identification_file: ''
    },
  }),
  methods: {
    handleChange(event){
      event.preventDefault();
      let {identification_file} = this.form;
      identification_file = event.target.files[0];
      this.form = {...this.form, identification_file};
    },
    onSubmit() {
      return this.$store.dispatch('auth/addDirector', this.form);
    },
    onSuccess(resp) {
      console.log(resp);
    },
  },
}
</script>
