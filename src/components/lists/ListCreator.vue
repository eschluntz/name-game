<template>
  <section>
    <save-confirmation v-if="state == 'saved'" :list-display-name="listDisplayName" :new-list-id="newListId"
      @continue-editing="continueEditing"></save-confirmation>
    <div class="card" v-else>
      <h1>Create List</h1>
      <div>
        <strong>List Title: </strong>
        <input type="text" v-model.trim="listDisplayName" />
      </div>
      <h3>People:</h3>

      <div v-for="(person, index) in people" :key="index">
        <table>
          <tr>
            <td><strong class="form-label">Name: </strong></td>
            <td><input type="text" required="true" v-model.trim="person.name" /></td>
          </tr>
          <tr>
            <td><strong class="form-label">About: </strong></td>
            <td><input type="text" v-model.trim="person.about" /></td>
          </tr>
          <tr>
            <td><strong class="form-label">Picture URL: </strong></td>
            <td><input type="text" v-model.trim="person.faceUrl"
                title="Find the picture you want online, right click and select 'copy image address'" /></td>
          </tr>
        </table>
        <div class="image-container">
          <img :src="person.faceUrl" />
        </div>
        <button @click="removePerson(index)">Remove</button>
        <hr>
      </div>
      <button @click="addPerson">Add another</button>
      <button class="throbbing" @click="clickSaveList">Save List</button>
    </div>
  </section>
</template>
  
<script>
import SaveConfirmation from './SaveConfirmation.vue'
import { loadPeopleList, loadListDisplayName, saveList, } from '../../util.js'

export default {
  components: {
    SaveConfirmation,
  },
  props: ['whichList'],
  data() {
    return {
      state: "edit", // edit | saved
      listDisplayName: "",
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