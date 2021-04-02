import * as React from 'react'
import Layout from '../components/Layout/Layout'
import SEO from '../components/Seo'
import CamerasReview from '../components/CamerasReview/CamerasReview'
import IncredibleShots from '../components/IncredibleShots/IncredibleShots'
import Banner from '../components/Banner/Banner'
import BestSellers from '../components/BestSellers/BestSellers'
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title='Find the best products'/>
      <Banner/>
      <FeaturedProducts/>
      <CamerasReview/>
      <IncredibleShots/>
      <BestSellers/>
    </Layout>
  )
}

export default IndexPage
