module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/vuejs-instruments/'
    : process.env.NODE_ENV === 'test'?'http://localhost:8081':''
};
