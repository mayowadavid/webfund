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
      <div class="grid grid-cols-12 mt-8 md:gap-x-12 lg:gap-x-16">
        <div class="col-span-12 md:col-span-6 lg:col-span-5 space-y-6">
          <div>
            <p class="text-sm text-gray-500 mb-2">Donation Status</p>
            <span class="status success">Completed</span>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Amount donated</p>
            <p class="font-medium text-gray-800">₦37,555</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Processing fee</p>
            <p class="font-medium text-gray-800">Paid by: Donor</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Payout amount</p>
            <p class="font-medium text-gray-800">₦37,000</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Donation Description</p>
            <p class="font-medium text-gray-800">
              Empower your fundraisers to boost their reach and raise more money
              for your cause, and sync Facebook fundraising activity directly to
              Classy.,000
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Reference No</p>
            <p class="font-medium text-gray-800">34103308</p>
          </div>
        </div>
        <div class="col-span-12 md:col-span-6 lg:col-span-5 space-y-6">
          <div>
            <p class="text-sm text-gray-500 mb-2">Donor full name</p>
            <p class="font-medium text-gray-800">Abase Adelekan</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Donation interval</p>
            <p class="font-medium text-gray-800">Reccurring</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Donation Date</p>
            <p class="font-medium text-gray-800">
              Sunday, 18th Feb 2021 1:45pm
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Next Payment</p>
            <p class="font-medium text-gray-800">
              Sunday, 18th March 2021 1:45pm
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Commision fee</p>
            <p class="font-medium text-gray-800">2</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Channel</p>
            <p class="font-medium text-gray-800">Card</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 mb-2">Campaign type</p>
            <p class="font-medium text-gray-800">Non Profit</p>
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
    <!-- Report an issue modal -->
    <modal-report-issue :show="report_modal" @hide="toggleReportModal" />
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  scrollToTop: true,

  data() {
    return {
      report_modal: false,
      activity_log: require('@/static/json/activity-log.json'),
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
}
</script>
