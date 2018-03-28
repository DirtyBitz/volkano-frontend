const withTypescript = require('@zeit/next-typescript')

module.exports = (phase, { defaultConfig }) => {
  const current_env = process.env.HEROKU_ENV
  var publicRuntimeConfig = {
    ENV: 'development',
    BACKEND_URL: 'http://localhost:5000',
    FRONTEND_URL: 'http://localhost:3000',
  }

  if (current_env === 'production') {
    publicRuntimeConfig = {
      ENV: current_env,
      BACKEND_URL: 'https://api.volka.no',
      FRONTEND_URL: 'https://volka.no',
    }
  } else if (current_env === 'staging') {
    publicRuntimeConfig = {
      ENV: current_env,
      BACKEND_URL: 'https://beta-api.volka.no',
      FRONTEND_URL: 'https://beta.volka.no',
    }
  }

  return withTypescript({
    webpack(config, options) {
      return config
    },
    publicRuntimeConfig,
  })
}
