const { User } = require('../model/user')
const { tokenGenerate } = require('../helper/jwt')
const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS)

class UserController {

    static async tokenGenerate(req, res, next) {
        try {
            const { emailAddress, userName } = req.body
            const login = await User.findOne({ emailAddress: emailAddress, userName: userName })
            if (login[0]) {
                const access_token = await tokenGenerate({
                    email: login[0].emailAddress,
                    identityNumber: login[0].identityNumber
                })
                res.status(200).json({ access_token })
            } else {
                res.status(401).json({ msg: 'email/username wrong' })
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async findAll(req, res, next) {
        try {
            const cache = await redis.get('users')
            if (cache) {
                res.status(200).json(JSON.parse(cache))
            } else {
                const result = await User.findAll()
                if (!result) {
                    res.status(404).json({ msg: 'User Not Found' })
                }
                await redis.set("users", JSON.stringify(result))
                res.status(200).json(result)
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async findOne(req, res, next) {
        try {
            const cache = await redis.get("user")
            const data = JSON.parse(cache)
            const { accountNumber, identityNumber } = req.body

            let obj = {}

            if (accountNumber) {
                obj = {
                    ...obj, accountNumber: accountNumber
                }
            }
            if (identityNumber) {
                obj = {
                    ...obj, identityNumber: identityNumber
                }
            }
            if (data.obj.identityNumber === identityNumber || data.obj.accountNumber === accountNumber) {
                res.status(200).json(data.user)
            } else {
                await redis.del("user")
                const result = await User.findOne(obj)
                if (!result) {
                    res.status(404).json({ msg: 'User Not Found' })
                }
                let user = result[0]
                await redis.set('user', JSON.stringify({ user, obj }))
                res.status(200).json(result)
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async create(req, res, next) {
        try {
            const { userName, emailAddress, identityNumber } = req.body
            if (!userName) {
                res.status(400).json({ msg: 'Username is Required' })
            }
            if (!emailAddress) {
                res.status(400).json({ msg: 'Email is Required' })
            }
            if (!identityNumber) {
                res.status(400).json({ msg: 'Identity Number is Required' })
            }
            const emailCheck = await User.findOne({ emailAddress: emailAddress })
            if (emailCheck[0]) {
                res.status(400).json({ msg: 'email already used' })
            } else {
                const newUser = await User.insert({ userName: userName, emailAddress: emailAddress, accountNumber: `900${identityNumber}`, identityNumber: identityNumber })
                await redis.del("users")
                res.status(201).json(`account berhasil dibuat`)
            }
        } catch (err) {
            console.log(err);
        }
    }

    static async update(req, res, next) {
        try {
            const { userName, emailAddress, identityNumber } = req.body
            let obj = {}
            if (userName) {
                obj = {
                    ...obj, userName: userName
                }
            }
            if (emailAddress) {
                obj = {
                    ...obj, emailAddress: emailAddress
                }
            }
            if (identityNumber) {
                obj = {
                    ...obj, identityNumber: identityNumber, accountNumber: `900${identityNumber}`
                }
            }
            const { email } = req.user
            const updatedUser = await User.update(
                { emailAddress: email },
                obj
            )
            await redis.del('user')
            await redis.del('users')
            res.status(201).json('updated complete')
        } catch (err) {
            console.log(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { email } = req.user
            const deletedUser = await User.delete({ emailAddress: email })
            await redis.del('user')
            await redis.del('users')
            res.status(200).json({ msg: 'account has been deleted' })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = UserController