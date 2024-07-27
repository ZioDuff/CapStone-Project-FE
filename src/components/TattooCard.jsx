import { Card } from "react-bootstrap"
import "../style/partials/_tattooCard.scss"
const TattooCard = ({ tattoo }) => {
  return (
    <>
      <Card border="warning">
        <Card.Img
          className="tattoo-card"
          src={tattoo.tattoURL}
          alt={tattoo.name}
        />
        <div className="card-overlay p-2">
          <Card.Title>{tattoo?.name}</Card.Title>
        </div>
      </Card>
    </>
  )
}
export default TattooCard
