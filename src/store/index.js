import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
                const res = await axios.get(`http://www.nbrb.by/api/exrates/rates?periodicity=0`);
                return res.data;
            } catch (e) {
                commit('setError', e);
                throw e
            }
        },
        async updateCurrency({commit}, {id, date}) {
            try {
                const res = await axios.get(`http://www.nbrb.by/api/exrates/rates/${id}?ondate=${date}`);
                return res.data;
            } catch (e) {
                commit('setError', e);
                throw e
            }
        }
    },
    modules: {}
})
