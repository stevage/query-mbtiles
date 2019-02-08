const promisify = require('util').promisify;
const mercator = require('global-mercator');
const MBTiles = require('@mapbox/mbtiles');
const  vtquery = promisify(require('@mapbox/vtquery'));

const loadTiles = promisify((filename, cb) => new MBTiles(filename, cb));

/*
Options: {
    radius,
    limit,
    layers,
    geometry,
    dedup
}
see https://github.com/mapbox/vtquery
*/
async function queryLngLat(tileset, lngLat, zoom, options = {}) {
    // actually it's a filename we have to load first
    if (tileset.constructor.name === 'String') {
        tileset = await loadTiles(tileset + '?mode=ro'); 
    }
    const [x, y, z] = mercator.lngLatToGoogle(lngLat, zoom);
    const getTile = promisify(tileset.getTile).bind(tileset);
    const buffer = await getTile(z, x, y);
    const tiles = [
        {buffer, z, x, y }
    ];
    return await vtquery(tiles, lngLat, options);
}

module.exports = {
    queryLngLat,
    loadTiles
}