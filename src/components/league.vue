<template>
    <div class="personal">
        <div v-for="player in players">
            <md-card class="md-primary block">
                <md-card-header>
                    <md-card-header-text>
                        <div class="md-headline">Name: {{ player.player_name }}</div>
                        <div class="md-subheading">Nationality: {{ player.nationality }}</div>
                        <div class="md-subhead">Age: {{ player.age}}</div>
                        <div class="md-subhead">Position: {{ player.position}}</div>
                    </md-card-header-text>
                        <md-card-media>
                            <img :src="photo" :alt="player.photo">
                        </md-card-media>
                </md-card-header>
                <md-card-actions>
                    <md-button v-show="isHasStat(player)" @click="clicked(player)" class="md-fab md-mini">
                        <md-icon>menu</md-icon>
                    </md-button>
                </md-card-actions>

            </md-card>
        </div>
        <player></player>
    </div>
</template>

<script>
    import Player from '../components/player.vue'
    const photo = 'https://telegram.org.ru/uploads/posts/2018-04/1523986370_file_488917.jpg';

    export default {
        name: 'League',
        components: {
            Player
        },
        data() {
            return {
                photo: photo
            }
        },
        props: {
            players: Array,
        },
        methods: {
            clicked: function(player) {
                this.$modal.show('player', {player: player});
            },
            isHasStat: function (player) {
                return player.shots !== undefined;
            }
        }

    }
</script>

<style scoped>
    @import url('./style.css');
</style>