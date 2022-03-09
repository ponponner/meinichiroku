const dotenv = require('dotenv')
const myEnv = dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});
const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(myEnv);

/** @type {import('gatsby').GatsbyConfig} */
module.exports = {
  siteMetadata: {
    title: `命日録`,
    siteUrl: `https://ponponner.github.io/meinichiroku/`
  },
  pathPrefix: "/meinichiroku",
  plugins: [
    "gatsby-plugin-sass"
  ]
};