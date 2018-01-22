
export default {
    setBook (context, payload) {
        context.commit('SET_BOOK', payload)
    },
    setChapter(context, payload) {
        context.commit('SET_CHAPTER', payload)
    },
    setVerse (context, payload) {
        context.commit('SET_VERSE', payload)
    },
    getPassage (context, payload) {
        context.commit('GET_PASSAGE', payload)
    }
}