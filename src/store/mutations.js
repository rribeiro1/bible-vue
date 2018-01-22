
export default {
    'SET_BOOK' (state, payload) {
        state.passage.book = payload.book
        state.passage.chapter = null
        state.passage.verse = null
    },
    'SET_CHAPTER' (state, payload) {
        state.passage.chapter = payload.chapter
        state.passage.verse = null
    },
    'SET_VERSE' (state, payload) {
        state.passage.verse = payload.verse
    },
    'GET_PASSAGE' (state, payload) {
        state.passage.id = payload.id
        state.passage.book = payload.book
        state.passage.chapter = payload.chapter
        state.passage.verse = payload.verse
        state.passage.passage = payload.passage
    }
}