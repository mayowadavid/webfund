<template>
  <div class="w-screen lg:w-full h-full">
    <dash-navbar-mobile hide-notification />
    <div class="px-5 md:px-8 pb-10">
      <div class="w-full">
        <div class="flex gap-6 pt-5">
          <div class="flex-grow">
            <v-nav-title show-back-button>
              <span class="text-blue-600">View plan details</span>
            </v-nav-title>
          </div>
          <notifications />
        </div>
        <hr class="w-full hidden lg:flex mt-3" />
        <div class="grid grid-cols-12 mt-8 md:gap-x-12 lg:gap-x-16">
          <div class="md:col-span-6 lg:col-span-5 space-y-6">
            <div>
              <p class="text-sm text-gray-500 mb-2">Status</p>
              <span class="status success">Active</span>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Plan name</p>
              <p class="font-medium text-gray-800">{{form.name}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Plan amount</p>
              <p class="font-medium text-gray-800">{{form.amount}}</p>
            </div>
          </div>
          <div class="md:col-span-6 lg:col-span-5 space-y-6">
            <div>
              <p class="text-sm text-gray-500 mb-2">Interval</p>
              <p class="font-medium text-gray-800">{{form.interval}}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 mb-2">Plan ID</p>
              <p class="font-medium text-gray-800">{{form.id}}</p>
            </div>
          </div>
          <div class="col-span-12 space-x-3 mt-8 md:mt-12">
            <v-button
              type="button"
              outline
              size="sm"
              @click.prevent="toggleEditModal"
            >
              Edit
            </v-button>
          </div>
        </div>
      </div>
      <!-- Edit plan modal -->
      <modal-edit-plan :show="edit_modal" @hide="toggleEditModal" />
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
      loading: false,
      form: {
        id: '',
        name: '',
        amount: '',
        status: '',
        interval: ''
      },
      edit_modal: false,
    }
  },
  computed: {
      ...mapState({
      planData: (state) => state.app.plans,
    })
  },
  watch: {
    planData(newValue, oldValue){
     this.form = newValue[this.$route.params.id];
     }
  },
  mounted(){
    // fetch campaign
    this.$store.dispatch('app/fetchPlan');
  },
  methods: {
    toggleEditModal() {
      this.edit_modal = !this.edit_modal
    },
    onSubmit() {},
    onSuccess() {},
  },
}
</script>
