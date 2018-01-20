<script>
import axios from 'axios'

const URL = 'http://localhost:3003/'

export default {
    name: "PassageView",
    computed: {
        passage () {
            return this.$store.state.passage.passage
        }
    },
    methods: {
        getPassage() {
            const { book, chapter, verse } = this.$store.state.passage
            axios.get(`${URL}/books/${book}/chapters/${chapter}/verses/${verse}`)
                .then((response) => {
                    const payload = {
                        id: response.data.verse.id,
                        passage: response.data.verse.text
                    }
                    this.$store.commit('GET_PASSAGE', payload)
                })
            .catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>

<template>
    <div>
        <button @click="getPassage()">Ler</button>
        <p> {{ passage }} </p>
    </div>
</template>