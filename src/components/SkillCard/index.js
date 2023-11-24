import './index.css'

const SkillCard = props => {
  const {skillCardDetails} = props

  const {name, imageUrl} = skillCardDetails
  console.log(name)

  return (
    <li className="skill-item-container">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default SkillCard
