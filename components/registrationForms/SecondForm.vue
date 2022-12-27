<template>
  <v-form
        id="signup-form"
        ref="form"
        class="py-8"
        :loading.sync="loading"
        :on-submit="createOrganization"
        :on-success="onSuccess"
        :on-error="onError"
      >
   <fieldset >
          <div class="form-group mb-5">
            <div>
              <validation-provider
                v-slot="{ errors, classes }"
                name="organization name"
                rules="required"
              >
                <input
                  id="input-organization_name"
                  v-model="form.name"
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
                <select v-model="form.type" class="input">
                  <option value="">Organization type</option>
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
                <select v-model="form.category" class="input">
                  <option value="">Organization category</option>
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
                  v-model="form.phone"
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
          <div class="grid grid-cols-2 gap-6 mt-8">
            <div class="col-span-1">
              <v-button
                type="button"
                class="btn btn-primary-outline w-full"
                @click.prevent="backTab"
              >
                Back
              </v-button>
            </div>
            <div class="col-span-1">
              <v-button type="submit"
               class="btn btn-primary w-full">Next</v-button>
            </div>
          </div>
    </fieldset>
  </v-form>
</template>

<script>
  export default {
     scrollToTop: true,
    data: ()=> ({
      loading: false,
      organization_types: ['non-profit'],
      organization_categories: ['crowdfunding'],
      classes: { },
      form: {
      name: '',
      type: '',
      category: '',
      website: '',
      description: '',
      phone: '',
      },
    }),
    methods: {

     createOrganization() {
      // data cleanup
      const {
        name,
        type,
        category,
        description,
        website,
        phone
        } = this.form;

     const data = {
        name,
        type,
        category,
        description,
        website,
        phone,
        }
      return this.$store.dispatch('auth/createOrganisation', data);

    },
    backTab() {
      this.$emit('backTab');
    },
    onSuccess(resp) {
      this.$emit('nextTab');
    },
    onError() { },
    }
  }
</script>

