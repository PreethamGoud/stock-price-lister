<template>
    <div>
        <h1>Microsoft</h1>
        <div class="dates">
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
                    <td>{{propertyName}}</td>
                    <td>${{propertyName.open}}</td>
                    <td>${{propertyName.high}}</td>
                    <td>${{propertyName.low}}</td>
                    <td>${{propertyName.close}}</td>
                    <td>${{propertyName.volume}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    name: "list",
    methods: {
        ...mapActions(['fetchDates'])
    },
    computed: mapGetters(['allDates']),
    created() {
        this.fetchDates();
    }
}
</script>

<style>
.table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.table td, .table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.table tr:nth-child(even){background-color: #f2f2f2;}

.table tr:hover {background-color: #ddd;}

.table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4CAF50;
  color: white;
}
</style>
