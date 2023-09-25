<template>
    <section>
      <div class="card">
        <h1>All Lists</h1>
        <div>
          <strong>Search: </strong>
          <input type="text"/>
        </div>
  
        <table>
        <div v-for="(list, index) in lists" :key="index">
          <tr>
              <td>list.displayName</td>
              <td><button>Play</button></td>
            </tr>
        </div>
        </table>
      </div>
    </section>
  </template>
    
  <script>
  // import SaveConfirmation from './SaveConfirmation.vue'
  // import { loadPeopleList, loadListDisplayName, saveList, } from '../../util.js'
  
  export default {
    data() {
      return {
        state: "edit", // edit | saved
        lists: [{}]
        people: [],
        newListId: this.whichList,
      };
    },
    methods: {
      async clickSaveList() {
        this.newListId = await saveList(this.whichList, this.people, this.listDisplayName);
        this.state = "saved";
      },
      addPerson() {
        this.people.push({ name: '', about: '', faceUrl: '' });
      },
      removePerson(index) {
        this.people.splice(index, 1)
      },
      continueEditing() {
        this.state = "edit";
      }
    },
    async mounted() {
      if (this.whichList) {
        this.people = await loadPeopleList(this.whichList);
        this.listDisplayName = await loadListDisplayName(this.whichList);
      } else {
        console.log("Will be creating a new list")
      }
    }
  };
  </script>
    
  <style scoped>
  .image-container {
    position: relative;
    overflow: hidden;
    max-height: 20rem;
    margin: 1rem;
  }
  
  table {
    margin-left: auto;
    margin-right: auto;
  }
  
  td {
    text-align: right;
  }
  </style>