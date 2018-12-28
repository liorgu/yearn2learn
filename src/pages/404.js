import React from 'react'
import Layout from '../components/Layout'
import BackButton from '../components/BackButton'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import classes from './404.module.scss'

const NotFoundPage = ({ data }) => {
  const goBack = () => history.back()
  return (
    <Layout>
      <div className={classes.wrapper}>
        <Img fixed={data.image.childImageSharp.fixed} />
        <div className={classes.textWrapper}>
          <h1> Oops... This page does not exist</h1>
          <BackButton />
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const query = graphql`
  query {
    image: file(relativePath: { eq: "404.jpg" }) {
      childImageSharp {
        fixed(width: 480, height: 480) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
