<template>
<div>
<fieldset >
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
            <div>
              <validation-provider
                v-slot="{ errors, classes }"
                name="Postal code"
                rules="required"
              >
                <input
                  id="input-landmark"
                  v-model="form.postal_code"
                  class="form-input"
                  :class="classes"
                  placeholder="Postal code"
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
                  @change="changeStates"
                >
                  <option value="">Country</option>
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
                  <option value="">State</option>
                  <option
                    v-for="state in all_states"
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
                    :key="city.id"
                    :value="city.id"
                  >
                    {{ city.name }}
                  </option>
                </select>
              </div>
              <span v-show="errors.length" class="is-invalid">
                {{ errors[0] }}
              </span>
            </validation-provider>
          </div>
           <div class="grid grid-cols-2 gap-6 mt-8">
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
              <v-button class="w-full" :loading="loading">
                Create account
              </v-button>
            </div>
          </div>
        </fieldset>
      </div>
</template>

<script>
  export default {
    scrollToTop: true,
    data: ()=> ({
      loading: false,
      activeTab: 0,
      form: {
          address: '',
          postal_code: '',
          country: '',
          state: '',
          city: '',
      },
      all_states: require('@/static/json/state.json'),
      cities: [],
      countries: require('@/static/json/country.json')
    }),
    methods: {
    goBack() {
    },
    gotoNext() {

    },
    changeStates() {
      this.state = ''
      this.$axios.get(`/countries/${this.country}/states`).then((res) => {
        // console.log(res)
        const { data } = res.data
        this.states = data
      })
    },
    changeCities() {
      this.city = ''
      this.$axios.get(`/states/${this.state}/cities`).then((resp) => {
        const data = _.get(resp, 'data.data', [])
        // console.log(data)
        this.cities = data
      })
    },
    backTab() {
      this.$emit('backTab');
    },
    onSuccess() {
      // data cleanup
      localStorage.removeItem('ajoo_signup')
      this.$refs.form.reset()
      this.fillData({})
    },
    onError() {
      this.updateStorage()
    },
    }
  }
</script>


