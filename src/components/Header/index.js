import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="header-content-container">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="nav-logo-image"
            alt="website logo"
          />
        </Link>
        <ul className="nav-mobile-menu">
          <Link to="/" className="nav-link">
            <li className="link-item">
              <AiFillHome className="ai-fill-home-icon" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="link-item">
              <BsFillBriefcaseFill className="briefcase-icon" />
            </li>
          </Link>
          <li className="link-item">
            <FiLogOut className="logout-icon" onClick={onClickLogout} />
          </li>
        </ul>
        <ul className="nav-desktop-menu">
          <Link className="nav-link" to="/">
            <li className="link-item">Home</li>
          </Link>
          <Link className="nav-link" to="/jobs">
            <li className="link-item">Jobs</li>
          </Link>
        </ul>
        <button
          className="logout-icon-button"
          type="button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
