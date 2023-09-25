<template>
  <section>
    <div class="card">
      <h1>{{ listDisplayName }} Saved!</h1>
      <router-link :to="'/game/' + whichList"><button class="throbbing">Play Your List</button></router-link>
      <button @click="saveToClipboard('localhost:8080/game/' + whichList)">{{ buttonText }}</button>
      <button @click="continueEditing">Continue Editing</button>
    </div>
  </section>
</template>

<script>
const defaultCopyText = 'Copy List URL'

export default {
  props: ['listDisplayName', 'whichList'],
  emits: ['continue-editing'],
  data() {
    return {
      people: [],
      buttonText: defaultCopyText,
    };
  },
  methods: {
    async saveToClipboard(content) {
      await navigator.clipboard.writeText(content)
      this.buttonText = "Link copied!"
      setTimeout(() => {
        this.buttonText = defaultCopyText;
      }, 2000);
    },
    continueEditing() {
      this.$emit('continue-editing');
    }
  },
}
</script>

<style scoped>
button {
  margin-inline: .5rem;
}
</style>