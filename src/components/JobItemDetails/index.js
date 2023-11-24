import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {GoLocation} from 'react-icons/go'

import Header from '../Header'
import SkillCard from '../SkillCard'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetails: {},
    similarJobItemList: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobItem()
  }

  updatedJobItemDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    })),
  })

  updatedSkillsDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    rating: data.rating,
    location: data.location,
    title: data.title,
    jobDescription: data.job_description,
  })

  getJobItem = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedJobItemDetails = this.updatedJobItemDetails(data.job_details)

      const updatedSkillsDetails = data.similar_jobs.map(each =>
        this.updatedSkillsDetails(each),
      )

      this.setState({
        jobItemDetails: updatedJobItemDetails,
        similarJobItemList: updatedSkillsDetails,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" width={80} height={80} color=" #6366f1" />
    </div>
  )

  renderApiFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="job-failure-button"
        type="button"
        data-testid="button"
        onClick={this.getJobItem}
      >
        Retry
      </button>
    </div>
  )

  renderApiSuccessView = () => {
    const {jobItemDetails, similarJobItemList} = this.state

    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      rating,
      title,
      packagePerAnnum,
      skills,
    } = jobItemDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-item-bg-container">
        <div className="job-item-container">
          <div className="type-of-job-item-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-company-logo"
            />
            <div className="type-of-job-item-details">
              <h1 className="job-item-title">{title}</h1>
              <div className="job-item-stars-container">
                <AiFillStar className="job-item-star-icon" />
                <p className="job-item-rating-value">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-location-container">
            <div className="job-item-location-type-container">
              <div className="job-item-location">
                <GoLocation className="job-item-location-icon" />
                <p className="job-item-location-details">{location}</p>
              </div>
              <div className="job-item-job-type">
                <BsBriefcaseFill className="job-item-briefcase-icon" />
                <p className="job-item-employment-type">{employmentType}</p>
              </div>
              <p className="job-card-income-details">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="job-card-hr" />
          <div className="job-item-description-header">
            <h1 className="job-item-description-heading">Description</h1>
            <a className="job-item-anchor-element" href={companyWebsiteUrl}>
              Visit
              <BiLinkExternal className="job-item-link-external" />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skills-container">
            {skills.map(each => (
              <SkillCard key={each.name} skillCardDetails={each} />
            ))}
          </ul>
          <h1 className="life-company-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobItemList.map(each => (
            <SimilarJobItem key={each.id} similarJobItemDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobItemApiView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()

      case apiStatusConstant.success:
        console.log('render')
        return this.renderApiSuccessView()
      case apiStatusConstant.failure:
        return this.renderApiFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-container">
        <Header />
        <div className="job-details-container">
          {this.renderJobItemApiView()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
