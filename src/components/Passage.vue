<script>

import { mapState, mapActions } from 'vuex'
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
        ...mapState({
            id: state => state.passage.id,
            passage: state => state.passage.passage,
            book: state => state.passage.book,
            chapter: state => state.passage.chapter,
            verse: state => state.passage.verse
        }),
        reference () {
            return this.$store.getters.reference
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
            this.setBook(payload)
            this.getAllChapters()
        },
        changeChapter ($event) {
            const payload = {
                chapter: $event
            }
            this.setChapter(payload)
            this.getAllVerses()
        },
        changeVerse ($event) {
            const payload = {
                verse: $event
            }
            this.setVerse(payload)
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
            axios.get(`${URL}/books/${this.book}/chapters`)
                .then((response) => {
                    this.chapters = response.data.chapters
                })
            .catch((error) => {
                console.log(error)
            })
        },
         getAllVerses() {
            axios.get(`${URL}/books/${this.book}/chapters/${this.chapter}/verses`)
                .then((response) => {
                    this.verses = response.data.verses
                })
            .catch((error) => {
                console.log(error)
            })
        },
        getPassageByProps() {
            axios.get(`${URL}/books/${this.book}/chapters/${this.chapter}/verses/${this.verse}`)
                .then((response) => {
                    const payload = {
                        id: response.data.verse.id,
                        book: response.data.verse.bookId,
                        chapter: response.data.verse.chapter,
                        verse: response.data.verse.verse,
                        passage: response.data.verse.text
                    }
                    this.getPassage(payload)
                })
            .catch((error) => {
                console.log(error)
            })
        },
        getNextPassage() { //keycode 39
            axios.get(`${URL}/passages/${this.id}/next`)
                .then((response) => {
                    const payload = {
                        id: response.data.passage.id,
                        book: response.data.passage.bookId,
                        chapter: response.data.passage.chapter,
                        verse: response.data.passage.verse,
                        passage: response.data.passage.text
                    }
                    this.getPassage(payload)
                })
            .catch((error) => {
                console.log(error)
            })
        },
        getPreviousPassage() { //keycode 37
            axios.get(`${URL}/passages/${this.id}/previous`)
                .then((response) => {
                    const payload = {
                        id: response.data.passage.id,
                        book: response.data.passage.bookId,
                        chapter: response.data.passage.chapter,
                        verse: response.data.passage.verse,
                        passage: response.data.passage.text
                    }
                    this.getPassage(payload)
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
        },
        ...mapActions (['setBook', 'setChapter', 'setVerse', 'getPassage']),
    }
}
</script>

<template>
    <v-container grid-list-md text-xs-center class="header">
        <v-layout row wrap>
            <img src="../assets/pib-logo.png" height="61" width="167"/>
            <v-select class="mr-3 ml-3"
                v-bind:items="books"
                v-model="book"
                label="Livro"
                autocomplete
                @change="changeBook($event)"
                item-text="name"
                item-value="id"
                noDataText="Nenhum livro disponível com este nome"
            ></v-select>
            <v-select class="mr-3 ml-3"
                v-bind:items="chapters"
                v-model="chapter"
                label="Capítulo"
                autocomplete
                @change="changeChapter($event)"
                item-text="chapter"
                item-value="chapter"
                noDataText="Nenhum capítulo encontrado com este número"
            ></v-select> 
            <v-select class="mr-3 ml-3"
                v-bind:items="verses"
                v-model="verse"
                label="Versículo"
                autocomplete
                @change="changeVerse($event)"
                item-text="verse"
                item-value="verse"
                noDataText="Nenhum versículo encontrado com este número"
            ></v-select> 
            <v-btn :disabled="chapter == null || verse == null" round color="primary" @click="getPassageByProps()" dark>Ler</v-btn>
        </v-layout>
        <div class="passagem">
            <h1> {{ reference }} </h1>
            <h4> {{ passage }} </h4>
        </div>
    </v-container>
</template>

<style>
.header {
    margin-top: 20px;
}

.passagem {
    margin-top: 50px;
}
h4 {
    font-size: 3.5em;
    text-align: center;
}
h1 {
    color: darkorange
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