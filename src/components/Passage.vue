<script>
import axios from 'axios'

const URL = 'http://localhost:3003/'

export default {
    name: "Passage",
    data () {
        return {
            books: [],
            chapters: [],
            verses: [],
            book: '',
            chapter: '',
            verse: ''
        }
    },
    computed: {
        passage () {
            return this.$store.state.passage.passage
        }
    },
    mounted () {
        this.getAllBooks()
    },
    methods: {
        changeBook ($event) {
            console.log($event)
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
        <v-card flat class="py-5">
            <v-select
                v-bind:items="books"
                v-model="book"
                label="Livro"
                autocomplete
                @change="changeBook($event)"
                item-text="name"
                item-value="id"
            ></v-select>
            <v-select
                v-bind:items="chapters"
                v-model="chapter"
                label="Capítulo"
                autocomplete
                @change="changeChapter($event)"
                item-text="chapter"
                item-value="chapter"
            ></v-select> 
            <v-select
                v-bind:items="verses"
                v-model="verse"
                label="Versículo"
                autocomplete
                @change="changeVerse($event)"
                item-text="verse"
                item-value="verse"
            ></v-select> 
            <v-btn color="primary" @click="getPassage()" dark>Ler</v-btn>
        </v-card>
        <p> {{ passage }} </p>
        <div class="text-xs-center">
            <v-btn round color="primary" @click="getPreviousPassage()" dark>Anterior</v-btn>
            <v-btn round color="primary" @click="getNextPassage()" dark>Próxima</v-btn>
        </div>
    </div>
</template>