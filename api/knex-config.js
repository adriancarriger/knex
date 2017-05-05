module.exports = {
  pg: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port: '6432',
      user : 'postgres',
      password : '',
      database : 'postgres'
    }
  },
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/chinook.db'
    },
    debug: true,
    useNullAsDefault: true
  }
};
