// state
export const state = () => ({
  user: null,
  org: null,
  report: null,
  roles: null,
  token: null,
  resetPassword: false,
  donations: null,
  bank: null,
  allOrg: null,
  orgDoc: null,
  adminOrg: null,
})

// getters
export const getters = {
  user: (state) => state.user,
  check: (state) => state.token,
  token: (state) => state.token,
  org: (state) => state.org,
  report: (state) => state.report,
  orgDoc: (state) => state.orgDoc,
  allOrg: (state) => state.allOrg,
  adminOrg: (state) => state.adminOrg,
  donations: (state) => state.donations,
}

// mutations
export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },

  SET_ADMIN_ORG(state, adminOrg) {
    state.adminOrg = adminOrg
  },

  SET_USER_ID(state, userId) {
    state.user_id = userId
  },

  SET_ORG(state, org) {
    state.org = org
  },

  SET_DONATIONS(state, don) {
    state.donations = don
  },

  SET_ORG_DOC(state, orgDoc) {
    state.orgDoc = orgDoc
  },

  SET_RESET_PASSWORD(state, reset) {
    state.resetPassword = reset
  },

  FETCH_USER_SUCCESS(state, user) {
    state.user = user
  },

  SET_ORGANIZATION(state, org) {
    state.org = org
  },

  SET_REPORT(state, report) {
    state.report = report
  },

  SET_ALL_ORGANIZATION(state, allOrg) {
    state.allOrg = allOrg
  },

  FETCH_USER_FAILURE(state) {
    state.token = null
    state.user = null
  },

  LOGOUT(state) {
    state.token = null
    state.user = null
    state.user_id = null
  },

  UPDATE_BANK(state, bank) {
    state.bank = bank
  },

  UPDATE_USER(state, { user }) {
    state.user = user
  },

  UPDATE_ROLES(state, roles) {
    state.roles = roles
  },
}

