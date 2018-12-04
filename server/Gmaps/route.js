const googleMaps = require('./client')
const routes = require('./storage')

async function routePlanning(ori, dest) {

    console.log('generating route...')
   

    try {
        let a = await googleMaps.geocode({address: ori}).asPromise()
        let b = await googleMaps.geocode({address: dest}).asPromise()

        console.log(a.json.results[0].geometry.location);
        console.log(b.json.results[0].geometry.location);

        let route =  await googleMaps.directions({
            origin: ori,
            destination: dest,
        }).asPromise()

        console.log(route.json.routes)

        routes.push(route.json.routes)
        /*
        googleMaps.geocode({
            address: ori
          }, function(err, response) {
            if (!err) {
              console.log(response.json.results[0].geometry.location);
            }
        });
        
        googleMaps.geocode({
            address: dest
          }, function(err, response) {
            if (!err) {
              console.log(response.json.results[0].geometry.location);
              orilang = response.json.results[0].geometry.location
            }
        });
       */
    } catch(err) {
        console.log(err)
    }


    


    

  /*

    googleMaps.directions({
        origin: orilang,
        destination: destlang,
    })
        .asPromise()
        .then(res => {
            console.log(res.json.results)
            route = res.json.results;
        })

    routes.push(route)

    return route
    */
}

module.exports = routePlanning