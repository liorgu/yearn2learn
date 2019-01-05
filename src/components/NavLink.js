import React from 'react'
import Link from 'gatsby-link'
import classes from './NavLink.module.scss'

const NavLink = ({ index, currIndex, label, count, pathPrefix }) => {
  if (index < 1 || index > count) return null

  const labelSpan = <span className={classes.label}> {label} </span>
  if (index === currIndex) {
    return <span className={classes.label}> {label} </span>
  }

  const indexPath = index === 1 ? '' : index
  return (
    <Link className={classes.label} to={`${pathPrefix}/${indexPath}`}>
      {label}
    </Link>
  )
}

export default NavLink
