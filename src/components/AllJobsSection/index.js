import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import JobCard from '../JobCard'
import ProfileAndFilterSection from '../ProfileAndFilterSection'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class AllJobsSection extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    apiStatus: apiStatusConstant.initial,
    salaryRange: 0,
    employmentType: [],
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const {salaryRange, employmentType, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.jobs.map(each => ({
        title: each.title,
        rating: each.rating,
        id: each.id,
        location: each.location,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        packagePerAnnum: each.package_per_annum,
      }))
      //   console.log(updatedData)

      this.setState({
        apiStatus: apiStatusConstant.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="ThreeDots" color="#6366f1" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="all-jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="all-jobs-failure-image"
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
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    const isDisplayResults = jobsList.length > 0

    return isDisplayResults ? (
      <ul className="job-cards-container">
        {jobsList.map(each => (
          <JobCard key={each.id} jobCardDetails={each} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderApiResponseView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onKeyDownEnter = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onChangeSalaryRange = event => {
    const {value} = event.target
    // console.log(checked, value)
    // if (checked === false) {
    //   this.setState({salaryRange: value}, this.getJobs)
    // } else {
    //   this.setState({salaryRange: 0}, this.getJobs)
    // }
    this.setState({salaryRange: value}, this.getJobs)
  }

  onChangeEmploymentType = event => {
    const {value, checked} = event.target

    if (checked) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, event.target.value],
        }),
        this.getJobs,
      )
    } else {
      const {employmentType} = this.state
      const filterEmploymentType = employmentType.filter(each => each !== value)

      this.setState({employmentType: filterEmploymentType}, this.getJobs)
    }
  }

  renderProfileAndFilterView = () => {
    const {searchInput, salaryRange} = this.state

    return (
      <ProfileAndFilterSection
        employmentTypesList={employmentTypesList}
        salaryRangesList={salaryRangesList}
        onChangeSalaryRange={this.onChangeSalaryRange}
        onChangeEmploymentType={this.onChangeEmploymentType}
        searchInput={searchInput}
        getJobs={this.getJobs}
        onChangeSearchInput={this.onChangeSearchInput}
        salaryRange={salaryRange}
      />
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-section-container">
        {this.renderProfileAndFilterView()}
        <div className="jobs-responsive-container">
          <div className="search-box-container">
            <input
              type="search"
              onChange={this.onChangeSearchInput}
              className="search-input-box"
              value={searchInput}
              onKeyDown={this.onKeyDownEnter}
            />
            <button
              className="search-button"
              onClick={this.getJobs}
              type="button"
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.renderApiResponseView()}
        </div>
      </div>
    )
  }
}

export default AllJobsSection
