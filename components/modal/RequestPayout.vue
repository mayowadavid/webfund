<template>
  <v-modal
    :show="show"
    title="Request payout"
    backdrop="static"
    @hide="hideModal"
  >
    <v-form
      id="signup-form"
      ref="form"
      :loading.sync="loading"
      :on-submit="onSubmit"
      :on-success="onSuccess"
      success-message="Payout request created successfullly"
    >
      <!-- <div class="form-group mb-5">
        <label for="input-dispute_type">Recipient name</label>
        <validation-provider
          v-slot="{ errors, classes }"
          name="recipient name"
          rules="required"
        >
          <div class="cs-select" :class="classes">
            <select v-model="form.dispute_type" class="input">
              <option value="">Choose recipient</option>
              <option
                v-for="org_type in organization_types"
                :key="org_type.id"
                :value="org_type.id"
              >
                {{ org_type.name }}
              </option>
            </select>
          </div>
          <span v-show="errors.length" class="is-invalid">
            {{ errors[0] }}
          </span>
        </validation-provider>
      </div> -->
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
        <label for="input-assign_to">Settlement fee</label>
        <div>
          <validation-provider
            v-slot="{ errors, classes }"
            name="settlement fee"
            rules="required"
          >
            <input
              id="input-settlement_fee"
              v-model="form.settlement_fee"
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
      <template v-slot:footer>
        <div class="flex flex-row mt-8 gap-10 sm:gap-20">
          <v-button
            type="button"
            variant="light"
            class="flex mr-auto"
            @click.prevent="hideModal"
          >
            Cancel
          </v-button>
          <v-button :loading="loading" class="flex">Process Payment</v-button>
        </div>
      </template>
    </v-form>
  </v-modal>
</template>

<script>
export default {
  props: {
    show: { type: Boolean, default: false },
  },

  data() {
    return {
      loading: false,
      organization_types: require('@/static/json/organisation-type.json'),
      form: {
        dispute_type: '',
        description: '',
        assign_to: '',
      },
    }
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
