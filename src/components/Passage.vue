<script>
import axios from 'axios'

const URL = 'http://localhost:3003/'

export default {
    name: "Passage",
    data () {
        return {
            books: [],
            chapters: [],
            verses: []
        }
    },
    created: function () {
        window.addEventListener('keyup', this.handleKey)
    },
    computed: {
        passage () {
            return this.$store.state.passage.passage
        },
        book () {
            return this.$store.state.passage.book
        },
        chapter () {
            return this.$store.state.passage.chapter
        },
        verse () {
            return this.$store.state.passage.verse
        }
    },
    mounted () {
        this.getAllBooks()
    },
    methods: {
        changeBook ($event) {
            const payload = {
                book: $event
            }
            this.$store.commit('CHANGE_BOOK', payload)
            this.getAllChapters()
        },
        changeChapter ($event) {
            const payload = {
                chapter: $event
            }
            this.$store.commit('CHANGE_CHAPTER', payload)
            this.getAllVerses()
        },
        changeVerse ($event) {
            const payload = {
                verse: $event
            }
            this.$store.commit('CHANGE_VERSE', payload)
        },
        getAllBooks() {
            axios.get(`${URL}/books/`)
                .then((response) => {
                    this.books = response.data.books
                })
            .catch((error) => {
                console.log(error)
            })
        },
        getAllChapters() {
            const { book } = this.$store.state.passage
            axios.get(`${URL}/books/${book}/chapters`)
                .then((response) => {
                    this.chapters = response.data.chapters
                })
            .catch((error) => {
                console.log(error)
            })
        },
         getAllVerses() {
            const { book, chapter } = this.$store.state.passage
            axios.get(`${URL}/books/${book}/chapters/${chapter}/verses`)
                .then((response) => {
                    this.verses = response.data.verses
                })
            .catch((error) => {
                console.log(error)
            })
        },
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
                        book: response.data.passage.bookId,
                        chapter: response.data.passage.chapter,
                        verse: response.data.passage.verse,
                        passage: response.data.passage.text
                    }
                    this.$store.commit('GET_PASSAGE', payload)
                    this.$store.commit('CHANGE_VERSE', payload)
                    this.$store.commit('CHANGE_CHAPTER', payload)
                    this.$store.commit('CHANGE_BOOK', payload)
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
                        book: response.data.passage.bookId,
                        chapter: response.data.passage.chapter,
                        verse: response.data.passage.verse,
                        passage: response.data.passage.text
                    }
                    this.$store.commit('GET_PASSAGE', payload)
                    this.$store.commit('CHANGE_CHAPTER', payload)
                    this.$store.commit('CHANGE_VERSE', payload)
                    this.$store.commit('CHANGE_BOOK', payload)
                })
            .catch((error) => {
                console.log(error)
            })
        },
        handleKey: function(event){
            switch(event.key) {
                case 'ArrowRight':
                    this.getNextPassage()
                    break;
                case 'ArrowLeft':
                    this.getPreviousPassage()
                    break;
            }
        }
    }
}
</script>

<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-select 
                v-bind:items="books"
                v-model="book"
                label="Livro"
                autocomplete
                @change="changeBook($event)"
                item-text="name"
                item-value="id"
                noDataText="Nenhum livro disponível com este nome"
            ></v-select>
            <v-select
                v-bind:items="chapters"
                v-model="chapter"
                label="Capítulo"
                autocomplete
                @change="changeChapter($event)"
                item-text="chapter"
                item-value="chapter"
                noDataText="Nenhum capítulo encontrado com este número"
            ></v-select> 
            <v-select
                v-bind:items="verses"
                v-model="verse"
                label="Versículo"
                autocomplete
                @change="changeVerse($event)"
                item-text="verse"
                item-value="verse"
                noDataText="Nenhum versículo encontrado com este número"
            ></v-select> 
            <v-btn round color="primary" @click="getPassage()" dark>Ler</v-btn>
        </v-layout>
        <h4> {{ passage }} </h4>
    </v-container>
</template>

<style>

h4 {
    font-size: 4em;
}
html {
    overflow: scroll;
    overflow-x: hidden;
}
::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
}
/* optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}
</style>