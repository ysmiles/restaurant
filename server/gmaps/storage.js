//routes = [];

/*
 * The object in array follows this structure:
 *  {
 *      direction: {
 *          original:
 *          destination:
 *          mode: "driving"
 *          ?// waypoints:
 *       },
 *
 *       route: The route plan result
 *       orderId: [] // order ids
 *   }
 *
 *
 */

// The route tasks has been assigned, immutbale
fetched = [];

// The route tasks still in server, it's possible to add more waypoints to combine routes
stored = [];




module.exports = {
    fetched: fetched,
    stored: stored
}