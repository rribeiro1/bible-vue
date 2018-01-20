<script>
import axios from 'axios'

const URL = 'http://localhost:3003/'

export default {
    name: "PassageForm",
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
    mounted () {
        this.getAllBooks()
    },
    methods: {
        changeBook ($event) {
            const payload = {
                book: $event.target.value
            }
            this.$store.commit('CHANGE_BOOK', payload)
            this.getAllChapters()
        },
        changeChapter ($event) {
            const payload = {
                chapter: $event.target.value
            }
            this.$store.commit('CHANGE_CHAPTER', payload)
            this.getAllVerses()
        },
        changeVerse ($event) {
            const payload = {
                verse: $event.target.value
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
        }
    }
}
</script>

<template>
    <div>
        <div>
            <select v-model="book" @change="changeBook($event)">
                <option v-for="item in books" v-bind:value="item.id" v-bind:key="item.id">
                    {{ item.name }}
                </option>
            </select>    
        </div>
        <div>
            <select v-model="chapter" @change="changeChapter($event)">
                <option v-for="item in chapters" v-bind:value="item.chapter" v-bind:key="item.chapter">
                    {{ item.chapter }}
                </option>
            </select>
        </div>
        <div>
            <select v-model="verse" @change="changeVerse($event)">
                <option v-for="item in verses" v-bind:value="item.verse" v-bind:key="item.verse">
                    {{ item.verse }}
                </option>
            </select>    
        </div>
    </div>
</template>