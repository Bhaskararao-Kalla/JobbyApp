import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="login-input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="user-input-box"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="login-input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="user-input-box"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({errorMsg, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    console.log(errorMsg)

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-bg-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo-image"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
