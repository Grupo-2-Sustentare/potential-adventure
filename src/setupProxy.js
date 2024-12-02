const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/java-api',
        createProxyMiddleware({
            
            target: '10.0.4.97:8080/',
            changeOrigin: true,
        })
    )
}
