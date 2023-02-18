<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <div class="flex-grow">
            <v-nav-title show-back-button>
              <span class="text-blue-600">Campaign details</span>
            </v-nav-title>
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 mt-8 md:gap-x-12 lg:gap-x-16">
          <div class="md:col-span-12 mb-6">
            <div class="flex flex-row gap-4">
              <img v-for="(img, index) in campaign.images"
              :key="index"
              :src="img.url" class="w-56 h-36 bg-gray-200" />
            </div>
          </div>
          <div class="md:col-span-6 lg:col-span-5 space-y-6">
            <div>
              <p class="text-sm text-gray-500 mb-2">Donation Status</p>
              <span class="status success">{{campaign.status}}</span>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Amount raised</p>
              <p class="font-medium text-gray-800">{{campaign?.total_donated}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Target Goal</p>
              <p class="font-medium text-gray-800">{{campaign.campaign_target}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Campaign title</p>
              <p class="font-medium text-gray-800">
                {{campaign?.name}}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Donation Description</p>
              <p class="font-medium text-gray-800">
                {{campaign?.description}}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Campaign ID</p>
              <p class="font-medium text-gray-800">{{campaign?.id}}</p>
            </div>
          </div>
          <div class="md:col-span-6 lg:col-span-5 space-y-6">
            <div>
              <p class="text-sm text-gray-500 mb-2">Receipt Full Name</p>
              <p class="font-medium text-gray-800">{{campaign?.organisation?.name}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Recipient email address</p>
              <p class="font-medium text-gray-800">{{'-'}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Phone number</p>
              <p class="font-medium text-gray-800">{{campaign?.organisation?.phone}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Campaign start date</p>
              <p class="font-medium text-gray-800">
                {{campaign?.start_date}}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Campaign end date</p>
              <p class="font-medium text-gray-800">
                {{campaign?.end_date}}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Campaign type</p>
              <p class="font-medium text-gray-800">{{campaign?.campaign_type}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Commision fee</p>
              <p class="font-medium text-gray-800">{{campaign?.commission_fee}}</p>
            </div>
          </div>
          <div class="col-span-12 space-x-3 mt-8 md:mt-12">
            <v-button
              type="button"
              outline
              size="sm"
              @click.prevent="$router.push(`/campaigns/edit/${campaign.id}`)"
            >
              Edit
            </v-button>
            <v-button
              type="button"
              outline
              size="sm"
              @click.prevent="$router.push(`/campaigns/preview/${campaign.id}`)"
            >
              Preview
            </v-button>
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

  data() {
    return {
      campaign: {},
      form: {
        dispute_type: '',
        description: '',
        assign_to: '',
      },
    }
  },
  computed: {
      ...mapState({
      campData: (state) => state.app.campaign,
    })
  },
  watch: {
    campData(newValue, oldValue){
      //console.log(newValue);
     this.campaign = newValue;
     }
  },
  mounted(){
    // fetch campaign
    this.$store.dispatch('app/fetchCampaign', this.$route.params.id);
  },
  methods: {
    onSubmit() {},
    onSuccess() {},
  },
}
</script>
