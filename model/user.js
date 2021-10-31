const { getDatabase } = require('../config/mongodb')

class User{
    static async findAll(){
        const db = getDatabase()
        const userCollection = db.collection('Users')
        const users = await userCollection.find().toArray()
        return users
    }

    static async findOne(input){
        const db = getDatabase()
        const userCollection = db.collection('Users')
        const users = await userCollection.find(input).toArray()
        return users
    }

    static async insert(data){
        const db = getDatabase()
        const userCollection = db.collection('Users')
        const users = await userCollection.insertOne(data)
        return users
    }

    static async update(filter, data){
        const db = getDatabase()
        const userCollection = db.collection('Users')
        const users = await userCollection.updateOne(filter, {$set:data})
        return users
    }

    static async delete(input){
        console.log(input);
        const db = getDatabase()
        const userCollection = db.collection('Users')
        const users = await userCollection.deleteOne(input)
        return users
    }
}

module.exports = {User}