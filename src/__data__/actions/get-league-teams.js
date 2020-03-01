import axios from 'axios'

export default async (search) => {
    const result = await axios({
        baseURL: 'http://www.api-football.com/demo/api/v2/',
        url: 'teams/league/' + search,
        method: 'GET'
    })

    return result.data.api.teams;
}