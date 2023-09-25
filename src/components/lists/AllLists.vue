<template>
  <section>
    <div class="card">
      <h1>All Lists</h1>
      <div>
        <strong>Search: </strong>
        <input style="width: 60%" type="text" v-model="searchTerm" placeholder="Search..." />
      </div>

      <table class="table">
        <tbody>
          <tr v-for="(list, index) in filteredRows" :key="index">
            <td>{{ list.displayName }}</td>
            <td><router-link :to="'/game/' + list.id">Play</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
    
<script>
import { loadAllLists, } from '../../util.js'

export default {
  data() {
    return {
      lists: [],
      searchTerm: "",
    };
  },
  computed: {
    filteredRows() {
      return this.lists.filter(row => {
        return Object.values(row).some(val =>
          String(val).toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    },
  },
  async mounted() {
    this.lists = await loadAllLists();
    console.log(this.lists);
    console.log(this.lists[2].displayName);
  }
};
</script>
    
<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.table thead {
  background-color: #004777;
  color: white;
}

.table tbody tr {
  transition: background-color 0.3s ease;
}

.table tbody tr:nth-of-type(odd) {
  background-color: white;
}

.table tbody tr:nth-of-type(even) {
  background-color: #F1F1F3;
}

.table tbody td {
  padding: 10px;
  border-bottom: 1px solid #BEBEC2;
}
</style>