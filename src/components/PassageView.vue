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
        },
        getNextPassage() { //keycode 39
            const { id } = this.$store.state.passage
            axios.get(`${URL}/passages/${id}/next`)
                .then((response) => {
                    const payload = {
                        id: response.data.passage.id,
                        chapter: response.data.passage.chapter,
                        verse: response.data.passage.verse,
                        passage: response.data.passage.text
                    }
                    this.$store.commit('GET_PASSAGE', payload)
                    this.$store.commit('CHANGE_CHAPTER', payload)
                    this.$store.commit('CHANGE_VERSE', payload)
                })
            .catch((error) => {
                console.log(error)
            })
        },
        getPreviousPassage() { //keycode 37
            const { id } = this.$store.state.passage
            axios.get(`${URL}/passages/${id}/previous`)
                .then((response) => {
                    const payload = {
                        id: response.data.passage.id,
                        chapter: response.data.passage.chapter,
                        verse: response.data.passage.verse,
                        passage: response.data.passage.text
                    }
                    this.$store.commit('GET_PASSAGE', payload)
                    this.$store.commit('CHANGE_CHAPTER', payload)
                    this.$store.commit('CHANGE_VERSE', payload)
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
        <button @click="getPreviousPassage()">Anterior</button>
        <button @click="getNextPassage()">Pŕoxima</button>
    </div>
</template>