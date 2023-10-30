const { withFaust, getWpHostname } = require('@faustwp/core')
const withCss = require('@zeit/next-css')
const withPurgeCss = require('next-purgecss')

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
})
withCss(
  withPurgeCss({
    purgeCssPaths: [
      'components/**/*',
      'styles/**/*',
    ],
  }),
)
