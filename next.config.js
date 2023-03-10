const { env } = require('./src/server/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'raw.githubusercontent.com',
      'img.pokemondb.net',
      'cdn.discordapp.com',
    ],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

module.exports = nextConfig;
