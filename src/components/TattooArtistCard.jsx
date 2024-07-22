import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"

const TattooArtistCard = ({ tattooArtist }) => {
  return (
    <>
      <div className="d-flex  h-100 p-4">
        <div className="me-5">
          <img src={tattooArtist.avatarURL} alt={tattooArtist.username} />
        </div>
        <div>
          <h2>{tattooArtist.username}</h2>
          <p>
            {tattooArtist.name} {tattooArtist.surname}
          </p>

          <p>{tattooArtist.description}</p>
          <p>
            contattami:{" "}
            <span>
              {tattooArtist.email} o {tattooArtist.phoneNumber}
            </span>
          </p>
          <Link to={`/tatuatore/${tattooArtist.id}`}>
            <Button>Vedi i miei lavori!</Button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default TattooArtistCard
