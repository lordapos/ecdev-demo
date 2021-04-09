import * as React from 'react'
import Layout from '../components/Layout/Layout'
import SEO from '../components/Seo'
import CamerasReview from '../components/CamerasReview/CamerasReview'
import IncredibleShots from '../components/IncredibleShots/IncredibleShots'
import Banner from '../components/Banner/Banner'
import BestSellers from '../components/BestSellers/BestSellers'
import FeaturedProducts from '../components/FeaturedProducts/FeaturedProducts'
import { graphql } from 'gatsby'

const IndexPage = ({ data }) => {

  return (
    <Layout>
      <SEO title='Find the best products'/>
      <Banner/>
      <FeaturedProducts products={data.swapi.getCatProducts}/>
      <CamerasReview/>
      <IncredibleShots/>
      <BestSellers/>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    swapi {
      getCatProducts(category: "cameras") {
        id, name, image, images, price, rating, numReviews, slug
      }
    }
  }
`