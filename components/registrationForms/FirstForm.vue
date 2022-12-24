<template>
<v-form
        id="signup-form"
        ref="form"
        class="py-8"
        :loading.sync="loading"
        :on-submit="createAccount"
        :on-success="onSuccess"
        :on-error="onError"
      >
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
                  v-model="form.phone"
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
          <div class="mb-4">
                <button :loading="loading" @click.prevent="createAccount" class="btn btn-primary w-full">
                  Continue
                </button>
                <nuxt-link
                  to="/login"
                  class="btn btn-primary-outline w-full mt-6 block text-center"
                >
                  Already have an account, Log in
                </nuxt-link>
          </div>
    </v-form>
</template>

<script>
  export default {
    scrollToTop: true,
    data: ()=> ({
      loading: false,
      success: false,
      activeTab: 0,
      classes: { },
      form: {
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          password: '',
          re_password: '',
      }
    }),
    methods: {
    async createAccount() {
      const { first_name, last_name, email, phone, password } = this.form;
      const fullname = first_name + " " + last_name;

      this.$store.commit('app/SET_ACTIVE_TAB', 1);
      this.$emit('nextTab');
      // Submit the form.
      const data = {
        fullname,
        email,
        phone,
        role: "user",
        password
      };
      this.$emit('nextTab');
      return data;
      //return this.$store.dispatch('auth/createUser', data);

      },
       onSuccess(resp) {
        console.log(resp)
       },
        onError() { },
    }
  }
</script>

