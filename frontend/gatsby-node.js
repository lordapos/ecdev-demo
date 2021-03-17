// Create dynamic routing
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  if (page.path === `/product/`) {
    page.matchPath = `/product/*`
    createPage(page)
  } else if (page.path === `/order/`) {
    page.matchPath = `/order/*`
    createPage(page)
  }
}