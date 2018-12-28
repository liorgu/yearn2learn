import React from 'react'
import { Link } from 'gatsby'
import classes from './resources.module.scss'

import Layout from '../components/Layout'

const links = [
  {
    title: 'General',
    url: 'general',
  },
  {
    title: 'Things to Follow',
    url: 'things_to_follow',
  },
  {
    title: 'React and Redux',
    url: 'react_redux',
  },
  {
    title: 'CSS',
    url: 'css',
  },
  {
    title: 'JavaScript',
    url: 'javascript',
  },
  {
    title: 'Web Development',
    url: 'web_development',
  },
  {
    title: 'Git',
    url: 'git',
  },
  {
    title: 'Productivity',
    url: 'productivity',
  },
  {
    title: 'Interviews',
    url: 'interviews',
  },
]
const Resources = () => (
  <Layout>
    <header>
      <h1>Resources</h1>
      <h2>Variety of resources about web development</h2>
    </header>
    <div className={classes.grid}>
      {links.map(link => (
        <h3>
          <Link to={`resources/${link.url}`}>{link.title}</Link>
        </h3>
      ))}
    </div>
  </Layout>
)

export default Resources
