<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
     <!-- Edit donation modal -->
      <modal-image-popUp :show="edit_modal" :temporaryImage="Image" @hide="toggleEditModal" />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <div class="flex-grow">
            <v-nav-title show-back-button>
              <span class="text-blue-600">Start a campaign</span>
            </v-nav-title>
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mb-3 mt-3" />
        <div class="sm:grid grid-cols-12 gap-x-12">
          <div class="col-span-12 md:col-span-10 lg:col-span-7">
            <v-form
              id="edit-profile-form"
              ref="form"
              class="pt-8"
              :loading.sync="loading"
              :on-submit="addCampaign"
              :on-success="onSuccess"
              success-message="Campaign created successful"
            >
              <div class="mb-6">
                <p class="text-sm text-gray-500 max-w-sm leading-6 font-normal">
                  This basic information will represent your campaign on your
                  campaign page, on your campaign card, and in searches.
                </p>
              </div>
              <div class="sm:grid grid-cols-2 gap-x-6">
                <div class="flex flex-col">
                  <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="campaign type"
                      rules="required"
                    >
                      <label for="input-role">Campaign Type</label>
                      <div class="cs-select" :class="classes">
                        <select v-model="form.type" class="input">
                          <option value="">Select campaign type</option>
                          <option
                            v-for="camp in campaign_types"
                            :key="camp"
                            :value="camp"
                          >
                            {{ camp }}
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
                      name="campaign type"
                      rules="required"
                    >
                      <label for="input-role">Campaign Plan</label>
                      <div class="cs-select" :class="classes">
                        <select v-model="form.plan_id" class="input">
                          <option value="">Select plan</option>
                          <option
                            v-for="plan in plans"
                            :key="plan.id"
                            :value="plan.id"
                          >
                            {{ plan.name }}
                          </option>
                        </select>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                  <div class="form-group mb-5">
                    <label for="input-title">Campaign Title</label>
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="title"
                        rules="required"
                      >
                        <input
                          id="input-title"
                          v-model="form.title"
                          class="form-input"
                          :class="classes"
                          placeholder="Enter title"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-group mb-5">
                    <label for="input-description">Campaign Description</label>
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="description"
                      rules="required"
                    >
                      <textarea
                        id="input-description"
                        v-model="form.description"
                        class="form-input"
                        :class="classes"
                        placeholder="Campaign Description"
                      >
                      </textarea>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                   <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="start date"
                      rules="required"
                    >
                      <label for="input-start_date">Start Date</label>
                      <div class="cs-select" :class="classes">
                        <input v-model="form.start_date" class="form-input" type="date"/>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                  <div class="form-group mb-5">
                    <validation-provider
                      v-slot="{ errors, classes }"
                      name="end date"
                      rules="required"
                    >
                      <label for="input-end_date">End Date</label>
                      <div class="cs-select" :class="classes">
                          <input v-model="form.end_date" class="form-input" type="date"/>
                      </div>
                      <span v-show="errors.length" class="is-invalid">
                        {{ errors[0] }}
                      </span>
                    </validation-provider>
                  </div>
                </div>
                <div class="flex flex-col">
                  <div class="form-group mb-5">
                    <label for="input-commission_fee">Campaign Target</label>
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="campaign_target"
                        rules="required"
                      >
                        <input
                          id="input-campaign_target"
                          v-model="form.campaign_target"
                          class="form-input"
                          :class="classes"
                          placeholder="campaign Target"
                          type="tel"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                </div>
              </div>
              <template v-slot:footer>
                <div class="mt-6 mb-4">
                  <v-button :loading="loading" class="btn btn-primary">Save &amp; Continue</v-button>
                </div>
              </template>
            </v-form>
          </div>
          <div class="col-span-5 input-file my-auto">
            <v-alert
                color="yellow"
                :message="err"
                :dismissable="dismissable"
              />
            <input type="file" id="dropFile" multiple @change="uploadImages" key="dropFile" />
            <label for="dropFile" className='drop_label mb10 h-40 flex_column'>
              <div
                  class="flex center_item mb3 flex_row border-2 rounded-lg h-40"
                >
                <div
                  class="flex-inline mb-auto rounded-full bg-blue-500 w-12 h-12 m-auto"
                >
                   <svg
                    class="text-white mx-auto my-4"
                    width="12"
                    height="12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.5 6.5V12h1V6.5H12v-1H6.5V0h-1v5.5H0v1h5.5z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
            </div>
            </label>
            <div class="mb-6">
            </div>
            <div
            v-if="Image.length > 0"
            class="grid grid-cols-2 gap-6">
              <!-- <v-uploader :notice="true" :limit="upload_limit" /> -->
              <div
                @click.prevent="toggleEditModal"
                v-for="(file, index) in Image"
                :key="index"
                class="flex position-image border-2 rounded-lg h-40"
                :class="{
                  'border-blue-500': index === 0,
                  'border-dashed border-gray-300': index !== 0,
                }"
              >
              <svg @click.prevent="removeImage(index)" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.3 7.5C15.3 7.5 14.9 12.8 14.6 15.1C14.5 16.2 13.8 16.8 12.7 16.8C10.6 16.8 8.6 16.8 6.5 16.8C5.5 16.8 4.8 16.1 4.7 15.1C4.4 12.8 4 7.5 4 7.5" fill="#F70606"/>
              <path d="M16.4 4.90002H3" stroke="#FF2507" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13.8 4.89998C13.2 4.89998 12.6 4.49998 12.5 3.89998L12.3 2.89998C12.2 2.49998 11.8 2.09998 11.3 2.09998H8C7.5 2.09998 7.1 2.39998 7 2.89998L6.8 3.89998C6.7 4.49998 6.1 4.89998 5.5 4.89998" fill="white"/>
              <path d="M13.8 4.89998C13.2 4.89998 12.6 4.49998 12.5 3.89998L12.3 2.89998C12.2 2.49998 11.8 2.09998 11.3 2.09998H8C7.5 2.09998 7.1 2.39998 7 2.89998L6.8 3.89998C6.7 4.49998 6.1 4.89998 5.5 4.89998" stroke="#F90808" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <img class="mb10 h-40 rounded-lg m-auto flex-inline" :src="file" alt="" >
              </div>
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
    loading: false,
    upload_limit: 4,
    campaign_types: ['crowdfunding'],
    Image: [],
    err: '',
    dismissable: false,
    edit_modal: false,
    org_cat:[],
    plans: [],
    files: [],
    form: {
      type: '',
      title: '',
      description: '',
      campaign_target: '',
      interval: '',
      plan_id: '',
      start_date: '',
      end_date: '',
    },
  }),
  computed: {
      ...mapState({
      planData: (state) => state.app.plans,
    })
  },
   watch: {
    planData(newValue, oldValue){
      console.log(newValue);
     this.plans = newValue;
     }
  },
  mounted(){
    // fetch campaign
    this.$store.dispatch('app/fetchPlan');
  },
  methods: {
    addCampaign() {
      const {
        type,
      title,
      description,
      start_date,
      end_date,
      campaign_target,
      plan_id
      } = this.form;
      const formData = {
        campaign_type: type,
        title,
        description,
        campaign_target,
        start_date,
        end_date,
        plan_id
      };
      //create campaign
      return this.$store.dispatch('auth/createCampaign', formData);
    },
    toggleEditModal() {
      this.edit_modal = !this.edit_modal;
    },
    uploadImages(e) {
      e.preventDefault();
        const {name, files} = e.target;
        let types = ['image/jpeg', 'image/png'];
        if(files){
            let allFile = [...files];
            let FileSize = "5000000";
            let result = allFile.filter((f)=>{
                return types.some((s)=>{
                   return (f.type == s) && (f.size <= FileSize );
                })
            });
            this.files = [...result];
           result.length <= 0 && (err = "unsupported image type* accepted image jpg/png or file size is greater than 5mb", dismissable= true);
           const temporaryUrl = result.length > 0 && result.map((f)=>{
                let url = URL.createObjectURL(f);
                return url;
           });
           result.length > 0 && (this.Image = temporaryUrl);
           temporaryUrl.length > 0 && (this.Image = temporaryUrl);
        }
    },
    submitCampaignImage(){

    },
    removeImage(i) {
      this.Image.splice(i, 1);
    },
    onSuccess(resp){
      const {id} = resp.data.data.campaign;
      const data = {id, files};
      return this.$store.dispatch('auth/uploadCampaignPhoto', data);
    }
  },
}
</script>
