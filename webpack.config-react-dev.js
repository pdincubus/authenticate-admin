const prodConfig = require('./webpack.config-react-prod');

module.exports = {
    ...prodConfig,
    mode: 'development',
};
