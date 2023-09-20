<template>
  <section>
    <div class="card">
      <h2>You walk into an elevator with Marc Andreessen...</h2>
      <h2>Do you recognize him and pitch, or just play on your phone?</h2>
      <em>
        Type in the full name (no caps needed) as quickly as you can,<br>
        before the timer bar runs out! No need to press enter.<br><br>
        If you don't know, click the "Reveal" button or press "tab" to reveal the name.
      </em>
      <br><br>
      <button @click="$emit('start-game')" class="throbbing">Play Now</button>
    </div>
  </section>
</template>

<script>
export default {
  emits: ['start-game'],
};
</script>

<style scoped></style>