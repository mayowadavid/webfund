<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification show-back-button />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title show-back-button>Change Password</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 md:mt-2">
          <div class="col-span-12 md:col-span-6 lg:col-span-5">
            <v-form
              id="signup-form"
              ref="form"
              class="py-4 md:py-8"
              :loading.sync="loading"
              :on-submit="changePassword"
              :on-success="onSuccess"
            >
              <div class="mb-6">
                <p
                  class="
                    text-sm text-gray-500
                    max-w-sm
                    leading-6
                    font-normal
                    md:mt-4
                  "
                >
                  Make your password stronger with more than 8 (eight)
                  characters by including upper and lower case, one capital
                  letter, one number, one special character like !”%$&
                </p>
              </div>
              <div class="grid">
                <div class="form-group mb-5">
                  <label for="input-current_password">Old Password</label>
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="old password"
                      rules="required"
                    >
                      <input
                        id="input-current_password"
                        v-model="form.current_password"
                        type="password"
                        class="form-input"
                        :class="classes"
                        placeholder="Old Password"
                      />
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-group mb-5">
                  <label for="input-new_password">New Password</label>
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="new password"
                      rules="required"
                    >
                      <input
                        id="input-new_password"
                        v-model="form.new_password"
                        type="password"
                        class="form-input"
                        :class="classes"
                        placeholder="New Password"
                      />
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-group mb-5">
                  <label for="input-re_new_password"
                    >Confirm New Password</label
                  >
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="confirm password"
                      rules="required|password:@new password"
                    >
                      <input
                        id="input-re_new_password"
                        v-model="form.re_new_password"
                        type="password"
                        class="form-input"
                        :class="classes"
                        placeholder="Confirm New Password"
                      />
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
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
    success: false,
    form: {
      current_password: '',
      new_password: '',
      re_new_password: '',
    },
  }),

  methods: {
    changePassword() {
      // Submit the form.
      return this.$axios.post('/change-password', this.form)
    },
    onSuccess({ data: user }) {
      this.$refs.form.reset()
      this.form = {
        current_password: '',
        new_password: '',
        re_new_password: '',
      }
    },
  },
}
</script>
