const { slash } = require(`gatsby-core-utils`)
const path = require(`path`)
exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      swapi {
        getProducts {
          id, slug
        }
        getCategories {
          id, slug
        }
      }
    }
  `)
  const pageTemplate = path.resolve(`./src/templates/product.js`)
  const catTemplate = path.resolve(`./src/templates/category.js`)
  data.swapi.getProducts.forEach(({ slug }) => {
    actions.createPage({
      path: `/product/${slug}`,
      component: slash(pageTemplate),
      context: {
        slug: slug,
      },
    })
  })
  data.swapi.getCategories.forEach(({ slug }) => {
    actions.createPage({
      path: `/${slug}`,
      component: slash(catTemplate),
      context: {
        category: slug,
      },
    })
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  if (page.path === `/order/`) {
    page.matchPath = `/order/*`
    createPage(page)
  }  else if (page.path === `/admin/user/`) {
    page.matchPath = `/admin/user/*`
    createPage(page)
  } else if (page.path === `/admin/product/`) {
    page.matchPath = `/admin/product/*`
    createPage(page)
  } else if (page.path === `/admin/order/`) {
    page.matchPath = `/admin/order/*`
    createPage(page)
  }
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig()
  const miniCssExtractPlugin = config.plugins.find(
    plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
  )
  if (miniCssExtractPlugin) {
    miniCssExtractPlugin.options.ignoreOrder = true
  }
  actions.replaceWebpackConfig(config)
}