export default ({ store, redirect, query }) => {
  // if (store.getters['auth/check']) {
  //   return redirect('/')
  // }
  // console.log('Guest middleware log')
  if (query.rt) {
    store.commit('app/SET_REDIRECT', query.rt)
  }
}
