// Create dynamic routing
exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  if (page.path === `/product/`) {
    page.matchPath = `/product/*`
    createPage(page)
  } else if (page.path === `/order/`) {
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