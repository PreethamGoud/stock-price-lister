<template>
  <div id="main">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">Stock Price Lister</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <Dropdown
            :options="allOptions"
            v-on:selected="validateSelection"
            v-on:filter="getDropdownValues"
            :disabled="false"
            :maxItem="10"
            placeholder="Please select a Company"
          ></Dropdown>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <h2>{{ heading }}</h2>

    <div class="container">
      <VueApexCharts width="1000" type="candlestick" :options="options" :series="allChartData"></VueApexCharts>
    </div>

    <b-card class="mb-2 sub" style="margin-left:5%;">
      <b-card-body style="padding:0">
        <div class="scroll">
          <table class="table">
            <tr>
              <th>Date</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
              <th>Volume</th>
            </tr>
            <tr v-for="(date, propertyName) in allDates" :key="propertyName">
              <td>{{ propertyName }}</td>
              <td>$ {{date["1. open"]}}</td>
              <td>$ {{date["2. high"]}}</td>
              <td>$ {{date["3. low"]}}</td>
              <td>$ {{date["4. close"]}}</td>
              <td>$ {{date["5. volume"]}}</td>
            </tr>
          </table>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import Dropdown from "vue-simple-search-dropdown";
Vue.use(Dropdown);
import { mapGetters, mapActions } from "vuex";
import VueApexCharts from "vue-apexcharts";

export default {
  name: "list",
  methods: {
    ...mapActions(["fetchDates", "fetchOptions",]),
    getDropdownValues(dropdown) {
      this.fetchOptions(dropdown);
    },

    validateSelection(dropdown) {
      this.heading = dropdown.name;
      this.fetchDates(dropdown.id);
    }
  },

  computed: mapGetters(["allDates", "allOptions","allChartData"]),

  components: {
    Dropdown,
    VueApexCharts
  },

  data() {
    return {
      heading: "",
      options: {
        chart: {
          id: "vuechart-example"
        }
      },
    };
  }
};
</script>

<style>
.chart {
  background: #212733;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  margin: 25px 0;
}
.container {
  max-width: 800px;
  margin: 0 auto;
}
#main {
  display: flex;
  height: 100%;
  flex-direction: column;
}
#sub {
  flex-grow: 1;
}
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 90%;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
.scroll {
  overflow-y: auto;
}
.table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.table td,
.table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #ddd;
}

.table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #69696d;
  color: white;
}
</style>
