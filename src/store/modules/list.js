import axios from 'axios';

const state = {
     dates: [],
};

const getters = {
    allDates: state => state.dates
};

const actions = {
    async fetchDates({ commit }, id){
        const response = await axios.get(
            'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+id+'&apikey=OGC8RRGRZ5AO5JE7'
        );
        commit('setDates',response.data["Time Series (Daily)"]);
        //console.log(response.data["Time Series (Daily)"]);
    }
};

const mutations = {
    setDates: (state, dates) => (state.dates = dates)
};

export default {
    state,
    getters,
    actions,
    mutations
};