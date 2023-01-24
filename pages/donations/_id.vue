<template>
  <div class="px-5 md:px-8 pb-10 pt-5">
    <div class="w-full">
      <div class="flex gap-6 pt-5">
        <div class="flex-grow">
          <v-nav-title show-back-button>
            <span class="text-blue-600">View donation details</span>
          </v-nav-title>
        </div>
        <notifications />
      </div>
      <hr class="flex flex-col flex-auto mt-3" />
      <div v-if="donation" class="grid grid-cols-12 mt-8 md:gap-x-12 lg:gap-x-16">
        <div class="col-span-12 md:col-span-6 lg:col-span-5 space-y-6">
          <div>
            <p class="text-sm text-gray-500 mb-2">Donation Status</p>
            <span class="status success">{{donation.status}}</span>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Amount donated</p>
            <p class="font-medium text-gray-800">₦{{donation.amount}}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Processing fee</p>
            <p class="font-medium text-gray-800">{{'N/A'}}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Payout amount</p>
            <p class="font-medium text-gray-800">{{'N/A'}}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Donation Description</p>
            <p class="font-medium text-gray-800">{{donation.comment}}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Reference No</p>
            <p class="font-medium text-gray-800">{{donation.reference}}</p>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6 lg:col-span-5 space-y-6">
          <div>
            <p class="text-sm text-gray-500 mb-2">Donor full name</p>
            <p class="font-medium text-gray-800">{{donation.donor_name}}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Donation interval</p>
            <p class="font-medium text-gray-800">{{donation.donation_type}}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Donation Date</p>
            <p class="font-medium text-gray-800">
              {{donation.createdAt}}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Next Payment</p>
            <p class="font-medium text-gray-800">
              {{'N/A'}}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Commision fee</p>
            <p class="font-medium text-gray-800">{{'N/A'}}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Channel</p>
            <p class="font-medium text-gray-800">{{donation.channel || 'N/A'}}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Campaign type</p>
            <p class="font-medium text-gray-800">{{'N/A'}}</p>
          </div>
        </div>
        <div class="col-span-12 space-x-3 mt-8 md:mt-12">
          <v-button type="button" outline size="sm" @click.prevent="printPopup">
            Print Receipt
          </v-button>
          <v-button
            type="button"
            outline
            size="sm"
            @click.prevent="toggleReportModal"
          >
            Report an issue
          </v-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  scrollToTop: true,

  data() {
    return {
      report_modal: false,
      donation: null,
    }
  },

  methods: {
    printPopup() {
      window.print()
    },
    toggleReportModal() {
      this.report_modal = !this.report_modal
    },
  },
 async mounted(){
    // fetch donation
    const res = await this.$store.dispatch('auth/viewDonations', this.$route.params.id);
    if(res){
        this.donation = res.donation;
    }

  }
}
</script>
