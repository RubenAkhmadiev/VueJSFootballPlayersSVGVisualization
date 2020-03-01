import axios from 'axios'

export default async (search) => {
    const result = await axios({
        baseURL: 'http://www.api-football.com/demo/api/v2/',
        url: 'players/player/' + search + '/2019-2020',
        method: 'GET',
        results: 1
    });

    return result.data.api.players[0];
}