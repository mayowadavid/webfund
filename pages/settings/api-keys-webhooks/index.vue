<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <dash-settings-navbar-mobile />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title>API Keys &amp; Webhooks</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 mt-2">
          <div class="col-span-12 md:col-span-6 lg:col-span-5">
            <v-form
              id="signup-form"
              ref="form"
              class="py-4 md:py-8"
              :loading.sync="loading"
              :on-submit="submit"
            >
              <div class="grid">
                <div class="form-group mb-5">
                  <label for="input-test_secret">Test Secret Key</label>
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="test secret key"
                      rules="required"
                    >
                      <copy-input-value>
                        <input
                          id="input-test_secret"
                          v-model="form.test_secret"
                          class="form-input"
                          :class="classes"
                          placeholder="Test Secret Key"
                        />
                      </copy-input-value>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-group mb-5">
                  <label for="input-test_public">Test Public Key</label>
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="test public key"
                      rules="required"
                    >
                      <copy-input-value>
                        <input
                          id="input-test_public"
                          v-model="form.test_public"
                          class="form-input"
                          :class="classes"
                          placeholder="Test Public Key"
                        />
                      </copy-input-value>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-group mb-5">
                  <label for="input-test_callback">Test Callback URL</label>
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="test callback url"
                      rules="required"
                    >
                      <input
                        id="input-test_callback"
                        v-model="form.test_callback"
                        class="form-input"
                        :class="classes"
                        placeholder="Test Callback URL"
                      />
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="form-group mb-5">
                  <label for="input-test_webhook">Test Webhook URL</label>
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="test webhook url"
                      rules="required"
                    >
                      <input
                        id="input-test_webhook"
                        v-model="form.test_webhook"
                        class="form-input"
                        :class="classes"
                        placeholder="Test Webhook URL"
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
                  <button type="submit" class="btn btn-primary">
                    Save Changes
                  </button>
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
import { mapState } from 'vuex';
export default {
  layout: 'dashboard',
  scrollToTop: true,
  data: () => ({
    loading: false,
    form: {
      test_secret: '',
      test_public: '',
      test_callback: '',
      test_webhook: '',
    },
  }),
  computed: {
      ...mapState({
      orgData: (state) => state.auth.org,
    })
  },
  watch: {
    orgData(newValue, oldValue){
      const {
        test_public_key,
        test_secret_key,
        callback_url,
        webhook_url
        } = newValue;
      this.form = {
      test_secret: test_secret_key,
      test_public: test_public_key,
      test_callback: callback_url,
      test_webhook: webhook_url,
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
    submit() {},
  },
}
</script>
