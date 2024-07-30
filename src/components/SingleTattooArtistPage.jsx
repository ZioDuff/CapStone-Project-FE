import "../style/partials/_singleTattooArtistPage.scss"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  fetchDeleteOwnTattooAction,
  fetchSingleTattooArtistAction,
} from "../redux/actions"
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap"
import TattooCard from "./TattooCard"
import { fetchDeleteTattooArtistAction } from "../redux/actions"
const SingleTattooArtistPage = () => {
  const singleTattooArtist = useSelector(
    (state) => state.tattooArtist.singleTattooArtist
  )
  const loading = useSelector((state) => state.tattooArtist.loading)
  const tattoos = useSelector(
    (state) => state.tattooArtist.singleTattooArtist?.tattoos
  )
  const token = useSelector((state) => state.user.user_bearer?.accessToken)
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const tattooArtistId = useSelector((state) => state.user?.user_info?.id)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const handleShowDeleteModal = () => setShowDeleteModal(true)
  const handleCloseDeleteModal = () => setShowDeleteModal(false)

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleTattooArtistAction(id))
    }
  }, [dispatch, id])

  const handleDeleteTattooArtist = () => {
    if (token) {
      dispatch(fetchDeleteTattooArtistAction(token, id)).then(() => {
        navigate("/tatuatori")
      })
    }
  }

  const handleDeleteTattoo = (tattooId) => {
    if (token) {
      dispatch(fetchDeleteOwnTattooAction(token, tattooId)).then(() => {
        handleCloseDeleteModal()
        dispatch(fetchSingleTattooArtistAction(id))
      })
    }
  }

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <>
      <Container className="mt-5" data-bs-theme="dark">
        <Row className="justify-content-center">
          <Col xs={12}>
            {!singleTattooArtist ? (
              <p>nessun artista trovato</p>
            ) : (
              <>
                <div className=" position-relative d-flex align-items-center justify-content-around  ">
                  <div>
                    <img
                      className="artist-avatar"
                      src={singleTattooArtist?.avatarURL}
                      alt={singleTattooArtist?.username}
                    />
                  </div>
                  <div className="text-light">
                    <h2>{singleTattooArtist?.username}</h2>
                  </div>
                </div>
                <div className="mt-4 text-light d-flex align-items-center justify-content-around border-bottom pb-4  ">
                  {isAdmin && (
                    <div>
                      <Button onClick={handleShowDeleteModal}>
                        Elimina artista
                      </Button>
                      <Modal
                        show={showDeleteModal}
                        onHide={handleCloseDeleteModal}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Eliminazione Artista</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h4>Sei sicuro di voler eliminare l'artista:</h4>
                          <p>{singleTattooArtist?.username}</p>
                          <h4>
                            PERDERAI ANCHE TUTTI I TATUAGGI LEGATI ALL'ARTISTA
                          </h4>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            onClick={handleDeleteTattooArtist}
                            variant="danger"
                          >
                            Elimina
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  )}
                  <div>
                    <p className="m-0">qui icona instagram e facebook</p>
                  </div>
                </div>
                <div className="mt-4 d-flex flex-column align-items-center border-bottom pb-5">
                  <h1>Qualcosa su di me!</h1>
                  <div className="text-light">
                    {singleTattooArtist?.description}
                  </div>
                </div>
                {tattoos?.length > 0 ? (
                  <Container className="mt-5">
                    <h2 className="text-light">
                      questi sono alucni dei miei lavori
                    </h2>
                    <Row className="justify-content-center">
                      {tattoos.map((tattoo, i) => (
                        <Col
                          xs={8}
                          md={6}
                          lg={4}
                          xl={4}
                          key={i}
                          className="mb-3 position-relative"
                        >
                          <TattooCard tattoo={tattoo} />
                          {tattooArtistId === id && (
                            <div className="position-absolute end-0 top-0 pt-2 pe-3">
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={handleShowDeleteModal}
                              >
                                ✖️
                              </span>
                              <Modal
                                show={showDeleteModal}
                                onHide={handleCloseDeleteModal}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>
                                    Eliminazione Artista
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <h4>
                                    Sei sicuro di voler eliminare il tatuaggio:
                                  </h4>
                                  <p>{tattoo.name}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    onClick={() =>
                                      handleDeleteTattoo(tattoo.id)
                                    }
                                    variant="danger"
                                  >
                                    Elimina
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          )}
                        </Col>
                      ))}
                    </Row>
                  </Container>
                ) : (
                  <div className="mt-5">
                    <h2 className="text-light">
                      I miei lavori arriveranno presto !
                    </h2>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default SingleTattooArtistPage
