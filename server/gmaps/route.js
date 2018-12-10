const googleMaps = require('./client');
//const routes = require('./storage');
//const fetched = require('./storage').fetched;
const stored = require('./storage').stored;
const threshold = require('./config').timeThreshold;

/*
async function routePlanning(ori, dest) {

    console.log('generating route...')


    try {
        let a = await googleMaps.geocode({address: ori}).asPromise()
        let b = await googleMaps.geocode({address: dest}).asPromise()

        console.log(a.json.results[0].geometry.location);
        console.log(b.json.results[0].geometry.location);

        let route = await googleMaps.directions({
            origin: ori,
            destination: dest,
            mode: 'driving',
        }).asPromise();

        //console.log(route.json.routes[0])
        //console.log(route.json.routes[0].legs.duration.value);

        // only if the delivery time less than threshold, the route will be accept
        if(route.json.routes[0].legs[0].duration.value <= threshold) {
            routes.push(route.json.routes[0]);
        } else {
            console.log("The delivery time exceed the limitation");
        }

        //routes.push(route.json.routes[0]);

    } catch (err) {
        console.log(err)
    }
}
*/

async function addRoute(ori, dest, id) {
    try{

        // retrieve all existing route that have not been assigned
        for (let i = 0; stored[i] != null; i++) {
            let w = "";

            if("waypoints" in stored[i].direction) {
                w = stored[i].direction.waypoints + "|";
            }

            w += ori + "|" + dest;

            // deep copy direction object
            let d = JSON.parse(JSON.stringify(stored[i].direction));

            d.waypoints = w;

            let routeResult = await googleMaps.directions(d).asPromise();

            let time = 0;
            let legs = routeResult.json.routes[0].legs;

            // calculate the entire delivery time cost
            for(let j = 0; legs[j] != null; j++) {
                time += legs[j].duration.value;
            }

            // meet requirement
            if(time <= threshold) {
                stored[i].direction = d;
                stored[i].route = routeResult.json.routes[0];
                stored[i].orderId.push(id);
                return stored[i].route;
            }
        }

        // no existing route can be combined, initial new route
        return newRoute(ori, dest, id);
    } catch (err) {
        console.log(err)
        return undefined;
    }
}

async function newRoute(ori, dest, id) {

    console.log("making route:" + ori + dest + id)
    try {
        let direction = {
            origin: ori,
            destination: dest,
            mode: 'driving',
        };

        let orderId = [id];
        let o = {};

        let route = await googleMaps.directions(direction).asPromise();

        // a new route, so only check legs[0]
        if(route.json.routes[0].legs[0].duration.value <= threshold) {
            o.orderId = orderId;
            o.direction = direction;
            o.route = route.json.routes[0];
            stored.push(o);
            return o.route;
        } else {
            return undefined;
        }
    } catch (err) {
        console.log(err);
        return undefined;
    }
}


module.exports = {
    addRoute: addRoute,
    //newRoute: newRoute
}