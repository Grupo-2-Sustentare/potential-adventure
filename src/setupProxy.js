const { createProxyMiddleware } = require('http-proxy-middleware');

// True quando local
// False quando em nuvem
const DEBUG = true

module.exports = function(app) {
    app.use(
        '/java-api',
        createProxyMiddleware({
            target: DEBUG ? 'http://localhost:9000' : 'http://10.0.4.97:9000/',
            changeOrigin: true,
        })
    )
}
