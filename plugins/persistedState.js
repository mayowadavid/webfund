import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import { cookieFromRequest } from '~/utils'

export default ({ store, req }) => {
  createPersistedState({
    key: 'ajoong',
    paths: ['auth.token', 'auth.resetPassword'],
    storage: {
      getItem: (key) => {
        // See https://nuxtjs.org/guide/plugins/#using-process-flags
        if (process.server) {
          return cookieFromRequest(req, key)
        } else {
          return Cookies.get(key)
        }
      },
      // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
      setItem: (key, value) => {
        Cookies.set(key, value, { expires: 365, secure: false })
      },
      removeItem: (key) => {
        Cookies.remove(key)
      },
    },
  })(store)
}
