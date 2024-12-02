const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/java-api',
        createProxyMiddleware({
            
            target: 'http://10.0.4.97:8080/',
            changeOrigin: true,
        })
    )
}
