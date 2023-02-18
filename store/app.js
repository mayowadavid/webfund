// state
export const state = () => ({
  menu: false,
  formErrors: false,
  modal: false,
  noticeModal: null,
  redirectUrl: null,
  pageTitle: 'Dashboard',
  pageType: null,
  pageData: null,
  viewData: {},
  categories: [],
  selectables: {},
  banks: [],
  userDetails: null,
  accounts: null,
  done: [],
  allCampaign: [],
  campaign: {},
  plans: [],
  logs: [],
  classes: {
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

// getters
export const getters = {
  menu: (state) => state.menu,
  plans: (state) => state.plans,
  logs: (state) => state.logs,
  pageTitle: (state) => state.pageTitle,
  pageType: (state) => state.pageType,
  pageData: (state) => state.pageData,
  viewData: (state) => state.viewData,
  categories: (state) => state.categories,
  banks: (state) => state.banks,
  accounts: (state) => state.accounts,
  classes: (state) => state.classes,
}

// mutations
export const mutations = {
  SET_REDIRECT(state, url) {
    state.redirect_url = url
  },
  SET_PAGE_TITLE(state, title) {
    state.pageTitle = title
  },
  SET_PLAN(state, plan) {
    state.plans = plan
  },
  SET_LOGS(state, data) {
    state.logs = data
  },
  SET_MENU(state, status) {
    state.menu = status
  },
  SET_FORM_ERRORS(state, errors) {
    state.formErrors = errors
  },
  SET_MODAL(state, status) {
    state.modal = status
  },
  NOTICE_MODAL(state, options) {
    state.noticeModal = options
  },
  SET_TYPE(state, type) {
    state.pageType = type
  },
  SET_DATA(state, data) {
    state.pageData = data
  },
  SET_VIEW_DATA(state, data) {
    state.viewData = data
  },
  SET_CATEGORIES(state, data) {
    state.categories = data
  },
  SET_SELECTABLES(state, data) {
    state.selectables = data
  },
  SET_BANKS(state, data) {
    state.banks = data
  },
  SET_ACCOUNTS(state, data) {
    state.accounts = data
  },
  SET_CAMPAIGN(state, data) {
    state.campaign = data
  },
  SET_ALL_CAMPAIGN(state, data) {
    state.allCampaign = data
  },
  REMOVE_DATA(state, data) {
    const index = state.pageData.findIndex((d) => {
      return d.id === data.id
    })
    state.pageData.splice(index, 1)
  },
}

// actions
export const actions = {
  setPageTitle({ commit }, title) {
    commit('SET_PAGE_TITLE', title)
  },
  async getSelectables({ commit }) {
    try {
      const { data } = await this.$axios.get(`/selectables`)
      commit('SET_SELECTABLES', data.data)
    } catch (e) {}
  },
  async fetchCampaign({ commit }, id) {
    //console.log(id, '131')
    try {
      this.$axios.get(`/campaigns/${id}`).then(({ data }) => {
        commit('SET_CAMPAIGN', data.data.campaign)
      })
    } catch (e) {}
  },
  async fetchAllCampaign({ commit }) {
    try {
      const { data } = await this.$axios.get(`/campaigns`)
      commit('SET_ALL_CAMPAIGN', data.data.campaigns)
      return data.data.campaigns
    } catch (e) {}
  },
  async fetchPlan({ commit }) {
    try {
      this.$axios.get(`/plans`).then(({ data }) => {
        commit('SET_PLAN', data.data.plans)
      })
    } catch (e) {}
  },
  async fetchLogs({ commit }) {
    try {
      this.$axios.get(`/audit-logs`).then(({ data }) => {
        commit('SET_LOGS', data.data.auditLogs)
      })
    } catch (e) {}
  },
  gotoNext() {
    if (this.activeTab < 2) {
      this.done.push(this.activeTab)
      dispatch('updateStorage')
      setTimeout(() => {
        this.activeTab++
        window.scrollTo(0, 0)
      }, 100)
      // clear the house
      this.success = false
    }
  },
  updateStorage({ dispatch }, { form }) {
    const oldForm = localStorage.getItem('ajoo_signup')
    form = oldForm !== undefined ? { ...JSON.parse(oldForm), ...form } : form
    localStorage.setItem('ajoo_signup', JSON.stringify(form))
  },
  handleError({ dispatch }, { response }) {
    switch (response.status) {
      case 401: // Token expired 498
        dispatch('auth/logout', null, { root: true })
        break
      default:
    }
  },
}
