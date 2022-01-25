import { apiRoute } from 'config/config'

export const sortData = (data, val) => {
    return data.sort((a,b) => new Date(b[val]) - new Date(a[val]))
}


export const fetchAPI = async(route) => {
    const res = await fetch(`${apiRoute}/api/${route}`)
    const data = await res.json()

    return data
}