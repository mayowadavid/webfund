import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'ajoong',
    paths: [
      'auth.token',
      'auth.resetPassword',
      'auth.user',
      'auth.roles',
      'auth.adminOrg',
      'app.selectables',
    ],
    //overwrite: true,
    storage: {
      getItem: (key) => {
        return localStorage.getItem(key)
      },
      setItem: (key, value) => {
        localStorage.setItem(key, value, { expires: 365, secure: false })
      },
      removeItem: (key) => {
        localStorage.removeItem(key)
      },
    },
    // getState: async (key) => {
    //   const values = await localStorage.getItem(key)
    //   //console.log('Client getState:', JSON.parse(values), store.state)
    //   return JSON.parse(values)
    // },
    // arrayMerger: (store, saved) => {
    //   //console.log('Client array merger:', store, saved)
    //   return saved
    // },
    // rehydrated: (store) => {
    //   //console.log('Client rehydrated:', store)
    // },
  })(store)
}
