<template>
<v-modal
    :show="show"
    title="Make donation"
    backdrop="static"
    @hide="hideModal"
  >
    <v-form
                  id="donation-form"
                  ref="form"
                  :loading.sync="loading"
                  :on-submit="onSubmit"
                  :on-success="onSuccess"
                  success-message="Donation created successfullly"
                >
                  <div class="form-group mb-5">
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="donation"
                        rules="required"
                      >
                        <input
                          id="input-donation"
                          v-model="form.donation"
                          class="form-input"
                          :class="classes"
                          placeholder="₦ Enter your donation"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="mb-5">
                    <span class="text-blue-600">Platform fee:</span>
                    <span class="form-input text-blue-600">{{
                      form.donation && !isNaN(form.donation)
                        ? (5 / 100) * Number(form.donation)
                        : 0
                    }}</span>
                  </div>
                  <div class="form-group mb-5">
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="first_name"
                        rules="required"
                      >
                        <input
                          id="input-first_name"
                          v-model="form.first_name"
                          class="form-input"
                          :class="classes"
                          placeholder="First name"
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
                        name="last_name"
                        rules="required"
                      >
                        <input
                          id="input-last_name"
                          v-model="form.last_name"
                          class="form-input"
                          :class="classes"
                          placeholder="Last name"
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
                        name="address"
                        rules="required"
                      >
                        <input
                          id="input-address"
                          v-model="form.email"
                          class="form-input"
                          :class="classes"
                          placeholder="Email address"
                        />
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                  <div class="form-group mb-5">
                      <label for="input-description">Comments</label>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="comment"
                        rules="required"
                      >
                        <textarea
                          id="input-description"
                          v-model="form.comment"
                          class="form-input"
                          :class="classes"
                          placeholder="Comment"
                        >
                        </textarea>
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                  </div>
                  <div class="form-group mb-5">
                    <div>
                      <validation-provider
                        v-slot="{ errors, classes }"
                        name="address"
                        rules="required"
                      >
                        <v-checkbox
                          v-model="form.hide_public"
                          name="ussd"
                          value="ussd"
                          :class="classes"
                        >
                          Hide my information from the public
                        </v-checkbox>
                        <span v-show="errors.length" class="is-invalid">
                          {{ errors[0] }}
                        </span>
                      </validation-provider>
                    </div>
                  </div>
                  <template v-slot:footer>
                    <div class="flex flex-row mt-5">
                      <v-button
                        :loading="loading"
                        block
                        class="mb-6"
                      >
                        Continue
                      </v-button>
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
              donation: '5000',
              first_name: 'mayowa',
              last_name: 'david',
              email: 'mayowadavid100@gmail.com',
              comment: 'Life always finds a way. God is good and will be with you all the days of your lifes. I pray to give you the strength that you need.Im happy I could help a little.'
            },
    }
  },
  methods: {
    onSubmit() {

    },
    hideModal() {
      this.$emit('hide')
    },
    onSuccess(resp) {

     },
  },
}
</script>
