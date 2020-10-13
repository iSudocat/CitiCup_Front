module.exports = {
    publicPath: './',
    pages: {
        index: {
            entry: 'src/pages/index.js',
            template: 'src/pages/index.html',
            filename: 'index.html'
        },
        select: {
            entry: 'src/pages/select.js',
            template: 'src/pages/select.html',
            filename: 'select.html'
        }
    }
}
