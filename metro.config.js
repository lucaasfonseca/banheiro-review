// metro.config.js
const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

// Corrige Firebase Auth + Expo SDK 53 (Hermes + exports field)
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
