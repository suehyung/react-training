##Fast Way
1. Deploy Create React App:
    npm install -g create-react-app
    create-react-app my-app
    cd my-app
    npm start

##Slow Way
1. Install dependencies. Create new dir and run:
    npm init
    npm install --save react react-dom
    npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-react css-loader style-loader html-webpack-plugin webpack webpack-dev-server webpack-cli

2. Create .gitignore in dir and insert the following:
    node_modules
    dist

3. Create webpack.config.js in dir and insert the following:
    module.exports = {
      entry: './app/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js'
      },
      module: {
        rules: [
          { test: /\.(js)$/, use: 'babel-loader' },
          { test: /\.css$/, use: [ 'style-loader', 'css-loader' ]}
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: 'app/index.html'
        })
      ],
      mode: "development"
    }

4. Create index.css, index.html, index.js files in app folder
  See examples in this repo

5. Folder structure is typically something like:
    /app
      - components
      - utils
      index.css
      index.js
      index.html
    /dist
      index.html
      index_bundle.js
    package.json
    webpack.config.js
    .gitignore
