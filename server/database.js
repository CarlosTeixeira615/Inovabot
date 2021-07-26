 
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'inovabot',
      password : 'inovabot',
      database : 'inovabot'
    }
  });

  module.exports = knex