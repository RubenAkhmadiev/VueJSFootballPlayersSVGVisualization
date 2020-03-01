<template>
    <div>
    <modal name="player" @before-open="beforeOpen" style="position: fixed"
           width="60%" height="auto" :adaptive="true" :delay="1" :scrollable="true">
        <h2>Name: {{player.player_name}}</h2>
        <h2>Nationality: {{player.nationality}}</h2>
        <h2>Position: {{player.position}}</h2>
        <div class="md-optgroup">
            <label>Attack</label>
            <md-progress-bar class="md-accent" md-mode="determinate" :md-value="stats.attack"></md-progress-bar>
            <label>Defense</label>
            <md-progress-bar md-mode="determinate" :md-value="stats.defense"></md-progress-bar>
            <label>Dribbling</label>
            <md-progress-bar class="md-accent" md-mode="determinate" :md-value="stats.dribbling"></md-progress-bar>
            <label>Aggressive</label>
            <md-progress-bar md-mode="determinate" :md-value="stats.aggressive"></md-progress-bar>
            <label>Passing Accuracy</label>
            <md-progress-bar class="md-accent" md-mode="determinate" :md-value="stats.passingAccuracy"></md-progress-bar>
        </div>
    </modal>
    </div>
</template>

<script>

    import getPlayerStats from '../__data__/actions/get-player-stats'

    let stats = function(player) {

        let getStat = function(value) {
            return isNaN(value) ? 0 : value;
        };

        let attack = function(player) {
            let attack = ((player.shots.on / player.shots.total)
                * (player.goals.total + player.goals.assists)) * 30;
            return getStat(attack);
        };

        let defense = function (player) {
            let defense = (player.tackles.blocks +
                player.tackles.interceptions + player.tackles.total) * 3;
            return getStat(defense);
        };

        let dribbling = function (player) {
            return getStat((player.dribbles.success / player.dribbles.attempts) * 100)
        };
        
        let aggressive = function (player) {
            return getStat(player.fouls.committed * player.fouls.drawn)
        };

        let passingAccuracy = function (player) {
            return getStat((player.passes.accuracy / player.passes.total) * 100)
        };

        return {
            attack : attack(player),
            defense: defense(player),
            dribbling: dribbling(player),
            aggressive: aggressive(player),
            passingAccuracy: passingAccuracy(player)
        };
    };
    
    export default {
       name: "player",
       data() {
           return {
               player: Object,
               stats: Object
           }
       },
       methods: {
           show() {
               this.$modal.show('player');
           },
           hide() {
               this.$modal.hide('player');
           },
           beforeOpen(event) {
               this.player = event.params.player;
               // getPlayerStats(this.player.player_id).then((res) => this.player = res);
               // данные приходят уже после открытия модалки, поэтому статистику не удаётся собрать
               this.stats = stats(this.player);
           }
       },
   }

</script>

<style lang="scss" scoped>
    .md-progress-bar {
        margin: 24px;
    }
</style>
