import { useEffect, useState } from "react"
import "../style/App.scss"
import "react-calendar/dist/Calendar.css"
import "../style/partials/_reservationForm.scss"
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap"
import Calendar from "react-calendar"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  fetchDeleteReservationAction,
  fetchGetReservationAction,
  fetchSaveReservationAction,
  fetchSaveTattooSessionReservationAction,
  fetchTattooArtistsAction,
} from "../redux/actions"
import moment from "moment"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export const ReservationPage = () => {
  const loggedUser = useSelector((state) => state.user?.user_info)
  const userReservations = useSelector(
    (state) => state.user?.user_info?.reservations
  )
  const reservations = useSelector((state) => state.reservations?.reservations)
  const isLogged = useSelector((state) => state.user?.isLogged)
  const tattooArtistsArray = useSelector(
    (state) => state.tattooArtist?.tattooArtists
  )
  const reservationLoading = useSelector(
    (state) => state.reservations?.isLoading
  )
  const token = useSelector((state) => state.user.user_bearer?.accessToken)
  const isAdmin = useSelector((state) => state.user?.isAdmin)
  const tattooSessionError = useSelector(
    (state) => state.error?.errorTattooSession
  )
  const consultationError = useSelector(
    (state) => state.error?.errorConsultation
  )
  const dispatch = useDispatch()

  const [dateReservation, setDateReservation] = useState(new Date())
  const [timeReservation, setTimeReservation] = useState("")
  const [tattooArtistUsername, setTattooArtistusername] = useState("")
  const [username, setUsername] = useState("")
  const [show, setShow] = useState(false)
  const [numOfPage, setNumOfPage] = useState(0)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleDateChange = (newDate) => {
    setDateReservation(newDate)
  }

  const handleDeleteReservation = (reservationId) => {
    if (token) {
      dispatch(fetchDeleteReservationAction(token, reservationId)).then(() => {
        handleClose()
      })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formattedDate = moment(dateReservation).format("YYYY-MM-DD")

    const formattedTime = timeReservation + ":00"

    const reservationObj = {
      dateReservation: formattedDate,
      timeReservation: formattedTime,
      tattooArtistUsername: tattooArtistUsername,
    }
    dispatch(fetchSaveReservationAction(token, reservationObj))
  }

  const handleTattooSessionSubmit = (e) => {
    e.preventDefault()

    const formattedDate = moment(dateReservation).format("YYYY-MM-DD")

    const formattedTime = timeReservation + ":00"

    const tattooSessionReservationObj = {
      dateReservation: formattedDate,
      timeReservation: formattedTime,
      username: username,
    }
    console.log(tattooSessionReservationObj)
    dispatch(
      fetchSaveTattooSessionReservationAction(
        token,
        tattooSessionReservationObj
      )
    )
  }

  useEffect(() => {
    if (isAdmin) {
      dispatch(fetchGetReservationAction(token, numOfPage))
    } else {
      dispatch(fetchTattooArtistsAction())
      console.log(dateReservation)
    }
  }, [dispatch, isAdmin, token, numOfPage])

  if (isAdmin) {
    return (
      <Container>
        <Row>
          <Col>
            <div>
              <Alert className="mt-4 text-center">
                Bentornato {loggedUser?.name} <br />
                qui trovi tutte le prenotazioni!
              </Alert>
              {reservations?.content?.length > 0 ? (
                <>
                  {reservations?.content.map((reservation, i) => (
                    <Col key={i}>
                      <Card className="mb-4">
                        <Card.Header className="text-center text-light">
                          Tipo di Prenotazione: {reservation?.typeReservation}
                        </Card.Header>
                        <Card.Body>
                          <Card.Title className="mb-4 text-center text-light">
                            Data: {reservation?.dateReservation} - Ora:
                            {reservation?.timeReservation}
                          </Card.Title>
                          <Card.Text as="div" className="mb-4">
                            <div>
                              <div className="d-flex justify-content-center align-items-center ">
                                <div className="me-2">
                                  <img
                                    className=" reservation-img-card rounded-circle "
                                    src={reservation.tattoArtist?.avatarURL}
                                  />
                                </div>
                                <div className="me-2">
                                  <span className="text-light">Artista:</span>
                                  <span className="ms-1 text-primary fw-bold">
                                    {reservation.tattoArtist?.username}
                                  </span>
                                </div>
                              </div>
                              <div className="d-flex justify-content-center align-items-center ">
                                <div className="me-2">
                                  <span className="text-light">Utente:</span>
                                  <span className=" ms-1 text-primary fw-bold">
                                    {reservation.user?.username}
                                  </span>
                                </div>
                                <div>
                                  <img
                                    className="reservation-img-card rounded-circle "
                                    src={reservation.user?.avatarURL}
                                  />
                                </div>
                              </div>
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              ) : (
                <div>
                  <Alert>
                    Sembra che al momento non ci siano prenotazioni!
                  </Alert>
                </div>
              )}
            </div>
          </Col>
          <Col className="mb-4" xs={12}>
            <div className="d-flex justify-content-evenly align-items-center">
              <span onClick={() => setNumOfPage(numOfPage - 1)}>
                <FaArrowLeft />
              </span>
              <span>{numOfPage + 1} </span>
              <span onClick={() => setNumOfPage(numOfPage + 1)}>
                <FaArrowRight />
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <>
      <Container data-bs-theme="dark" className="text-center">
        <Row>
          <Col>
            {loggedUser?.role === "USER" && (
              <div className="my-4">
                <h1>Prenota ora la tua consultazione!</h1>
                <p className="text-light">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Iusto, minus! Enim, voluptatem impedit officiis minima neque
                  eveniet corporis repellat odit sed assumenda blanditiis velit,
                  dolores odio in iste? Tenetur, voluptatem!
                </p>
              </div>
            )}
            {loggedUser?.role === "TATTOOARTIST" && (
              <div className="my-4">
                <h1>Consulta le tue prenotazioni!</h1>
              </div>
            )}
            {!isLogged ? (
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: "50vh" }}
              >
                <Alert variant="danger" className="mt-4 text-light">
                  Per poter procedere con la prenotazione devi prima registrarti
                  o accedere
                </Alert>
                <Button as={Link} to="/login" className="btn-primary">
                  Login
                </Button>
              </div>
            ) : (
              <>
                <Container>
                  <Row>
                    {loggedUser?.role === "USER" && (
                      <Form
                        className="reservation-form"
                        onSubmit={handleSubmit}
                      >
                        <Alert variant="warning">
                          Fai attenzione una volta inviata la tua prenotazione
                          non ne potrai effetuare un altra!
                        </Alert>
                        <Col>
                          <Calendar
                            onChange={handleDateChange}
                            value={dateReservation}
                          />
                        </Col>
                        <Col
                          xs={12}
                          md={10}
                          lg={8}
                          xl={6}
                          className="d-flex flex-column mx-auto "
                        >
                          <p className="mt-2 text-light">
                            Data selezionata:{" "}
                            <span className="text-primary fw-bold">
                              {dateReservation.toDateString()}
                            </span>
                          </p>

                          <Form.Label className="text-light">
                            Ora:
                            <Form.Control
                              className="mb-2"
                              style={{ cursor: "pointer" }}
                              required
                              type="time"
                              value={timeReservation}
                              onChange={(e) =>
                                setTimeReservation(e.target.value)
                              }
                            />
                          </Form.Label>
                          <Form.Label className="text-light">
                            Tatuatore
                            <Form.Select
                              required
                              className="mb-2"
                              onChange={(e) =>
                                setTattooArtistusername(e.target.value)
                              }
                            >
                              <option>artista</option>
                              {tattooArtistsArray?.length > 0 ? (
                                tattooArtistsArray.map((tattooArtist, i) => {
                                  return (
                                    <option key={i}>
                                      {tattooArtist?.username}
                                    </option>
                                  )
                                })
                              ) : (
                                <></>
                              )}
                            </Form.Select>
                          </Form.Label>
                          {consultationError && (
                            <Alert variant="danger">{consultationError}</Alert>
                          )}
                          {reservationLoading ? (
                            <div className="my-4">
                              <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </Spinner>
                            </div>
                          ) : (
                            <Button className="btn-primary my-4" type="submit">
                              Prenota
                            </Button>
                          )}
                        </Col>
                      </Form>
                    )}
                    {loggedUser.role === "TATTOOARTIST" && (
                      <Form
                        className="reservation-form"
                        onSubmit={handleTattooSessionSubmit}
                      >
                        <Alert className="text-light" variant="warning">
                          Bentornato{" "}
                          <span className="fw-bold text-uppercase text-primary">
                            {loggedUser?.username}
                          </span>
                          , è il momento di una nuova prenotazione
                        </Alert>
                        <Col>
                          <Calendar
                            onChange={handleDateChange}
                            value={dateReservation}
                          />
                        </Col>
                        <Col
                          xs={12}
                          md={10}
                          lg={8}
                          xl={6}
                          className="d-flex flex-column mx-auto "
                        >
                          <p className="mt-2 text-light">
                            Data selezionata:{" "}
                            <span className="text-primary fw-bold">
                              {dateReservation.toDateString()}
                            </span>
                          </p>

                          <Form.Label className="text-light">
                            Ora:
                            <Form.Control
                              className="mb-2"
                              style={{ cursor: "pointer" }}
                              required
                              type="time"
                              value={timeReservation}
                              onChange={(e) =>
                                setTimeReservation(e.target.value)
                              }
                            />
                          </Form.Label>
                          <Form.Label className="text-light">
                            Utente
                            <Form.Control
                              className="mb-2"
                              required
                              type="text"
                              placeholder="username utente.."
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </Form.Label>
                          {tattooSessionError && (
                            <Alert variant="danger">{tattooSessionError}</Alert>
                          )}
                          {reservationLoading ? (
                            <div className="my-4">
                              <Spinner animation="border" role="status">
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </Spinner>
                            </div>
                          ) : (
                            <Button className="btn-primary my-4" type="submit">
                              Prenota
                            </Button>
                          )}
                        </Col>
                      </Form>
                    )}
                  </Row>
                </Container>
                <Container className="border-top ">
                  <Row>
                    {userReservations?.length > 0 ? (
                      <>
                        <h4 className="text-light my-4">Le tue prenotazioni</h4>
                        {userReservations.map((reservation, i) => (
                          <Col
                            xs={12}
                            md={userReservations?.length > 1 ? 6 : 12}
                            key={i}
                          >
                            <Card className="mb-4">
                              <Card.Header>
                                Tipo di Prenotazione:{" "}
                                {reservation?.typeReservation}
                              </Card.Header>
                              <Card.Body>
                                <Card.Title className="mb-4">
                                  Data: {reservation?.dateReservation} - Ora:
                                  {reservation?.timeReservation}
                                </Card.Title>
                                <Card.Text as="div" className="mb-4">
                                  {loggedUser.role === "USER" && (
                                    <div className="d-flex justify-content-center align-items-center ">
                                      <div className="me-2">
                                        Artista:{" "}
                                        {reservation.tattoArtist?.username}
                                      </div>
                                      <div>
                                        <img
                                          className="reservation-img-card rounded-circle "
                                          src={
                                            reservation.tattoArtist?.avatarURL
                                          }
                                        />
                                      </div>
                                    </div>
                                  )}
                                  {loggedUser.role === "TATTOOARTIST" && (
                                    <div className="d-flex justify-content-center align-items-center mb-4">
                                      <div className="me-2">
                                        Utente: {reservation.user?.username}
                                      </div>
                                      <div>
                                        <img
                                          className="reservation-img-card rounded-circle "
                                          src={reservation.user?.avatarURL}
                                        />
                                      </div>
                                    </div>
                                  )}
                                </Card.Text>
                                {loggedUser?.role === "USER" &&
                                  reservation?.typeReservation ===
                                    "CONSULTATION" && (
                                    <>
                                      <Button
                                        onClick={handleShow}
                                        variant="danger"
                                      >
                                        Elimina
                                      </Button>
                                      <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title>
                                            Elimina Prenotazione
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="text-light">
                                          <h4>
                                            Sicuro di voler eliminare la
                                            prenotazione:
                                          </h4>
                                          <p className="mb-1">
                                            Di tipo:
                                            <span className="ms-1 text-primary fw-bold">
                                              {reservation?.typeReservation},
                                            </span>
                                          </p>
                                          <p className="mb-1">
                                            Con:
                                            <span className="ms-1 text-primary fw-bold">
                                              {
                                                reservation.tattoArtist
                                                  ?.username
                                              }
                                              ,
                                            </span>
                                          </p>
                                          <p className="mb-1">
                                            in data:
                                            <span className="ms-1 text-primary fw-bold">
                                              {reservation?.dateReservation}.
                                            </span>
                                          </p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <Button
                                            onClick={() =>
                                              handleDeleteReservation(
                                                reservation?.id
                                              )
                                            }
                                            variant="danger"
                                          >
                                            Elimina
                                          </Button>
                                        </Modal.Footer>
                                      </Modal>
                                    </>
                                  )}
                                {loggedUser?.role === "TATTOOARTIST" &&
                                  reservation?.typeReservation ===
                                    "TATTOO_SESSION" && (
                                    <>
                                      <Button
                                        onClick={handleShow}
                                        variant="danger"
                                      >
                                        Elimina
                                      </Button>
                                      <Modal
                                        show={show}
                                        onHide={handleClose}
                                        backdrop="static"
                                        keyboard={false}
                                      >
                                        <Modal.Header closeButton>
                                          <Modal.Title>
                                            Elimina Prenotazione
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className="text-light">
                                          <h4>
                                            Sicuro di voler eliminare la
                                            prenotazione:
                                          </h4>
                                          <p className="mb-1">
                                            Di tipo:
                                            <span className="ms-1 text-primary fw-bold">
                                              {reservation?.typeReservation},
                                            </span>
                                          </p>
                                          <p className="mb-1">
                                            Con:
                                            <span className="ms-1 text-primary fw-bold">
                                              {reservation.user?.username},
                                            </span>
                                          </p>
                                          <p className="mb-1">
                                            in data:
                                            <span className="ms-1 text-primary fw-bold">
                                              {reservation?.dateReservation}.
                                            </span>
                                          </p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <Button
                                            onClick={() =>
                                              handleDeleteReservation(
                                                reservation?.id
                                              )
                                            }
                                            variant="danger"
                                          >
                                            Elimina
                                          </Button>
                                        </Modal.Footer>
                                      </Modal>
                                    </>
                                  )}
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </>
                    ) : (
                      <div className="mt-4">
                        <Alert variant="warning">
                          Al momento non hai nessuna prenotazione
                        </Alert>
                      </div>
                    )}
                  </Row>
                </Container>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}
