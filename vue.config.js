// module.exports = {
//   assetsSubDirectory: 'static',
//   assetsPublicPath: '/',
//   proxyTable: {
//     '/api': {
//       // action="https://www.graycloud.top/image/"
//       target: 'http://localhost:8080',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api': ''
//       }
//     },
//   }
// }

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  outputDir: 'dist',
  // assetsPublicPath: './',
  devServer: {
    port: 8080,
    host: '192.168.2.18',
  }
}
