<template>
  <personal-card :teams="teams"/>
</template>

<script>
import axios from 'axios'
import PersonalCard from '../components/personal-card.vue'
import getEPL from '../__data__/actions/get-leagues'

export default {
  name: 'epl',
  components: {
    PersonalCard
  },
  data() {
      return {
          text: 'Идет загрузка...',
          searchName: '524',
          teams: []
      }
  },
  created: function () {
      getEPL(this.searchName).then((res) => this.teams = res)
  }

}
</script>