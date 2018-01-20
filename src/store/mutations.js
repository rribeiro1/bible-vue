
export default {
    'CHANGE_BOOK' (state, payload) {
        state.passage.book = payload.book
    },
    'CHANGE_CHAPTER' (state, payload) {
        state.passage.chapter = payload.chapter
    },
    'CHANGE_VERSE' (state, payload) {
        state.passage.verse = payload.verse
    },
    'GET_PASSAGE' (state, payload) {
        state.passage.id = payload.id
        state.passage.passage = payload.passage
    }
}