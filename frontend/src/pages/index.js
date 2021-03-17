import * as React from 'react'
import Layout from '../components/Layout/Layout'
import SEO from '../components/Seo'
import './_home.scss'

const IndexPage = () => {
  return (
    <Layout>
      <SEO title='Find the best products'/>
      <section className='welcome'>
        <div className="welcome__inner">
          <h1>Home</h1>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
