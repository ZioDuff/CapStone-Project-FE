import { Link } from "react-router-dom"
import "../style/partials/_tattooArtistCard.scss"
import { Button, Card, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { fetchDeleteTattooArtistAction } from "../redux/actions"

const TattooArtistCard = ({ tattooArtist }) => {
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const token = useSelector((state) => state.user.user_bearer?.accessToken)
  const dispatch = useDispatch()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const handleShowDeleteModal = () => setShowDeleteModal(true)
  const handleCloseDeleteModal = () => setShowDeleteModal(false)
  const handleDelteTattooArtist = () => {
    if (token) {
      dispatch(fetchDeleteTattooArtistAction(token, tattooArtist?.id))
    }
  }
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
          {isAdmin && (
            <div className="position-absolute end-0 top-0 p-2">
              <span
                style={{ cursor: "pointer" }}
                onClick={handleShowDeleteModal}
              >
                ✖️
              </span>
              <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Eliminazione Artista</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h4>Sei sicuro di voler eliminare l'artista:</h4>
                  <p>{tattooArtist.username}</p>
                  <h4>PERDERAI ANCHE TUTTI I TATUAGGI LEGATI ALL'ARTISTA</h4>
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={handleDelteTattooArtist} variant="danger">
                    Elimina
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
        </div>
      </Card>
    </>
  )
}
export default TattooArtistCard
