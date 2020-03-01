import axios from 'axios'

export default async (search, league_name) => {
    let teams = [];

    const result = await axios({
        baseURL: 'http://www.api-football.com/demo/api/v2/',
        url: 'players/team/' + search + '/2019-2020',
        method: 'GET'
    });

    function isTeamInSameLeague (team, league_name) {
        if (team.league === league_name) {
            teams.push(team);
        }
    }

    result.data.api.players.forEach(team => isTeamInSameLeague(team, league_name));

    return teams;
}