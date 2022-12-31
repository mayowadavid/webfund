// state
export const state = () => ({
  user: null,
  org: null,
  roles: null,
  token: null,
  resetPassword: false,
  bank: null,
})

// getters
export const getters = {
  user: (state) => state.user,
  check: (state) => state.token,
  token: (state) => state.token,
  org: (state) => state.org,
}

// mutations
export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
  },

  SET_USER_ID(state, userId) {
    state.user_id = userId
  },

  SET_ORG(state, org) {
    state.org = org
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
  async onSuccess({ dispatch }, data) {
    if (data) {
      // Save the token.

      const { user } = data.data
      console.log(user)
      await dispatch('saveToken', {
        user,
      })
      // Redirect home.
      this.$router.push('/')
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
  fetchOrganization({ commit, state }) {
    this.$axios
      .get(`/organisations/${state.user.organisation.id}`)
      .then(({ data }) => {
        commit('SET_ORGANIZATION', data.data.organisation)
      })
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
      const userData = JSON.parse(localStorage.getItem('user'))
      console.log(userData, '138')
      const { data } = await this.$axios.get(`/users/${userData?.id}`)
      const { user } = data.data
      // commit user data
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
      const { data } = await this.$axios.post(`/organisations`, {
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
      console.log(data, '194')
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

  async fetchRoles({ commit }) {
    try {
      const { data: roles } = await this.$axios.get(`/access/roles`)
      // console.log('fetch bank success: ', data.data)
      commit('UPDATE_ROLES', roles.data)
    } catch (e) {}
  },

  async verifyDonation({ commit }, ref) {
    try {
      const { data } = await this.$axios.get(`/donations/verify/${ref}`)
      // verify payment
      console.log(data)
    } catch (e) {}
  },

  async createDonation({ commit }, form) {
    try {
      return this.$axios.post(`/donations`, form)
      // create donations
      //console.log(data)
    } catch (e) {
      console.log(e)
    }
  },

  async createUser({ commit }, userData) {
    const { first_name, last_name, email, password } = userData
    try {
      this.$axios
        .post(`/users`, {
          fullname: first_name + ' ' + last_name,
          email,
          role: 'user',
          password,
        })
        .then((data) => {
          console.log(data, '242')
          dispatch('fetchUser')
          dispatch('createOrganisation', userData)
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
      await this.$axios.get('/logout')
    } catch (e) {}

    commit('LOGOUT')
  },
}
