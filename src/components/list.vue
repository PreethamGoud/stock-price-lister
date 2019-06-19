<template>
  <div id="main">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">Stock Price Lister</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <Dropdown
            :options="options"
            v-on:selected="validateSelection"
            v-on:filter="getDropdownValues"
            :disabled="false"
            :maxItem="10"
            placeholder="Please select a Company"
          ></Dropdown>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <h2>{{heading}}</h2>
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
import axios from "axios";
import Dropdown from "vue-simple-search-dropdown";
Vue.use(Dropdown);
import { mapGetters, mapActions } from "vuex";
import { constants } from "crypto";
export default {
  name: "list",
  methods: {
    ...mapActions(["fetchDates"]),
    getDropdownValues(dropdown) {
      axios
        .get(
          "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" +
            dropdown +
            "&apikey=OGC8RRGRZ5AO5JE7"
        )
        .then(response => {
          this.options = response.data.bestMatches.map(s => {
            return {
              id: s["1. symbol"],
              name: s["2. name"],
              ...s
            };
          });
        });
      //.then(() => console.log(this.options));
    },
    validateSelection(dropdown) {
      this.heading = dropdown.name;
      this.fetchDates(dropdown.id);
    }
  },
  computed: mapGetters(["allDates"]),
  components: {
    Dropdown
  },
  data() {
    return {
      options: [],
      heading: ""
    };
  }
};
</script>

<style>
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
