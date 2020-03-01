<template>
    <div>
        <div>
            <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
                <md-field :class="getValidationClass('name')">
                <label class="form__label">Name</label>
                <md-input v-model.trim="$v.name.$model" @input="fetchPlayers(name)"/>
                <span class="md-error" v-if="!$v.name.required">Field is required</span>
                <span class="md-error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</span>
                <tree-view :data="$v.name" :options="{rootObjectKey: '$v.name', maxDepth: 2}"></tree-view>
                </md-field>
            </div>
        </div>
        <league :players="players"/>
    </div>
</template>

<script>
    import League from '../components/league.vue'
    import { required, minLength } from 'vuelidate/lib/validators'
    import axios from 'axios'

    export default {
        name: "players",
        data() {
            return {
                players: [],
                searchPlayer: "",
                name: ''
            }
        },
        validations: {
            name: {
                required,
                minLength: minLength(4)
            }
        },
        methods: {
            clicked: function () {
                alert('click')
            },
            fetchPlayers: async function() {
                if (this.name.length > 3) {
                    let res = await axios({
                        baseURL: 'http://www.api-football.com/demo/api/v2/',
                        url: 'players/search/' + this.name,
                        method: 'GET',
                        results: 20
                    });
                    this.players =  res.data.api.players;
                } else {
                    this.players = [];
                }
            },
            created: async function () {

            },
            getValidationClass (fieldName) {
                const field = this.$v[fieldName];

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            }
        },
        components: {
            League
        }
    }
</script>

<style scoped>

</style>