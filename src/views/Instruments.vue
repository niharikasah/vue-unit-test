<style scoped>
.asc::after {
  display: inline-block;
  content: '▼';
  padding: 2px;
  cursor: pointer;
}
.desc::after {
  display: inline-block;
  content: '▲';
  padding: 2px;
  cursor: pointer;
}
</style>

<template>

<div class="home">
    <div class="navbar navbar-nav sticky-top bg-light">
        <img src="../assets/jpmorganchase.png" width="" height="60px">
    </div>
    <div class="col-md-12 mt-2 centeralign">
        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col" :class="sortedClass('ticker')" @click="sortBy('ticker', true)">Ticker</th>
                    <th scope="col" :class="sortedClass('price')" @click="sortBy('price', true)">Price</th>
                    <th scope="col" :class="sortedClass('assetClass')" @click="sortBy('assetClass', true)">Asset Class</th>
                </tr>
            </thead>
            <!--TBODY for grouped data-->
<!--            <tbody v-for="(instrument , assetClass) in groupedItems" :key="assetClass">
                <tr v-for="(item, index) in instrument" :key="index" :class="rowClass(assetClass)">
                    <th scope="row">{{index+1}}</th>
                    <td>{{item.ticker}}</td>
                    <td :class="(item.price > 0)? 'text-primary':'text-danger'">{{item.price}}</td>
                    <td>{{item.assetClass}}</td>
                </tr>
            </tbody>-->
            <tbody id="instrumentBody">
                <tr v-for="(item, index) in sortedInstruments" :key="index" :class="rowClass(item.assetClass)">
                    <th scope="row">{{index+1}}</th>
                    <td>{{item.ticker}}</td>
                    <td :class="(item.price > 0)? 'text-primary':'text-danger'">{{item.price}}</td>
                    <td>{{item.assetClass}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import axios from 'axios'

export default {
    name: 'instruments',
    computed: {
//        in case grouping is needed by asset class
//        groupedItems() {
//            const groups = {};
//            this.instrumentlist.forEach(item => {
//              if(groups[item.assetClass]) {
//                groups[item.assetClass].push(item);
//              } else {
//                groups[item.assetClass] = [item];
//              }
//            });
//            if (this.sort.key) {
//             this.instrumentlist.sort((a, b) => {
//
//              a = a[this.sort.key]
//              b = b[this.sort.key]
//
//              return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
//             });
//            }
//            return groups;
//        }
        sortedInstruments() {
             const items = this.instrumentlist;
             if (this.sort.key && items) {
                items.sort((a, b) => {

                 a = a[this.sort.key]
                 b = b[this.sort.key]

                 return (a === b ? 0 : a > b ? 1 : -1) * (this.sort.isAsc ? 1 : -1)
                });
            }
            return items;
        }
    },
    mounted() {
        this.getList().then(response => {
            this.instrumentlist = response;
        }).catch(error => {
            console.error(error); 
        });
    },
    data() {
        return {
            sort: {
                key: 'assetClass',
                isAsc: false,
                sorted: false
            },
            instrumentlist: []
        }
    },
    components: {
    },
    methods: {
        async getList(){
            const url = 'assets/samplejson/instrumentlist.json';
            const response =  await  fetch(new URL(url, process.env.BASE_URL || window.location.origin, {method: 'GET'}));
            const list = await response.json();
            return list;
        },
        sortedClass (key) {
            return this.sort.key === key ? `sorted ${this.sort.isAsc ? 'asc' : 'desc' }` : '';
        },
        rowClass (key) {
            switch(key){
                case "Equities":
                  return 'table-primary';
                case "Credit":
                  return 'table-success';
                default:
                  return 'table-light';
            }
        },
        sortBy (key, sort) {
            this.sorted = sort;
            this.sort.isAsc = this.sort.key === key ? !this.sort.isAsc : false;
            this.sort.key = key;
        }
    }
}

</script>
