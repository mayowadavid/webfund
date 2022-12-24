export default ({ store, route, redirect }) => {
  if (store.getters['auth/user']) {
    const hasChangedPassword = _.get(
      store,
      'state.auth.user.has_changed_password',
      true
    )
    // should create/update password
    if (!hasChangedPassword && route.name !== 'reset-password') {
      const redirectUrl =
        route.path !== '/reset-password' ? '?rt=' + route.fullPath : ''
      return redirect('/reset-password' + redirectUrl)
    }
  }
}
