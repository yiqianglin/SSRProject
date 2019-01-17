/*
 * @Author: arvinlin
 * @Date: 2018-07-17 19:57:49
 * @Last Modified by: arvinlin
 * @Last Modified time: 2019-01-17 16:26:47
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import State from './state'

Vue.use(Vuex)

const debug = true

export function createStore () {
    return new Vuex.Store({
        modules: {
        },
        actions,
        mutations,
        state: new State({}),
        strict: debug
    })
}
