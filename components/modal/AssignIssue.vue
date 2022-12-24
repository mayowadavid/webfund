<template>
  <v-modal
    :show="show"
    title="Assign Issue"
    backdrop="static"
    @hide="hideModal"
  >
    <v-form
      id="signup-form"
      ref="form"
      :loading.sync="loading"
      :on-submit="onSubmit"
      :on-success="onSuccess"
      success-message="Team member update successfullly"
    >
      <div class="form-group mb-5">
        <label for="input-dispute_type">Dispute type</label>
        <validation-provider
          v-slot="{ errors, classes }"
          name="dispute type"
          rules="required"
        >
          <div class="cs-select" :class="classes">
            <select v-model="form.dispute_type" class="input">
              <option value="">Choose type</option>
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
      </div>
      <div class="form-group mb-5">
        <label for="input-description">Dispute description</label>
        <div>
          <validation-provider
            v-slot="{ errors, classes }"
            name="dispute description"
            rules="required"
          >
            <textarea
              id="input-description"
              v-model="form.description"
              class="form-input"
              :class="classes"
              placeholder="Enter your text here"
            >
            </textarea>
            <span v-show="errors.length" class="is-invalid">
              {{ errors[0] }}
            </span>
          </validation-provider>
        </div>
      </div>
      <div class="form-group mb-5">
        <label for="input-assign_to">Assign to</label>
        <validation-provider
          v-slot="{ errors, classes }"
          name="user"
          rules="required"
        >
          <div class="cs-select" :class="classes">
            <select v-model="form.assign_to" class="input">
              <option value="">Select User</option>
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
      </div>
      <template v-slot:footer>
        <div class="mt-8">
          <v-button :loading="loading" class="flex">Assign Dispute</v-button>
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
