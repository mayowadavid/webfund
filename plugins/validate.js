import Vue from 'vue'
import {
  configure,
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
  extend,
} from 'vee-validate'
import { required, email, min, required_if } from 'vee-validate/dist/rules'
import parseMobile from 'libphonenumber-js/mobile'

configure({
  classes: {
    // multiple classes per flag! ['class-1', 'class-2']
    valid: 'is-valid',
    invalid: 'is-invalid',
    changed: 'is-changed',
    touched: 'is-touched',
    untouched: 'is-untouched',
    pristine: 'is-pristine',
    dirty: 'is-dirty',
    pending: 'is-pending',
    required: 'is-required',
    validated: 'is-validated',
    passed: 'is-passed',
    failed: 'is-failed',
  },
})

setInteractionMode('lazy')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required,
  message: 'This {_field_} field is required',
})

extend('phone', {
  message: 'This {_field_} is invalid.',
  validate: (value) => {
    const phoneNumber = parseMobile(value, 'NG')
    // console.log(phoneNumber)
    if (phoneNumber.isValid()) return true
    else return 'Invalid phone number format'
  },
})

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password confirmation does not match',
})

extend('url', {
  message: 'Invalid {_field_} url address',
  validate: (value) => {
    const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
    if (regex.test(value)) return true
    else return 'Invalid url format'
  },
})

extend('email', {
  ...email,
  message: 'Invalid email address',
})

extend('min', min)
extend('required_if', required_if)
