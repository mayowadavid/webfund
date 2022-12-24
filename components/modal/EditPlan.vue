<template>
  <v-modal :show="show" title="Edit plan" backdrop="static" @hide="hideModal">
    <v-form
      id="signup-form"
      ref="form"
      :loading.sync="loading"
      :on-submit="onSubmit"
      :on-success="onSuccess"
      success-message="Plan created successfullly"
    >
      <div class="form-group mb-5">
        <label for="input-name">Plan name</label>
        <div>
          <validation-provider
            v-slot="{ errors, classes }"
            name="name"
            rules="required"
          >
            <input
              id="input-name"
              v-model="form.name"
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
        <label for="input-amount">Amount</label>
        <div>
          <validation-provider
            v-slot="{ errors, classes }"
            name="amount"
            rules="required"
          >
            <input
              id="input-amount"
              v-model="form.amount"
              class="form-input"
              :class="classes"
              placeholder="Enter amount"
            />
            <span v-show="errors.length" class="is-invalid">
              {{ errors[0] }}
            </span>
          </validation-provider>
        </div>
      </div>
      <div class="form-group mb-5">
        <label for="input-interval">Interval</label>
        <validation-provider
          v-slot="{ errors, classes }"
          name="recipient name"
          rules="required"
        >
          <div class="cs-select" :class="classes">
            <select v-model="form.interval" class="input">
              <option defaultValue hidden value="">Choose period</option>
              <option
                v-for="interval in interval_list"
                :key="interval"
                :value="interval"
              >
                {{ interval }}
              </option>
            </select>
          </div>
          <span v-show="errors.length" class="is-invalid">
            {{ errors[0] }}
          </span>
        </validation-provider>
      </div>
      <div class="form-group mb-5">
        <label for="input-interval">Status</label>
        <validation-provider
          v-slot="{ errors, classes }"
          name="recipient name"
          rules="required"
        >
          <div class="cs-select" :class="classes">
            <select v-model="form.status" class="input">
              <option defaultValue hidden value="">Choose status</option>
              <option
                v-for="stat in status"
                :key="stat"
                :value="stat"
              >
                {{ stat }}
              </option>
            </select>
          </div>
          <span v-show="errors.length" class="is-invalid">
            {{ errors[0] }}
          </span>
        </validation-provider>
      </div>
      <template v-slot:footer>
        <div class="flex flex-row mt-8">
          <v-button :loading="loading" class="flex">Update Plan</v-button>
        </div>
      </template>
    </v-form>
  </v-modal>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    show: { type: Boolean, default: false },
  },

  data() {
    return {
      loading: false,
      interval_list:['Monthly', 'Weekly', 'Daily', 'Single Payment'],
      status: ['active', 'pending', 'terminated'],
      form: {
        id: '',
        name: '',
        amount: '',
        interval: '',
        status: '',
      },
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
     console.log(this.form);
     }
  },
  mounted(){
    // fetch campaign
    this.$store.dispatch('app/fetchPlan');
  },
  methods: {
    hideModal() {
      this.$emit('hide')
    },
    onSubmit() {},
    onSuccess() {},
  },
}
</script>
