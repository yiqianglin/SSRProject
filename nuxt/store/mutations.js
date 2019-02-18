import { app as types } from './mutation-types'

const mutations = {
    [types.SET_HOT_DISEASES] (state, data) {
        state.hotList = data
    },
    [types.SET_DEPARTMENT_LIST] (state, data) {
        state.departmentList = data
    },
    [types.SET_KEYSTONE_LIST] (state, data) {
        state.keystoneList = data
    },
    [types.SET_CANCER_LIST] (state, data) {
        state.cancerList = data
    }
}

export default mutations
