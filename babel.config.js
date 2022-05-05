const presets = [
    ['@babel/preset-env', { // какой пресет использовать
        targets: { // какие версии браузеров поддерживать
            edge: '17',
            ie: '11',
            firefox: '50',
            chrome: '64',
            safari: '11.1'
        },

        // использовать полифиллы для браузеров из свойства target
        // по умолчанию babel использует поллифиллы библиотеки core-js
        useBuiltIns: "entry"
    }]
];

rules: [{
    test: /\.js$/,
    use: 'babel-loader',
    exclude: '/node_modules/'
},
// добавили правило для обработки файлов
{
    // регулярное выражение, которое ищет все файлы с такими расширениями
    test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource'
},
]

module.exports = { presets };