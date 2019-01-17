/* global baike */
import * as types from './mutation-types'
import { request } from 'src/js/common'

const actions = {
    async getHotList ({ commit, rootState }) {
        let result = await request({
            url: 'GetHotDiseasesV2',
            method: 'POST',
            params: {
                type: 0
            }
        })
        if (result.retcode === 0) {
            commit(types.app.SET_HOT_DISEASES, result.data || result.activelist)
        }
        return result
    },
    async getActiveDataTop ({ commit }) {
        let result = await request({
            url: 'GetActiveData',
            method: 'POST',
            params: {
                activetype: 12,
                name: ''
            }
        })
        if (result.retcode === 0) {
            commit(types.app.SET_DEPARTMENT_LIST, result.data || result.activelist)
        }
        return result
    },
    async getKeystoneList ({ commit }) {
        let result = await request({
            url: 'GetActiveData',
            method: 'POST',
            params: {
                activetype: 11,
                name: ''
            }
        })
        if (result.retcode === 0) {
            commit(types.app.SET_KEYSTONE_LIST, result.data || result.activelist)
        }
        return result
    },
    async getCancerList ({ commit }) {
        let result = await request({
            url: 'GetTumourDiseases',
            method: 'POST',
            params: {
            }
        })
        if (result.retcode === 0) {
            commit(types.app.SET_CANCER_LIST, result.data || result.list)
        }
        return result
    }
}

export default actions
