const path = require('path');

module.exports = {
    entry: './src/index.js', // punkt wejścia Twojej aplikacji
    output: {
        filename: 'bundle.js', // nazwa pliku wyjściowego
        path: path.resolve(__dirname, 'dist') // katalog wyjściowy
    },
    module: {
        rules: [
            {
                test: /\.js$/, // przetwarzaj pliki .js
                exclude: /node_modules/, // wyklucz katalog node_modules
                use: {
                    loader: 'babel-loader', // użyj babel-loader
                    options: {
                        presets: ['@babel/preset-env'] // użyj presetu @babel/preset-env
                    }
                }
            }
        ]
    }
};
