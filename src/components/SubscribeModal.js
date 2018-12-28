import React from 'react'

import Modal from 'react-modal'
import classes from './SubscribeModal.module.scss'
import addToMailchimp from 'gatsby-plugin-mailchimp'

class SubscribeModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
      isSent: false,
    }

    this.firstNameInput = React.createRef()
    this.lastNameInput = React.createRef()
    this.emailInput = React.createRef()
  }

  handleSubmit = e => {
    e.preventDefault()

    const firstName = this.firstNameInput.current.value
    const lastName = this.lastNameInput.current.value
    const email = this.emailInput.current.value

    const errors = this.validate(email)
    if (errors.length > 0) {
      this.setState({ errors })
      return
    }

    addToMailchimp(email, {
      FNAME: firstName,
      LNAME: lastName,
    }).then(() => {
      this.setState({ isSent: true }, () =>
        setTimeout(this.props.closeModal, 1000)
      )
    })
  }

  validate = email => {
    const errors = []

    if (!email || !email.length) {
      errors.push('Email cannot be empty')
    }

    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailPattern.test(email)) {
      errors.push('Email is not valid')
    }

    return errors
  }

  modalContent = () => {
    if (this.state.isSent) return <h1> Subscription Successful! </h1>
    return (
      <>
        <a onClick={this.props.closeModal} className={classes.close} />
        <h2>Subscribe to Blog</h2>
        <h3>Get new posts to your inbox, no spam</h3>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <div className={classes.errorsWrapper}>
            {this.state.errors.map(error => (
              <div key={error}>Error: {error}</div>
            ))}
          </div>
          <div className={classes.inputsWrapper}>
            <label>First Name:</label>
            <input
              ref={this.firstNameInput}
              type="text"
              placeholder="First Name"
            />
            <label>Last Name:</label>
            <input
              ref={this.lastNameInput}
              type="text"
              placeholder="Last Name"
            />
            <label>Email:</label>
            <input ref={this.emailInput} type="text" placeholder="Email" />
          </div>
          <button type="submit" className={classes.submitButton}>
            Submit
          </button>
        </form>
      </>
    )
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        className={classes.modal}
        overlayClassName={classes.modalOverlay}
        ariaHideApp={false}
      >
        <div className={classes.wrapper}>{this.modalContent()}</div>
      </Modal>
    )
  }
}

export default SubscribeModal
