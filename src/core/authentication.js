const { verifyAccessToken } = require("../controller/auth/helper")

module.exports = async (req, res, next) => {
    const auth = req.headers["authorization"]
    if(!auth) return res.status(401).send({ message  : "Access denied" })
    const token = auth.split(" ")[1]
    const tokenStatus = await verifyAccessToken(token)
    if(tokenStatus.error){
        res.status(401).send({ status : 401, message  : tokenStatus.message })
    } else {
        const email = tokenStatus.user.email
        req.body.email = email;
        next()
    }
}