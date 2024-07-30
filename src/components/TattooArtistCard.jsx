import { Link } from "react-router-dom"
import "../style/partials/_tattooArtistCard.scss"
import { Card } from "react-bootstrap"

const TattooArtistCard = ({ tattooArtist }) => {
  return (
    <>
      <Card className="bg-dark text-white ">
        <Card.Img
          style={{
            width: "100%",
            aspectRatio: "4/3",
            objectFit: "cover",
          }}
          src={tattooArtist?.avatarURL}
          alt={tattooArtist?.username}
        />
        <div className="card-overlay">
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
