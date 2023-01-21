<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification show-back-button />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title show-back-button>Edit Profile</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 md:mt-2">
          <div class="col-span-12 md:col-span-10 lg:col-span-7">
            <v-form
              id="edit-profile-form"
              ref="form"
              class="py-4 md:py-8"
              :loading.sync="loading"
              :on-submit="updateProfile"
              :on-success="onSuccess"
            >
              <div class="md:grid grid-cols-2 gap-x-6">
                <div class="form-group mb-5">
                  <label for="input-first_name">First Name</label>
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
                  <label for="input-last_name">Last Name</label>
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
                  <label for="input-phone_number">Phone Number</label>
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
                  <label for="input-email">Email Address</label>
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
                  <validation-provider
                    v-slot="{ errors, classes }"
                    name="role"
                    rules="required"
                  >
                    <label for="input-role">Role</label>
                    <div class="cs-select" :class="classes">
                      <select v-model="form.role" class="input">
                        <option defaultValue hidden value="">Role</option>
                        <option
                          v-for="(role, index) in roles"
                          :key="index"
                          :value="role"
                        >
                          {{ role }}
                        </option>
                      </select>
                    </div>
                    <span v-show="errors.length" class="is-invalid">
                      {{ errors[0] }}
                    </span>
                  </validation-provider>
                </div>
              </div>
              <template v-slot:footer>
                <div class="mt-6 mb-4">
                  <v-button :loading="loading"> Save Changes </v-button>
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
    states: [],
    roles: ['marketer', 'user'],
    form: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      role: '',
    },
  }),

  watch: {
    roles: {
      handler(value, oldValue) {
        if (value) this.resolveRole()
      },
      immediate: true,
      deep: true,
    },
    user: {
      handler(value, oldValue) {
        if (value) {
          this.form.first_name = value.first_name
          this.form.last_name = value.last_name
          this.form.phone_number = value.phone_number
          this.form.email = value.email
          this.resolveRole()
        }
      },
      immediate: true,
      deep: true,
    },
  },

  mounted() {
    // fetch roles
     this.$store.dispatch('auth/fetchOrganization');
        let {
        fullname,
        email,
        role,
        organisation: { phone },
        } = this.$store.getters['auth/user'];
        const splits = fullname.split(' ');
        this.form = {
          first_name: splits[0],
          last_name: splits[1],
          email,
          role,
          phone_number: phone,
        }
  },

  methods: {
    resolveRole() {
      this.form.role = _.get(
        _.find(this.roles, 'name', _.get(this.user, 'role', null)),
        'id',
        ''
      )
    },
    resetForm() {
      this.form = {
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        role: '',
      }
    },
    updateProfile() {
      const form = { ...this.form }
      // // parse phone numbers
      // form.phone_number = parseMobile(form.phone_number, 'NG').number

      // Submit the form.
      return this.$store.dispatch('auth/updateOrganization', form);
    },
    onSuccess(resp) {
        resp
    },
  },
}
</script>
