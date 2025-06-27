const PROXY_CONFIG = [
  {
    context: [
      "/api"
    ],
    target: 'http://localhost:2308/',
    secure: false,
    changeOrigin: true,
    logLevel: 'debug',
  }
];

module.exports = PROXY_CONFIG;
