<template>
<section>
    <div class="card">
    <h2>You walk into an elevator with Marc Andreeson...</h2>
    <h2>Do you recognize him and pitch, or just play on your phone?</h2>
    <button @click="$emit('play-game')">Play Now</button>
    </div>
</section>
</template>

<script>
    export default {
        emits: ['play-game'],
};
</script>

<style scoped>
</style>