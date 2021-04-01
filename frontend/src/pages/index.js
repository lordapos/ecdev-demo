import * as React from 'react'
import Layout from '../components/Layout/Layout'
import SEO from '../components/Seo'
import CamerasReview from '../components/CamerasReview/CamerasReview'
import IncredibleShots from '../components/IncredibleShots/IncredibleShots'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title='Find the best products'/>
      <CamerasReview/>
      <IncredibleShots/>
    </Layout>
  )
}

export default IndexPage
