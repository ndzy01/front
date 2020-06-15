yarn add sass-resources-loader -D
npm install sass-resources-loader -D
yarn add node-sass

```js
 {
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  // TODO: 不注释掉会有问题
                  // modules: true, // css-module
                  // localIdentName: '[name]-[local]-[hash:base64:5]', // css-module hash
                  sourceMap: isEnvProduction && shouldUseSourceMap, // 是否map
                },
                'sass-loader'
              ).concat({
                // 全局的 样式不需要每次 @import
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    path.resolve(__dirname, '../src/common/common.scss'),
                  ],
                },
              }),
              sideEffects: true,
            },
```

yarn add axios

npm install react-router-dom @/types/react-router-dom -S
npm install react-router 
npm install antd   


echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p 解除ubuntu文件限制

npm install mobx-react-lite
npm install mobx
npm install braft-editor braft-utils