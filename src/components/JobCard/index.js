import {Link} from 'react-router-dom'
import {HiLocationMarker} from 'react-icons/hi'
import {SiGmail} from 'react-icons/si'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const JobCard = props => {
  const {jobCardDetails} = props

  const {
    title,
    companyLogoUrl,
    rating,
    employmentType,
    location,
    id,
    packagePerAnnum,
    jobDescription,
  } = jobCardDetails

  return (
    <Link to={`/jobs/${id}`} className="job-card-link-item">
      <li className="card-container">
        <div className="type-of-job-container">
          <img src={companyLogoUrl} alt="company logo" className="card-logo" />
          <div className="type-of-job-details">
            <h1 className="card-job-title">{title}</h1>
            <div className="card-stars-container">
              <AiFillStar className="card-star-icon" />
              <p className="card-job-rating-value">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-card-location-container">
          <div className="job-card-location">
            <HiLocationMarker className="job-card-location-icon" />
            <p className="job-card-location-details">{location}</p>
          </div>
          <div className="job-card-job-type">
            <SiGmail className="job-card-gmail-icon" />
            <p className="job-card-location-details">{employmentType}</p>
          </div>
          <p className="job-card-income-details">{packagePerAnnum}</p>
        </div>
        <hr className="job-card-hr" />
        <h1 className="job-card-description-heading">Description</h1>
        <p className="job-card-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
