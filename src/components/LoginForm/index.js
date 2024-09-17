import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    navigate('/')
    setIsError(false)
  }

  const onFailure = error => {
    setErrorMsg(error)
    setIsError(true)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch('https://apis.ccbp.in/login', options)
      const data = await response.json()

      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onFailure(data.error_msg)
      }
    } catch (error) {
      onFailure('Something went wrong. Please try again.')
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  useEffect(() => {
    if (jwtToken !== undefined) {
      navigate('/')
    }
  }, [jwtToken, navigate])

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-image"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-image"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {isError && <p>*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm
