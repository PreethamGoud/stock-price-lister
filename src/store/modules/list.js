import axios from 'axios';

const state = {
     dates: [],
};

const getters = {
    allDates: state => state.dates
};

const actions = {
    async fetchDates({ commit }, id, limit){
        const response = await axios.get(
            'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+id+'&apikey=OGC8RRGRZ5AO5JE7'
        );
        commit('setDates',response.data["Time Series (Daily)"]);
        //console.log(response.data["Time Series (Daily)"]);
    },
    async filterData({commit}, e) {
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        commit('filterDates',limit);
    }
};

const mutations = {
    setDates: (state, dates) => (state.dates = dates),
    filterDates:(state, limit) => (state.dates = state.dates.slice(1,limit))
};

export default {
    state,
    getters,
    actions,
    mutations
};