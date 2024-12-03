const { createProxyMiddleware } = require('http-proxy-middleware');

// True quando local
const DEBUG = false

// False quando em nuvem
// const DEBUG = false 

// DEBUG ? 'http://localhost:8080' : '35.200.242.24:8080/
module.exports = function(app) {
    app.use(
        '/java-api',
        createProxyMiddleware({
            //35.200.242.24:8080
            target: DEBUG ? 'http://localhost:8080' : '35.200.242.24:8080',
            changeOrigin: true,
        })
    )
}
