const path = require('path');

async function getMetroConfig() {
  const { getDefaultConfig } = await import('@react-native/metro-config');
  const { withMetroConfig } = await import('react-native-monorepo-config');

  const root = path.resolve(__dirname, '..');

  /**
   * Metro configuration
   * https://facebook.github.io/metro/docs/configuration
   *
   * @type {import('metro-config').MetroConfig}
   */
  return withMetroConfig(getDefaultConfig(__dirname), {
    root,
    dirname: __dirname,
  });
}

module.exports = getMetroConfig();