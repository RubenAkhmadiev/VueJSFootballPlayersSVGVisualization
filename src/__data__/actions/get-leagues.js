import axios from 'axios'

export default async (search) => {
    const result = await axios({
        baseURL: 'http://www.api-football.com/demo/api/v2/',
        url: search,
        method: 'GET'
    })

    return result.data.api.leagues;
}