module.exports = {
  pg: { },
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/chinook.db'
    },
    debug: true,
    useNullAsDefault: true
  }
};
