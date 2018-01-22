export default {
    reference: state => {
        return `${state.passage.book} ${state.passage.chapter}.${state.passage.verse}`
    }
}