export const sortData = (data, val) => {
    return data.sort((a,b) => new Date(b[val]) - new Date(a[val]))
}