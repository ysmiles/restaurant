const googleMaps = require('./client')
const routes = require('./storage')

function routePlanning(ori, dest) {

    console.log('generating route...')
    let route = null

    googleMaps.directions({
        origin: ori,
        destination: dest,
    })
        .asPromise()
        .then(res => {
            console.log(res)
            route = res;
        })

    routes.push(route)

    return route
}

module.exports = routePlanning