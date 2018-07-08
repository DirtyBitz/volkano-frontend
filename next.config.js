const withTypescript = require('@zeit/next-typescript')

module.exports = (phase, { defaultConfig }) => {
  const current_env = process.env.HEROKU_ENV
  var publicRuntimeConfig = {
    ENV: 'development',
    BACKEND_URL: 'http://localhost:5000',
    FRONTEND_URL: 'http://localhost:3000',
  }

  if (current_env === 'production' || current_env === 'staging') {
    publicRuntimeConfig = {
      ENV: current_env,
      BACKEND_URL: `https://${process.env.BACKEND_HOSTNAME}`,
      FRONTEND_URL: `https://${process.env.FRONTEND_HOSTNAME}`,
      SENTRY_DSN: process.env.SENTRY_DSN,
    }
  }

  return withTypescript({
    webpack(config, options) {
      return config
    },
    publicRuntimeConfig,
  })
}
