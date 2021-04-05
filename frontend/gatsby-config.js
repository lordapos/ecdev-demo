require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Ecdev Shop",
    description: "Full stack web development based on MERN stack",
    author: `Bohdan Oleksiuk`,
    siteUrl: 'https://shop.ecdevstudio.com',
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/admin/*`, `/order`, `/admin`],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "SWAPI",
        queryLimit: 1000,
        fieldName: "swapi",
        url: `${process.env.BACKEND_GRAPHQL}`,
      },
    },
  ],
}
