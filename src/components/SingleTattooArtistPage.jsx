import "../style/partials/_singleTattooArtistPage.scss"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import {
  fetchDeleteOwnTattooAction,
  fetchSingleTattooArtistAction,
} from "../redux/actions"
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap"
import TattooCard from "./TattooCard"
import { fetchDeleteTattooArtistAction } from "../redux/actions"
import { FaFacebook, FaInstagram, FaTrash } from "react-icons/fa"
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

  const [selectedTattoo, setSelectedTattoo] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const handleShowDeleteModal = (tattoo) => {
    setSelectedTattoo(tattoo)
    setShowDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setSelectedTattoo(null)
  }

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
      <Container>
        <Row>
          <Col
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <>
      <Container className="mt-5" data-bs-theme="dark">
        <Row className="justify-content-center">
          <Col xs={12}>
            {!singleTattooArtist ? (
              <div className="text-center">
                <h1>OOPS..!</h1>
                <Alert variant="danger">
                  Sembra che ci sia stato un errore!
                  <br />
                  ci scusiamo per il disagio, continua la navigazione
                </Alert>
                <Button as={Link} to="/" className="mb-5">
                  Torna alla Home
                </Button>
              </div>
            ) : (
              <>
                <div className=" artist-container ">
                  <div className="artist-content">
                    <img
                      className=" artist-avatar"
                      src={singleTattooArtist?.avatarURL}
                      alt={singleTattooArtist?.username}
                    />
                    <div className="artist-info">
                      <h1 className="fw-bold">
                        {singleTattooArtist?.username}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-light d-flex align-items-center justify-content-around border-bottom pb-4  ">
                  {isAdmin && (
                    <div>
                      <Button variant="danger" onClick={handleShowDeleteModal}>
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
                          <h4 className="text-light">
                            Sei sicuro di voler eliminare l'artista:
                          </h4>
                          <p className="text-light">
                            username:
                            <span className="ms-1 fw-bold text-primary">
                              {singleTattooArtist?.username}
                            </span>
                          </p>
                          <p className="text-light">
                            nome:
                            <span className="ms-1 fw-bold text-primary">
                              {singleTattooArtist?.name}
                            </span>
                          </p>
                          <p className="text-light">
                            cognome:
                            <span className="ms-1 fw-bold text-primary">
                              {singleTattooArtist?.surname}
                            </span>
                          </p>
                          <Alert variant="danger">
                            PERDERAI ANCHE TUTTI I TATUAGGI LEGATI ALL'ARTISTA!
                          </Alert>
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
                  <div className="text-center">
                    <h4>Contatti</h4>
                    <p>
                      📞 <span>{singleTattooArtist?.phoneNumber}</span>
                    </p>
                    <p>
                      📧 <span>{singleTattooArtist?.email}</span>
                    </p>
                    <a href="#" className=" mx-3">
                      <FaInstagram className="icon-social-artist-page" />
                    </a>
                    <a href="#">
                      <FaFacebook className="icon-social-artist-page" />
                    </a>
                  </div>
                </div>
                <div className="mt-4 d-flex flex-column align-items-center border-bottom pb-5">
                  <h2 className="fs-1">Qualcosa su di me!</h2>
                  <div className="text-light">
                    {singleTattooArtist?.description}
                  </div>
                </div>
                {tattoos?.length > 0 ? (
                  <Container className="mt-3">
                    <h2 className="mb-3 fs-1 text-primary text-center">
                      Questi sono alcuni dei miei lavori!
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
                                className="pe-2"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleShowDeleteModal(tattoo)}
                              >
                                <FaTrash className="text-danger " />
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
                                  <h4 className="text-light">
                                    Sei sicuro di voler eliminare il tatuaggio:
                                  </h4>
                                  <p className="text-light">
                                    nome:
                                    <span className="ms-1 fw-bold text-primary">
                                      {selectedTattoo?.name}
                                    </span>
                                  </p>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    onClick={() =>
                                      handleDeleteTattoo(selectedTattoo?.id)
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
                    <Alert className="text-light text-center">
                      I miei lavori arriveranno presto ! <br /> Puoi guardare i
                      lavori dei miei colleghi!
                    </Alert>
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
