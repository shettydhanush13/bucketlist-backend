require('dotenv').config()

module.exports = {
    accessTokenSecret : process.env.jwt_accessTokenSecret,
    refreshTokenSecret : process.env.jwt_refreshTokenSecret,
    poolData : {
        user: process.env.psql_user,
        password: process.env.psql_password,
        database: process.env.psql_database,
        port: process.env.psql_port,
        host: process.env.psql_host,
        ssl:  {
            rejectUnauthorized: false,
        }
    },
    mongoConfig : {
        uri : `mongodb+srv://${process.env.mongoUser}:${encodeURIComponent(process.env.mongoPassword)}@cluster0.ejkuv.mongodb.net/${process.env.mongoCluster}?retryWrites=true&w=majority`
    }
}