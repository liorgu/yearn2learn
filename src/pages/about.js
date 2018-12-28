import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import classes from './about.module.scss'
import Img from 'gatsby-image'

const About = ({ data }) => (
  <Layout>
    <header>
      <Img fixed={data.liorImage.childImageSharp.fixed} />
      <h1 className={classes.title}>Hello, I am Lior</h1>
      <h2>This is my personal blog</h2>
    </header>
    <h3> About the blog</h3>
    The blog is focused on web development stuff, in two levels:
    <h4>Learning</h4>
    <div>
      I believe that knowing the fundamentals is the key of being a good
      developer.
    </div>
    <div>
      In the <Link to={'/posts'}>posts</Link> section, I will publish articles
      about things we use on a daily basis, but we may not entirely understand
      how it works.
    </div>
    <div>
      I will do my best to explain each subject in the most simple way I can.
    </div>
    <div>
      In addition, In the <Link to={'/resources'}>resources</Link> section, I
      will maintain a list of websites which I find useful, divided by subjects.
    </div>
    <h4>Staying up to date</h4>
    <div>
      If you love to keep updated about web development, the{' '}
      <Link to={'/weekly-links'}>weekly links</Link> section is for you.
    </div>
    <div>
      Each week, I will add a list of interesting posts that were published
      during the previous week.
    </div>
    <div>
      Most of the articles in this list will be technical, but it may contain
      also articles about soft skills and general tech news.
    </div>
    <h3> About myself</h3>
    <div>I am Lior, a web developer and I love it.</div>
    <div>
      I am passionate about web development and constantly read and learn about
      it.
    </div>
    <div>
      I am subscribed to blogs and newsletters, and following the big guns on
      twitter.
    </div>
    <div>
      I am working for <a href="https://www.samanage.com">Samanage</a> company,
      which I proud to be a part of it.
    </div>
    <div>
      In my spare time, I am an addicted sports fan, and enjoying playing the
      piano and composing new melodies.
    </div>
  </Layout>
)

export default About

export const query = graphql`
  query {
    liorImage: file(relativePath: { eq: "lior.png" }) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
