### Query-Mbtiles

Find the closest features to a lngLat inside a .mbtiles file.

#### Usage

```js
queryMbtiles.queryLngLat(filenameOrMbtiles, [lng, lat], zoom, { options });
```

For options see [vtquery documentation](https://github.com/mapbox/vtquery#vtquery).

```js
const queryMbtiles = require('query-mbtiles');
result = await queryMbtiles.queryLngLat('./my.mbtiles', [145.13, -37.97], 14);
console.log(result.features[0].properties);
```

Or load your own mbtiles file:

```js
const queryMbtiles = require('query-mbtiles');
const MBTiles = require('@mapbox/mbtiles');
new MBTiles('./mymbtiles', mbtiles => {
    result = await queryMbtiles.queryLngLat(mbtiles, [145.13, -37.97], 14);
    console.log(result.features[0].properties);
});
```