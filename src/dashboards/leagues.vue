<template>
    <div style="min-height: 60vh">
        <div class="md-select" style="display: flex">
            <v-select :placeholder="textLeague" v-model="league" :options="leagues" label="name"
                      @input="fetchLeagueTeams(league)">
            </v-select>
            <transition name="fade">
                <v-select v-show="league_name" :placeholder="textTeam" v-model="team_id"
                         :reduce="team => team.team_id" :options="teams"
                          label="name" @input="fetchTeamPlayers(team_id)">
                </v-select>
            </transition>
        </div>
        <league :players="players"/>
    </div>
</template>

<script>
import League from '../components/league.vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect);
import getLeagues from '../__data__/actions/get-leagues'
import getTeamPlayers from '../__data__/actions/get-team-players'
import getLeagueTeams from '../__data__/actions/get-league-teams'
import getLeagueTopScorers from '../__data__/actions/get-league-top-scorers'

export default {
  name: 'leagues',
  components: {
      League
  },
  data() {
      return {
          textLeague: 'Choose league...',
          textTeam: 'Choose team...',
          searchName: 'leagues',
          leagues: [],
          teams: [],
          players: [],
          league: "",
          league_name: "",
          team_id: ""
      }
  },
    created: function () {
        getLeagues(this.searchName).then((res) => this.leagues = res)
    },
  methods: {
      fetchLeagueTeams: function(league) {
          if (league !== "" || league !== undefined) {
              getLeagueTeams(league.league_id).then((res) => this.teams = res);
              getLeagueTopScorers(league.league_id).then((res) => this.players = res);
              this.league_name = league.name;
          } else {
              this.league_name = "";
          }
      },
      fetchTeamPlayers: function(team_id) {
          if (this.league_name !== "") {
              getTeamPlayers(team_id, this.league_name).then((res) => this.players = res);
          }
      },
  }

}
</script>
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .v-select {
        min-width: 300px !important;
    }
</style>