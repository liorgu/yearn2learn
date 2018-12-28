import React from 'react'
import classes from './BackButton.module.scss'

const BackButton = () => {
  const goBack = () => history.back()
  return (
    <button className={classes.button} onClick={goBack}>
      ← Go Back
    </button>
  )
}

export default BackButton
