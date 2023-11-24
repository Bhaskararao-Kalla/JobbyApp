import {BsSearch} from 'react-icons/bs'
import ProfileDetails from '../ProfileDetails'

import './index.css'

const ProfileAndFilterSection = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onChangeSalaryRange,
    onChangeEmploymentType,
    searchInput,
    getJobs,
    onChangeSearchInput,
    salaryRange,
  } = props

  const onKeyDownEnter = event => {
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const onChangeSearch = event => {
    onChangeSearchInput(event)
  }

  const renderSearchInputContainer = () => (
    <div className="profile-section-search-container">
      <input
        type="search"
        onChange={onChangeSearch}
        className="profile-search-input-box"
        value={searchInput}
        onKeyDown={onKeyDownEnter}
      />
      <button
        className="filter-search-button"
        onClick={getJobs}
        type="button"
        data-testid="searchButton"
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  const renderSalaryRangeFilter = () => (
    <div className="filter-container">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-ul-container">
        {salaryRangesList.map(each => {
          const onChangeSalary = event => onChangeSalaryRange(event)

          return (
            <li className="filter-li-container" key={each.salaryRangeId}>
              <input
                type="radio"
                className="filter-input"
                id={each.salaryRangeId}
                onChange={onChangeSalary}
                value={each.salaryRangeId}
                checked={salaryRange === each.salaryRangeId}
              />
              <label htmlFor={each.salaryRangeId} className="filter-label">
                {each.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderEmploymentTypeFilter = () => (
    <div className="filter-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-ul-container">
        {employmentTypesList.map(each => {
          const onChangeEmployment = event => onChangeEmploymentType(event)
          return (
            <li className="filter-li-container" key={each.employmentTypeId}>
              <input
                type="checkbox"
                className="filter-input"
                id={each.employmentTypeId}
                onChange={onChangeEmployment}
                value={each.employmentTypeId}
              />
              <label htmlFor={each.employmentTypeId} className="filter-label">
                {each.label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div className="profile-filter-container">
      {renderSearchInputContainer()}
      <ProfileDetails />
      <hr className="profile-filter-hr" />
      {renderEmploymentTypeFilter()}
      <hr className="profile-filter-hr" />
      {renderSalaryRangeFilter()}
    </div>
  )
}

export default ProfileAndFilterSection
