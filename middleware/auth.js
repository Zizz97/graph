import jwt from 'jsonwebtoken'

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        req.isAuth = false
        return next()
    }
    const token = authHeader.split(' ')[1]
    let decodedToken
    try {
        decodedToken = jwt.verify(token, '1ff1d761e8714d1cca6dbe645e6bbc83')
    } catch (error) {
        req.isAuth = false
        return next()
    }
    if (!decodedToken) {
        req.isAuth = false
        return next()
    }
    req.userId = decodedToken.userId
    req.authHeader = true
    next()
}