import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const profileApiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {apiStatus: profileApiStatusConstant.initial, profileDetails: {}}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: profileApiStatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileDetails: profileData,
        apiStatus: profileApiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: profileApiStatusConstant.failure})
    }
  }

  renderProfileLoaderView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color=" #6366f1" height={80} width={80} />
    </div>
  )

  renderProfileFailureView = () => (
    <div className="profile-failure-container">
      <button
        className="profile-button"
        type="button"
        onClick={this.getProfileDetails}
        data-testid="button"
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileDetails} = this.state

    const {name, shortBio, profileImageUrl} = profileDetails

    return (
      <div className="profile-details-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />

        <h1 className="profile-name">{name}</h1>
        <p className="profile-short-bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case profileApiStatusConstant.inProgress:
        return this.renderProfileLoaderView()
      case profileApiStatusConstant.success:
        return this.renderProfileSuccessView()
      case profileApiStatusConstant.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }
}

export default ProfileDetails
