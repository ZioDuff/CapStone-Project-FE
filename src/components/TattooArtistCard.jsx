import { Link } from "react-router-dom"
import "../style/partials/_tattooArtistCard.scss"
import { Button, Card } from "react-bootstrap"

const TattooArtistCard = ({ tattooArtist }) => {
  return (
    <>
      <Card className="bg-dark text-white">
        <Card.Img src={tattooArtist.avatarURL} alt={tattooArtist.username} />
        <Card.ImgOverlay className="d-flex flex-column justify-content-end">
          <Card.Title>{tattooArtist.username}</Card.Title>
          <Card.Text>
            <Button as={Link} to={`/tatuatore/${tattooArtist.id}`}>
              Scopri di piu
            </Button>
          </Card.Text>
        </Card.ImgOverlay>
      </Card>
    </>
  )
}
export default TattooArtistCard
