import Vue from 'vue'
import Vuex from 'vuex'
import {api} from "../api/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        error: null
    },
    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        async fetchCurrency({commit}) {
            try {
                return await api.getAllCurrency();
            } catch (e) {
                commit('setError', e);
                throw e
            }
        },
        async updateCurrency({commit}, {id, date}) {
            try {
                return await api.getCurrentCurrency(id, date);
            } catch (e) {
                commit('setError', e);
                throw e
            }
        }
    },
    modules: {}
})
