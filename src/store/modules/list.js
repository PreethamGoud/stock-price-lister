import axios from 'axios';

const state = {
    dates: [],
    options: [],
    chartData: []
};

const getters = {
    allDates: state => state.dates,
    allOptions: state => state.options,
    allChartData: state => state.chartData
};

const actions = {
    async fetchDates({ commit }, id) {
        const response = await axios.get(
            'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + id + '&apikey=OGC8RRGRZ5AO5JE7'
        );
        commit('setDates', response.data["Time Series (Daily)"]);
        //console.log(response.data["Time Series (Daily)"]);
        const dailyData = response.data["Time Series (Daily)"];
        if (dailyData) {
            const temp = [{
                data: Object.keys(dailyData).reduce((arr, d) => {
                    arr.push([new Date(d).getTime(), [dailyData[d]["1. open"], dailyData[d]["2. high"], dailyData[d]["3. low"], dailyData[d]["4. close"]]])
                    return arr;
                }, [])
            }];
            console.log(temp);
            commit('setChartData', temp);
        }

    },

    async fetchOptions({ commit }, dropdown) {
        const response = await axios.get(
            "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
            dropdown +
            "&apikey=OGC8RRGRZ5AO5JE7"
        );
        const temp = response.data.bestMatches.map(s => {
            return {
                id: s["1. symbol"],
                name: s["2. name"],
                ...s
            };
        });
        commit('setOptions', temp);
    },

    async filterData({ commit }, e) {
        const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText);
        commit('filterDates', limit);
    }
};

const mutations = {
    setDates: (state, dates) => (state.dates = dates),
    setOptions: (state, options) => (state.options = options),
    setChartData: (state, chartData) => (state.chartData = chartData),
    filterDates: (state, limit) => (state.dates = state.dates.slice(1, limit)),
};

export default {
    state,
    getters,
    actions,
    mutations
};