const { withFaust, getWpHostname, getWpUrl } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpUrl()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
