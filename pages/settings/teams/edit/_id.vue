<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification show-back-button />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title show-back-button>Edit Team Member</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 mt-5 md:mt-12 md:gap-x-12 lg:gap-x-24">
          <div class="col-span-12 md:col-span-7 lg:col-span-6">
            <v-form
              id="signup-form"
              ref="form"
              :loading.sync="loading"
              :on-submit="onSubmit"
              :on-success="onSuccess"
              success-message="Team member update successfully"
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
                      placeholder="First Name"
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
                      placeholder="Last Name"
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
                    name="email address"
                    rules="required"
                  >
                    <input
                      id="input-email_address"
                      v-model="form.email_address"
                      class="form-input"
                      :class="classes"
                      placeholder="Email Address"
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
                  <div class="cs-select" :class="classes">
                    <select v-model="form.role" class="input">
                      <option value="">Select Role</option>
                      <option
                        v-for="org_role in organization_roles"
                        :key="org_role"
                        :value="org_role"
                      >
                        {{ org_role }}
                      </option>
                    </select>
                  </div>
                  <span v-show="errors.length" class="is-invalid">
                    {{ errors[0] }}
                  </span>
                </validation-provider>
              </div>
              <template v-slot:footer>
                <div class="grid md:grid-cols-2 gap-5 mt-8">
                  <div class="col-span-1">
                    <v-button :loading="loading" block> Save Changes </v-button>
                  </div>
                  <div class="col-span-1">
                    <v-button
                      type="button"
                      block
                      outline
                      variant="red"
                      :loading="deactivating"
                      @click.prevent="deactivateMember"
                    >
                      Delete Member
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
    deactivating: false,
    success: false,
    organization_roles: ['user', 'marketer'],
    org_id: '',
    form: {
      first_name: '',
      last_name: '',
      email: '',
      role: 'user',
    },
  }),
  async mounted() {
    // fetch teams
    const res = await this.$store.dispatch('auth/fetchTeam', this.$route.params.id);
    if(res){
      const {fullname, email, role} = res.team_member;
        const splits = fullname?.split(" ");
        const first_name = splits ? splits[0]: '';
        const last_name = splits ? splits[1]: '';
        const data = {first_name, last_name, email, role}
        this.form = {...data};
    }
  },
  methods: {
    onSubmit() {
    var raw = JSON.stringify({
      name: this.form.first_name,
      email: this.form.email,
      role: this.form.role
    });

    },
    onSuccess() {},
    deactivateMember() {
      // this.deactivating = true
      // this.$axios.get(`/team/${this.$route.params.id}`)
    },
  },
}
</script>
