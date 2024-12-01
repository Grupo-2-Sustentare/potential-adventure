const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/java-api',
        createProxyMiddleware({
            //10.0.3.103:8080
            target: 'http://localhost:8080/',
            changeOrigin: true,
        })
    )
}
