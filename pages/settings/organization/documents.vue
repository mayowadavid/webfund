<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification show-back-button />
     <!-- Edit donation modal -->
      <modal-image-popUp :show="edit_modal" :temporaryImage="orgDocu" @hide="toggleEditModal" />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <v-nav-title show-back-button>Documents</v-nav-title>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 mt-4 md:mt-12 md:gap-x-12 lg:gap-x-24">
          <div class="col-span-12 md:col-span-8 lg:col-span-7">
            <v-form
              id="document"
              ref="form"
              :loading.sync="loading"
              :on-submit="onSubmit"
              :on-success="onSuccess"
              message="document submitted"
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
                    name="RC number"
                    rules="required"
                  >
                    <input
                      id="input-rc_number"
                      v-model="form.rc_number"
                      class="form-input"
                      :class="classes"
                      placeholder="RC number"
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
                    name="tax ID"
                    rules="required"
                  >
                    <input
                      id="input-tax_id"
                      v-model="form.tin"
                      class="form-input"
                      :class="classes"
                      placeholder="Tax identification number (Optional)"
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
                      name="certificate_of_incorporation"
                    >
                      <label for="input-role">Upload a copy of your certification of Incorporation</label>
                      <div class="cs-select" :class="classes">
                        <input class="form-input" @input="handleChange" name="certificate_of_incorporation" type="file"/>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
              </div>
              <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="memorandum_and_articles_of_association"
                    >
                      <label for="input-role">Upload a copy of your memorandum and Articles of Association</label>
                      <div class="cs-select" :class="classes">
                        <input class="form-input" @input="handleChange" name="memorandum_and_articles_of_association" type="file"/>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
              </div>
              <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="cac_1_1"
                    >
                      <label for="input-role">Upload a copy of your form CAC 1.1</label>
                      <div class="cs-select" :class="classes">
                        <input class="form-input" @input="handleChange" name="cac_1_1" type="file"/>
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
                       <label for="input-mid">Means of identification</label>
                      <div class="cs-select" :class="classes">
                        <input class="form-input" @input="handleChange" name="identification" type="file"/>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
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

      <div v-if="adminOrgData" class="display_documents mb-tp5 mb10 flex_row">
          <div @click.prevent="toggleEditModal" v-for="img in orgDocu" :key="img" class="document_cont mb-tp5 mb4">
              <img :src="img.url" alt="wefundx">
          </div>
      </div>
      <div v-if="mssg" class="mb-tp5 mssg mb10">
        <p>{{mssg}}</p>
      </div>
      <div v-if="adminOrgData" class="doc_button mb-tp5 mb10 flex_row">
          <v-button @click="handleDocument(stateValue[0])" class="green">Accept</v-button>
          <v-button @click="handleDocument(stateValue[1])" outline  class="red">Reject</v-button>
      </div>

      <div class="w-full">
        <h4 class="mt-16"><strong>Directors of Organization</strong></h4>
        <hr class="w-full mt-4" />
        <div class="grid grid-cols-12 mt-10 md:gap-x-12 lg:gap-x-24">
          <div class="col-span-12 md:col-span-6 lg:col-span-5">
            <div class="form-group mb-4">
              <v-button
                outline
                :loading="loading"
                class="w-full"
                type="button"
                @click.prevent="$router.push('/settings/organization/add-director')"
              >
                Add directors
              </v-button>
            </div>
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
    stateValue: ['accepted', 'rejected'],
    loading: false,
    edit_modal: false,
    adminOrgData: null,
    mssg: null,
    countries: [],
    organization_categories: ['church', 'tech'],
    organization_types: ['non-profit', 'tech'],
    identifications: ['Passport', 'Drivers license', 'Voters card', 'NIN'],
    orgDocu: [],
    form: {
      rc_number: '',
      tin: '',
      category: '',
      organisation_type: '',
      certificate_of_incorporation: '',
      memorandum_and_articles_of_association: '',
      cac_1_1: '',
      identification: '',
      means_of_identification: '',
      website: '',
      description: '',
      business_phone: '',
    },
  }),
  computed: {
      ...mapState({
      orgData: (state) => state.auth.org,
      orgDoc: (state) => state.auth.orgDoc,
    })
  },
  watch: {
    orgData(newValue, oldValue){
      console.log(newValue)
      this.form = {
        ...this.form, ...newValue
      };
    },
    orgDoc(newValue, oldValue){
      const {
      certificate_of_incorporation,
      memorandum_and_articles_of_association,
      cac_1_1,
      identification} = newValue;
      this.orgDocu = [
        {url: certificate_of_incorporation},
      {url: memorandum_and_articles_of_association},
      {url: cac_1_1},
      {url: identification}];
    }
  },
  mounted() {
    // reset errors
    this.$store.commit('app/SET_FORM_ERRORS', false)
    this.adminOrgData = this.$store.getters['auth/adminOrg'];
    // fetch org
    this.$store.dispatch('auth/fetchDocuments');

    // fetch org
    this.$store.dispatch('auth/fetchOrganization');
  },
  methods: {
    onSubmit() {
      const form = { ...this.form };
      return this.$store.dispatch('auth/addDocuments', form);
    },
    toggleEditModal() {
      this.edit_modal = !this.edit_modal;
    },
    handleChange(event){
      event.preventDefault();
      const {name, files} = event.target;

      this.form = {...this.form, [name]: files[0]};
    },
    async handleDocument(id) {
        const res = await this.$store.dispatch('auth/acceptDocuments', id);
        if(res){
          this.mssg = `Document ${id}`
        }
    },
    onSuccess(resp) {
      // data cleanup
      this.$refs.form.reset()
    },
  },
}
</script>
<style>
.document_cont > img {
    width: clamp(250px, 30vw, 300px);
    height: clamp(250px, 30vw, 300px);
    border-radius: 10px;
    object-fit: cover;
    margin-top: 40px;
}

.doc_button {
  gap: 25px;
}

.mssg > p {
  font-weight: bold;
  font-size: 24px;
}

</style>
