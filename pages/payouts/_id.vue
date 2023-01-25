<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div v-if="payout" class="w-full">
        <div class="flex gap-6 pt-5">
          <div class="flex-grow">
            <v-nav-title show-back-button>
              <span class="text-blue-600">View payout details</span>
            </v-nav-title>
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 mt-8 md:gap-x-12 lg:gap-x-16">
          <div class="md:col-span-6 lg:col-span-5 space-y-6">
            <div>
              <p class="text-sm text-gray-500 mb-2">Payment Status</p>
              <span class="status success">{{payout.status}}</span>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Amount paid</p>
              <p class="font-medium text-gray-800">₦{{payout.amount}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Settlement fee</p>
              <p class="font-medium text-gray-800">{{payout.settlement_fee}}</p>
            </div>
          </div>
          <div class="md:col-span-6 lg:col-span-5 space-y-6">
            <div>
              <p class="text-sm text-gray-500 mb-2">Receipt Full Name</p>
              <p class="font-medium text-gray-800">
                {{payout.name || 'N/A'}}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Payout date</p>
              <p class="font-medium text-gray-800">
                {{payout.createdAt}}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Reference No</p>
              <p class="font-medium text-gray-800">{{payout.reference}}</p>
            </div>
          </div>
          <div class="col-span-12 space-x-3 mt-8 md:mt-12">
            <v-button
              type="button"
              outline
              size="sm"
              @click.prevent="printPopup"
            >
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
      <!-- Report an issue modal -->
      <modal-report-issue :show="report_modal" @hide="toggleReportModal" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  scrollToTop: true,

  data() {
    return {
      loading: false,
      form: {
        dispute_type: '',
        description: '',
        assign_to: '',
      },
      report_modal: false,
      payout: null,
    }
  },

   async mounted(){
    // fetch donation
    const res = await this.$store.dispatch('auth/viewPayout', this.$route.params.id);
    if(res){
        this.payouts = res.payouts;
    }

  },

  methods: {
    toggleReportModal() {
      this.report_modal = !this.report_modal
    },
    printPopup() {
      window.print()
    },
    onSubmit() {},
    onSuccess() {},
  },
}
</script>
