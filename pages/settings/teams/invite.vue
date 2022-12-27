<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification show-back-button />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title show-back-button>Invite Team Member</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 mt-2">
          <div class="col-span-12 md:col-span-6 lg:col-span-5">
            <div
              id="signup-form"
              ref="form"
              class="py-4 md:py-8"
            >
              <div class="grid">
                <div class="form-group mb-5">
                  <label for="input-first_name">First name</label>
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
                  <label for="input-last_name">Last name</label>
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
                  <label for="input-email">Email Address</label>
                  <div>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="email address"
                      rules="required"
                    >
                      <input
                        id="input-email"
                        v-model="form.email"
                        class="form-input"
                        :class="classes"
                        placeholder="Enter Email Address"
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
                    <label for="input-role">Role</label>
                    <div class="cs-select" :class="classes">
                      <select v-model="form.role" class="input">
                        <option value="">Select Role</option>
                        <option
                          v-for="(role, index) in organization_roles"
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
                <div class="mt-6 mb-4">
                  <button @click.prevent="submitInvite" :loading="loading" class="btn btn-primary"> Send Invite </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  layout: 'dashboard',
  scrollToTop: true,
  data: () => ({
    loading: false,
    organization_roles: ['user', 'marketer'],
    org_id: '',
    form: {
      first_name: '',
      last_name: '',
      email: '',
      role: 'user',
    },
  }),

  mounted() {
    // fetch org
    this.org_id = JSON.parse(localStorage.getItem('id'));
  },

  methods: {
    submitInvite() {
      // Submit the form.
      const {first_name, last_name, email, role} = this.form;
      const name = first_name + ' ' + last_name;
      this.$axios.post(`/organisations/${this.org_id}/teams`, {
        name,
        email,
        role
      })
      .then((data)=> {
        console.log(data);
      });
    }
  },
}
</script>
