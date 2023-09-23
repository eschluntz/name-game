<template>
  <section>
    <div class="card">
      <strong>Your Score: </strong>
      <span> {{ score }}</span>
      <br>
      <strong>People: </strong><span>{{ index }} / {{ total }}</span>
    </div>
  </section>
</template>
    
<script>
export default {
  props: ['score', 'index', 'total'],
};
</script>
    
<style scoped></style>