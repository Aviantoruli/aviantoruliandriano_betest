const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017'

const client = new MongoClient(url)

const dbName = 'db_aviantoruliandriano_betest'

let dataBase = null

async function connect() {
    await client.connect()
    const db = client.db(dbName)
    dataBase = db
}

function getDatabase() {
    return dataBase
}

module.exports = {connect, getDatabase}