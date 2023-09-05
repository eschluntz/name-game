<template>
    <section>
        <div class="title">Silicon Valley Name Game</div>
            <table><tr>
                <td>
                    <button>Top VCs</button>
                </td>
                <td>
                    <button>Top Tech CEOs</button>
                </td>
                <td>
                    <button>YC Partners</button>
                </td>
                <td>
                    <button>Custom</button>
                </td>
            </tr></table>
    </section>
</template>
  
<script>
    // TODO: highlight which one is selected via a prop
    export default {
    data() {
        return {};
    },
    // emits: ['survey-submit'],
    methods: {
        submitSurvey() {}
        }
    }
</script>

<style scoped>
    section {
        background-color: bisque;
        text-align: center;
        padding-bottom: 1rem;
    }
    table {
        margin-left: auto;
        margin-right: auto;
    }
    .title {
        font-size:xx-large;
    }
</style>