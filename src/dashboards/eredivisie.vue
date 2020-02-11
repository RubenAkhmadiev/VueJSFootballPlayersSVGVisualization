<template>
  <personal-card :teams="teams"/>
</template>

<script>
import axios from 'axios'
import PersonalCard from '../components/personal-card.vue'
import getEredivisie from '../__data__/actions/get-leagues'

export default {
  name: 'eredivisie',
  components: {
    PersonalCard
  },
  data() {
      return {
          text: 'Идет загрузка...',
          searchName: '566',
          teams: []
      }
  },
    created: function () {
        getEredivisie(this.searchName).then((res) => this.teams = res)
    },
  methods: {
    clicked: function() {
      alert('click')
    }
  }

}
</script>
