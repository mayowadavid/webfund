export default ({ store, redirect, query, route }) => {
  // set redirect route
  if (query.rt) {
    console.log(query.rt, 'mid')
    store.commit('app/SET_REDIRECT', query.rt)
  }
  // no session
  if (!store.getters['auth/check']) {
    if (store.getters['auth/user']) {
      store.dispatch('auth/logout')
      const redirectUrl = route.path !== '/login' ? '?rt=' + route.fullPath : ''
      return redirect('/login' + redirectUrl)
    } else {
      return redirect('/home')
    }
  }
}
