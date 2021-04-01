import * as React from 'react'
import Layout from '../components/Layout/Layout'
import SEO from '../components/Seo'
import CamerasReview from '../components/CamerasReview/CamerasReview'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title='Find the best products'/>
      <CamerasReview/>
    </Layout>
  )
}

export default IndexPage
