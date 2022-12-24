export default async ({ store }) => {
  const token = store.getters['auth/token']
  if (!store.getters['auth/check'] && token && process.server) {
    return await store.dispatch('auth/checkAuth')
  }
}
