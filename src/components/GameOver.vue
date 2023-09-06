<template>
<section>
    <div class="card">
    <h1>Game Over!</h1>
    <h3>High Scores:</h3>
    <table>
        <thead><tr>
            <td><strong>Rank</strong></td>
            <td><strong>Name</strong></td>
            <td><strong>Score</strong></td>
        </tr></thead>
        <tbody>
            <tr v-for="(row, index) in highScores" :key="index">
                <td>#{{ index + 1}}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.score }}</td>
            </tr>
        </tbody>
    </table>
    <br>
    <strong>Your Score: </strong><span> {{ score }}</span>
    <br>
    <button @click="$emit('play-again')">Play again</button>
    </div>
</section>
</template>

<script>
    export default {
        props: ['score', 'highScores'],
        emits: ['play-again'],
};
</script>

<style scoped>
</style>