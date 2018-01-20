<script>
import PassageForm from './components/PassageForm'
import PassageView from './components/PassageView'

export default {
  name: 'Biblia',
  components: {
    PassageForm,
    PassageView
  }
}
</script>

<template>
  <div>
    <h1>Bíblia Sagrada</h1>
    <PassageForm></PassageForm>
    <PassageView></PassageView>
  </div>
</template>