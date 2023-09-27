<template>
  <section>
    <save-confirmation v-if="state == 'saved'" :list-display-name="listDisplayName" :whichList="whichList"
      @continue-editing="continueEditing"></save-confirmation>
    <div class="card" v-else>
      <h1>Create List</h1>
      <form @submit.prevent="validateAndSaveList">
        <div>
          <strong>List Title: </strong>
          <input type="text" v-model.trim="listDisplayName" required />
        </div>
        <h3>People:</h3>

        <div v-for="(person, index) in people" :key="index">
          <table>
            <tr>
              <td><strong class="form-label">Name: </strong></td>
              <td><input type="text" v-model.trim="person.name" required /></td>
            </tr>
            <tr>
              <td><strong class="form-label">About: </strong></td>
              <td><input type="text" v-model.trim="person.about" required /></td>
            </tr>
            <tr>
              <td><strong class="form-label">Picture URL: </strong></td>
              <td><input type="text" v-model.trim="person.faceUrl" required
                  title="Find the picture you want online, right click and select 'copy image address'" /></td>
            </tr>
          </table>
          <div class="image-container">
            <img :src="person.faceUrl" />
          </div>
          <button @click="removePerson(index)">Remove</button>
          <hr>
        </div>
        <button :class="{ 'throbbing': addShouldThrob}"  @click="addPerson">Add another</button>
        <button :class="{ 'throbbing': saveShouldThrob}" type="submit">Save List</button>
        <div v-if="this.warningMessage" class="warning-message">
          <span class="warning-icon">⚠️</span>
          {{ warningMessage }}
        </div>
      </form>
    </div>
  </section>
</template>
  
<script>
import SaveConfirmation from './SaveConfirmation.vue'
import { loadPeopleList, loadListDisplayName, saveList, } from '../../util.js'
const MIN_PEOPLE = 4;

export default {
  components: {
    SaveConfirmation,
  },
  props: ['initWhichList'],
  data() {
    return {
      state: "edit", // edit | saved
      listDisplayName: "",
      people: [],
      whichList: this.initWhichList, // could be null if creating a new list from scratch
      warningMessage: "",
    };
  },
  computed: {
    saveShouldThrob() {
      return this.people.length >= MIN_PEOPLE;
    },
    addShouldThrob() {
      return this.people.length < MIN_PEOPLE;
    }
  },
  watch: {
    $route(to) {
      if (to.path === '/create') {
        this.reset();
      }
    }
  },
  methods: {
    async reset() {
      this.state = "edit";
      this.listDisplayName = "";
      this.people = [];
      this.whichList = this.initWhichList;
      this.warningMessage = "";
      if (this.whichList) {
        this.people = await loadPeopleList(this.whichList);
        this.listDisplayName = await loadListDisplayName(this.whichList);
      } else {
        console.log("Will be creating a new list")
      }
    },
    async validateAndSaveList() {
      if (this.people.length < MIN_PEOPLE) {
        this.warningMessage = "Add at least " + MIN_PEOPLE + " people to your list!";
        return;
      }
      const imgResults = await Promise.all(this.people.map(person => this.validateImageURL(person.faceUrl)));
      if (!imgResults.every(result => result === true)) {
        this.warningMessage = "One of your image urls is not valid!"
        return;
      }

      // all validation done
      this.warningMessage = "";
      this.whichList = await saveList(this.whichList, this.people, this.listDisplayName);
      this.state = "saved";

      this.$router.push('/edit/' + this.whichList);
    },
    validateImageURL(url) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          resolve(true);
        };
        img.onerror = () => {
          resolve(false);
        };
        img.src = url;
      });
    },
    addPerson() {
      this.warningMessage = "";
      this.people.push({ name: '', about: '', faceUrl: '' });
    },
    removePerson(index) {
      this.warningMessage = "";
      this.people.splice(index, 1)
    },
    continueEditing() {
      this.state = "edit";
    }
  },
  async mounted() {
    await this.reset();
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

.warning-message {
  border: 1px solid #ffa500;
  /* Orange border */
  background-color: #fff4e5;
  /* Light orange background */
  color: #d43f00;
  /* Text color */
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.warning-icon {
  margin-right: 10px;
  font-weight: bold;
}
</style>