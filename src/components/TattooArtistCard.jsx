import { Link } from "react-router-dom"
import "../style/partials/_tattooArtistCard.scss"
import { Card } from "react-bootstrap"

const TattooArtistCard = ({ tattooArtist }) => {
  return (
    <>
      <Card
        as={Link}
        to={`/tatuatore/${tattooArtist?.id}`}
        className="bg-dark text-white "
      >
        <Card.Img
          className="artist-card"
          src={tattooArtist?.avatarURL}
          alt={tattooArtist?.username}
        />
        <div className="overlay-card">
          <div className="d-flex flex-column p-2">
            <Card.Title>{tattooArtist?.username}</Card.Title>
            <Link
              to={`/tatuatore/${tattooArtist?.id}`}
              className="text-decoration-undeline"
            >
              Scopri di piu
            </Link>
          </div>
        </div>
      </Card>
    </>
  )
}
export default TattooArtistCard
