
const dist = './dist/webpack/src/';
module.exports = {
    development: require(`${dist}envs/development`),
    alpha: require(`${dist}envs/alpha`),
    production: require(`${dist}envs/production`)
};