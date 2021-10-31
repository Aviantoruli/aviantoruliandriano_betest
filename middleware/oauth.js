const { verifyToken } = require('../helper/jwt')
const { User } = require('../model/user')

const authe = async (req, res, next) => {
    try {
        const token = req.headers.access_token
        if (!token) {
            res.status(401).json({ msg: 'token invalid' })
        }
        const payload = verifyToken(token)
        const userCheck = await User.findOne({
            emailAddress: payload.email,
            identityNumber: payload.identityNumber
        })
        if (!userCheck[0]) {
            res.status(401).json({ msg: 'token invalid' })
        } else {
            req.user = {
                email: userCheck[0].emailAddress,
                identityNumber: userCheck[0].identityNumber,
                accountNumber: userCheck[0].accountNumber
            }
            next()
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = { authe }