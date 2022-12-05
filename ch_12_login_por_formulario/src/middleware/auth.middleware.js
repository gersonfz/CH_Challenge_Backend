const auth = (req, res, next) => {
    const { url, method } = req
    const isAdmine = process.env.ADMIN === 'true' || true

    if (!isAdmin) {
        return res.status(401).json({
            error: -1,
            description: `route ${url} method ${method} not authorized`
        })
    }

    next()
}

module.exports = auth;