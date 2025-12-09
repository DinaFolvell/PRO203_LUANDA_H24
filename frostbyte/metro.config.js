const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Forteller Metro at .cjs også er gyldige kilder
config.resolver.sourceExts.push("cjs");

module.exports = config;