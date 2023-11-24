import {HiLocationMarker} from 'react-icons/hi'
import {SiGmail} from 'react-icons/si'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobItemDetails} = props

  const {
    title,
    companyLogoUrl,
    rating,
    employmentType,
    location,
    jobDescription,
  } = similarJobItemDetails

  console.log(location)

  return (
    <li className="similar-item-container">
      <div className="similar-job-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-card-logo"
        />
        <div className="similar-job-details">
          <h1 className="similar-job-title">{title}</h1>
          <div className="card-stars-container">
            <AiFillStar className="card-star-icon" />
            <p className="similar-job-rating-value">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="similar-job-location-type-container">
        <div className="similar-job-location">
          <HiLocationMarker className="similar-job-location-icon" />
          <p className="similar-job-location-details">{location}</p>
        </div>
        <div className="similar-job-job-type">
          <SiGmail className="similar-job-gmail-icon" />
          <p className="similar-job-location-details">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