// actions
export const actions = {
  async onSuccess({ dispatch, commit }, data) {
    if (data.data?.user !== undefined) {
      // Save the token.

      const { user } = data.data
      await dispatch('saveToken', {
        user,
      })

      if (user.role == 'admin') {
        //set admin details to memory
        commit('SET_ADMIN_ORG', user)
        // Redirect home.
        this.$router.push('/admin-view')
      } else if (user.status == 'active') {
        // check for active status.
        this.$router.push('/')
      } else {
        // for new user
        this.$router.push('/get-started')
      }
    } else {
      let user = data.data
      await dispatch('saveToken', {
        user,
      })
    }
  },

  saveToken({ commit }, { user }) {
    const { token, organisation, role } = user
    commit('SET_TOKEN', token)
    commit('UPDATE_ROLES', role)
    commit('SET_ORG', organisation)
    commit('FETCH_USER_SUCCESS', user)
    // Cookies.set('token', token, { expires: remember })
    // Cookies.set('user_id', userId, { expires: remember })
  },
  async setUserData({ commit }, data) {
    console.log(data)
    const userData = JSON.parse(localStorage.getItem('ajoong'))
    commit('SET_TOKEN', userData.auth.token)
    const result = await this.$axios.get(`/users/${data?.userId}`)
    let { user } = result.data.data
    const { org } = data
    commit('UPDATE_ROLES', userData.role)
    commit('FETCH_USER_SUCCESS', user)
    //fetch org
    const orgData = await this.$axios.get(`/organisations/${org.id}`)

    const { organisation } = orgData.data.data
    console.log(organisation)
    //save organization
    commit('SET_ORGANIZATION', organisation)
    this.$router.push('/')
  },
  fetchOrganization({ commit, state }) {
    this.$axios
      .get(`/organisations/${state.user.organisation.id}`)
      .then(({ data }) => {
        commit('SET_ORGANIZATION', data.data.organisation)
      })
  },
  async fetchOrganizationCamp({ commit, state }) {
    const { data } = await this.$axios.get(
      `/organisations/${state.user.organisation.id}/campaigns`
    )
    return data.data
  },
  fetchAllOrganization({ commit, state }) {
    this.$axios.get(`/organisations`).then(({ data }) => {
      commit('SET_ALL_ORGANIZATION', data.data.organisations)
    })
  },
  fetchOrganizationReport({ commit, state }) {
    this.$axios
      .get(`/organisations/${state.user.organisation.id}/dashboard`)
      .then(({ data }) => {
        commit('SET_REPORT', data.data)
      })
  },
  createCampaign({ commit }, campData) {
    try {
      return this.$axios.post(`/campaigns`, campData)
    } catch (e) {}
  },
  updateCampaign({ commit }, campData) {
    try {
      return this.$axios.post(`/campaigns/${campData.campId}`, campData)
    } catch (e) {}
  },
  updateOrganization({ commit, state }, orgData) {
    this.$axios
      .put(`/organisations/${state.user.organisation.id}`, orgData)
      .then((data) => {
        console.log(data)
      })
      .catch((e) => {
        console.log(e)
      })
  },
  async fetchUser({ commit, state }) {
    try {
      const { data } = await this.$axios.get(`/users/${state.user.id}`)
      // implement reset password redirect
      // console.log('fetch user success: ', data.data)
      //if (state.resetPassword) data.data.has_changed_password = false
      // commit user data
      commit('FETCH_USER_SUCCESS', data.data)
    } catch (e) {
      // console.log('fetch user failed: ', e)
      // dispatch('app/handleError', e, { root: true })
      commit('FETCH_USER_FAILURE')
    }
  },

  async userFetch({ commit }, value) {
    try {
      const id = parseInt(value.user_id)
      const { data } = await this.$axios.get(`/users/${id}`)
      // implement reset password redirect
      // console.log('fetch user success: ', data.data)
      //if (state.resetPassword) data.data.has_changed_password = false
      // commit user data
      commit('FETCH_USER_SUCCESS', data.data)
    } catch (e) {
      // console.log('fetch user failed: ', e)
      // dispatch('app/handleError', e, { root: true })
      commit('FETCH_USER_FAILURE')
    }
  },

  async checkAuth({ commit }) {
    try {
      const userData = JSON.parse(localStorage.getItem('ajoong'))
      console.log(userData, '138')
      const result = await this.$axios.get(`/users/${userData?.auth.user.id}`)
      let { user } = result.data.data

      //fetch org
      const orgData = this.$axios.get(
        `/organisations/${userData.organisation.id}`
      )
      const { organisation } = orgData.data.data
      //save organization
      commit('SET_ORGANIZATION', organisation)
      // commit user data
      user.organisation = organisation
      await dispatch('saveToken', {
        user,
      })
      await dispatch('fetchUser')
    } catch (e) {
      commit('FETCH_USER_FAILURE')
    }
  },

  async fetchBank({ commit, state }) {
    try {
      const uid = state.user.id
      const { data } = await this.$axios.get(`/${uid}/bank-information`)
      // console.log('fetch bank success: ', data.data)
      commit('UPDATE_BANK', data.data)
    } catch (e) {}
  },

  async fetchDocuments({ commit, state }) {
    try {
      const { data } = await this.$axios.get(
        `/organisations/${state.user.organisation.id}/documents`
      )
      commit('SET_ORG_DOC', data.data.organisation)
    } catch (e) {}
  },

  async acceptDocuments({ commit, state }, status) {
    try {
      commit('SET_TOKEN', state.adminOrg.token)
      return this.$axios.get(
        `/organisations/${state.user.organisation.id}/documents?status=${status}`
      )
    } catch (e) {}
  },

  async fetchDonations({ commit, state }, status) {
    try {
      commit('SET_TOKEN', state.adminOrg.token)
      const { data } = await this.$axios.get(`/donations`)
      commit('SET_DONATIONS', data.data.donation)
    } catch (e) {}
  },

  async viewDonations({ commit, state }, id) {
    try {
      commit('SET_TOKEN', state.adminOrg.token)
      const { data } = await this.$axios.get(`/donations/${id}`)
      return data.data
    } catch (e) {}
  },

  async fetchPayout({ commit, state }) {
    try {
      const { data } = await this.$axios.get(`/payouts`)
      return data.data
    } catch (e) {}
  },

  async fetchDisputes({ commit, state }) {
    try {
      const { data } = await this.$axios.get(`/disputes`)
      return data.data
    } catch (e) {}
  },

  async viewPayout({ commit, state }, id) {
    try {
      const { data } = await this.$axios.get(`/payouts`)
      return data.data
    } catch (e) {}
  },

  async inviteTeam({ commit, state }, team) {
    try {
      return this.$axios.get(
        `/organisations/${state.user.organisation.id}/teams`,
        team
      )
    } catch (e) {}
  },

  async deleteTeam({ commit, state }, id) {
    try {
      return this.$axios.delete(
        `/organisations/${state.user.organisation.id}/teams/${id}`,
        team
      )
    } catch (e) {}
  },

  async createOrganisation({ commit }, form) {
    const {
      phone_number,
      organization_name,
      organization_type,
      organization_category,
      website,
      description,
      organization_phone_number,
      address,
      city,
      state,
      country,
    } = form
    try {
      this.$axios.post(`/organisations`, {
        name: organization_name,
        type: organization_type,
        category: organization_category,
        description,
        website,
        city,
        state,
        country,
        address,
        phone: organization_phone_number,
      })
    } catch (e) {}
  },

  async addDirector({ commit, state }, form) {
    const {
      fullname,
      email,
      phone,
      address,
      means_of_identification,
      identification_file,
    } = form
    var formdata = new FormData()
    formdata.append('fullname', fullname)
    formdata.append('email', email)
    formdata.append('phone', phone)
    formdata.append('address', address)
    formdata.append('means_of_identification', means_of_identification)
    formdata.append('identification_file', identification_file, 'customs.PNG')
    try {
      const { data } = await this.$axios.post(
        `/organisations/${state.org.id}/directors`,
        formdata
      )
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  },

  async addDocuments({ commit, state }, form) {
    try {
      const {
        rc_number,
        tin,
        certificate_of_incorporation,
        memorandum_and_articles_of_association,
        cac_1_1,
        means_of_identification,
        identification,
      } = form
      console.log(form)
      let formdata = new FormData()
      formdata.append('rc_number', rc_number)
      formdata.append('tin', tin)
      formdata.append(
        'certificate_of_incorporation',
        certificate_of_incorporation
      )
      formdata.append(
        'memorandum_and_articles_of_association',
        memorandum_and_articles_of_association
      )
      formdata.append('cac_1_1', cac_1_1)
      formdata.append('means_of_identification', means_of_identification)
      formdata.append('identification', identification)
      this.$axios.patch('/organisations/documents', formdata).then((data) => {
        console.log(data)
      })
    } catch (e) {
      console.log(e)
    }
  },

  async fetchRoles({ commit }) {
    try {
      const { data: roles } = await this.$axios.get(`/access/roles`)
      // console.log('fetch bank success: ', data.data)
      commit('UPDATE_ROLES', roles.data)
    } catch (e) {}
  },

  async fetchNotification({ commit }) {
    try {
      const { data } = await this.$axios.get(`/notifications/`)
      // console.log('fetch bank success: ', data.data)
      return data.data
    } catch (e) {}
  },

  async fetchTeams({ commit, state }) {
    try {
      const { data } = await this.$axios.get(
        `/organisations/${state.user.organisation.id}/teams`
      )
      // console.log('fetch bank success: ', data.data)
      return data.data
    } catch (e) {}
  },

  async fetchTeam({ commit, state }, id) {
    try {
      const { data } = await this.$axios.get(
        `/organisations/${state.user.organisation.id}/teams/${id}`
      )
      // console.log('fetch bank success: ', data.data)
      return data.data
    } catch (e) {}
  },

  async uploadCampaignPhoto({ commit }, form) {
    //upload campaign images
    const { id, files } = form
    try {
      let formdata = new FormData()

      for (let i = 0; i < files.length; i++) {
        formdata.append('photo', files[i])
      }
      this.$axios.post(`/campaigns/${id}/photos`, formdata).then((data) => {
        console.log(data)
      })
    } catch (e) {
      console.log(e)
    }
  },

  async uploadLogo({ commit }, form) {
    try {
      const { files, id } = form
      //upload logo
      var formdata = new FormData()
      formdata.append('logo', files)
      this.$axios.post(`/organisations/${id}/logo`, formdata).then((data) => {
        console.log(data)
      })
    } catch (e) {
      console.log(e)
    }
  },

  async verifyDonation({ commit }, ref) {
    try {
      const { data } = await this.$axios.get(`/donations/verify/${ref}`)
      // verify payment
      console.log(data)
    } catch (e) {}
  },

  async markNotification({ commit }, ref) {
    try {
      const { data } = await this.$axios.get(`/notifications/${ref}/seen`)
    } catch (e) {}
  },

  async createDonation({ commit }, form) {
    try {
      return this.$axios.post(`/donations`, form)
      // create donations
    } catch (e) {
      console.log(e)
    }
  },

  async createUser({ commit }, userData) {
    const { first_name, last_name, email, password } = userData
    try {
      return this.$axios.post(`/users`, {
        fullname: first_name + ' ' + last_name,
        email,
        role: 'user',
        password,
      })
    } catch (e) {}
  },

  async updateUser({ commit }, userData) {
    try {
      this.$axios.get(`/users`, userData)
      // fetch user
      await dispatch('fetchUser')
    } catch (e) {}
  },

  async logout({ commit }) {
    try {
      commit('LOGOUT')
      localStorage.clear()
      sessionStorage.clear()
      Cookies.remove('ajoong')
    } catch (e) {}

    commit('LOGOUT')
  },
}
