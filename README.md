## 建立项目
1.npm i webpack -g    全局安装webpack
2.npm install --global vue-cli   安装vue脚手架
3.vue init webpack vue-cli-test   下载

## 下载依赖包
1.npm i element-ui -S   安装element-ui 
2.安装less  npm i less less-loader -D -S 

一直出现下面报错：
error  in ./src/components/HelloWorld.vue

Module build failed: TypeError: loaderContext.getResolve is not a function
    at createWebpackLessPlugin (C:\Users\Administrator\Desktop\vue-cli-test\node_modules\less-loader\dist\utils.js:36:33)
    at getLessOptions (C:\Users\Administrator\Desktop\vue-cli-test\node_modules\less-loader\dist\utils.js:150:31)
    at Object.lessLoader (C:\Users\Administrator\Desktop\vue-cli-test\node_modules\less-loader\dist\index.js:29:49)

 @ ./node_modules/vue-style-loader!./node_modules/css-loader?{"sourceMap":true}!./node_modules/vue-loader/lib/style-compiler?{"vue":true,"id":"data-v-469af010","scoped":true,"hasInlineConfig":false}!./node_modules/less-loader/dist/cjs.js?{"sourceMap":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/components/HelloWorld.vue 4:14-375 13:3-17:5 14:22-383
 @ ./src/components/HelloWorld.vue
 @ ./src/router/index.js
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://localhost:8082 webpack/hot/dev-server ./src/main.js

 找到原因：是less-loader的版本和less对应不上

npm uninstall less-loader
npm install less-loader@5.0.0 -D -S







