const withTypescript = require('@zeit/next-typescript')
const { PHASE_PRODUCTION_SERVER, PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return withTypescript({
      webpack(config, options) {
        return config
      },
      publicRuntimeConfig: {
        ENV: 'development',
        BACKEND_URL: 'http://localhost:5000',
        FRONTEND_URL: 'http://localhost:3000',
      },
    })
  } else if (phase === PHASE_PRODUCTION_SERVER) {
    return withTypescript({
      webpack(config, options) {
        return config
      },
      publicRuntimeConfig: {
        ENV: 'production',
        BACKEND_URL: 'https://api.volka.no',
        FRONTEND_URL: 'https://volka.no',
      },
    })
  }
  /* Staging */
  return withTypescript({
    webpack(config, options) {
      return config
    },
    publicRuntimeConfig: {
      ENV: 'staging',
      BACKEND_URL: 'https://beta.api.volka.no',
      FRONTEND_URL: 'https://beta.volka.no',
    },
  })
}
