
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host : process.env.DB_HOST || 'localhost',
      user : process.env.DB_USER || 'user_1',
      password : process.env.DB_USER_PASSWORD || 123,
      database : process.env.DB_NAME || 'restaurant'
    }

  }
};
