// 3rd part imports
const knexFunction = require('knex');
// Local imports
const knexConfig = require('../knexfile.js');
const screen = require('./screen');
const knex = knexFunction(knexConfig.development);

// App
screen.clear();

const query = knex('artists')
  .join('albums', 'artists.ArtistId', '=', 'albums.ArtistId')
  .select('artists.name', 'artists.ArtistId', 'albums.AlbumId as albums:id', 'albums.title as albums:title')
  .where('artists.ArtistId', 1);

knex.schema.

run(query, 'pretty');

/**
 * @method run
 * @param {string} mode
 */
function run(knexQuery, mode) {
  knexQuery
    .then(data => screen.write(data, mode))
    .catch(error => console.warn(error))
    .finally(() => {
      knex.destroy();
      console.log('Done.');
    });
}
