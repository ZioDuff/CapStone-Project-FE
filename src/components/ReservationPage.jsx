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
} from "react-bootstrap"
import Calendar from "react-calendar"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  fetchDeleteReservationAction,
  fetchSaveReservationAction,
  fetchSaveTattooSessionReservationAction,
  fetchTattooArtistsAction,
} from "../redux/actions"
import moment from "moment"
export const ReservationPage = () => {
  const loggedUser = useSelector((state) => state.user?.user_info)
  const reservations = useSelector(
    (state) => state.user?.user_info?.reservations
  )
  const isLogged = useSelector((state) => state.user?.isLogged)
  const tattooArtistsArray = useSelector(
    (state) => state.tattooArtist?.tattooArtists
  )
  const token = useSelector((state) => state.user.user_bearer?.accessToken)
  const dispatch = useDispatch()

  const [dateReservation, setDateReservation] = useState(new Date())
  const [timeReservation, setTimeReservation] = useState("")
  const [tattooArtistUsername, setTattooArtistusername] = useState("")
  const [username, setUsername] = useState("")
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleDateChange = (newDate) => {
    setDateReservation(newDate)
  }

  const handleDeleteReservation = (reservationId) => {
    if (token) {
      dispatch(fetchDeleteReservationAction(token, reservationId))
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
    dispatch(fetchTattooArtistsAction())
    console.log(dateReservation)
  }, [dispatch])
  return (
    <>
      <Container data-bs-theme="dark" className="text-center">
        <Row>
          <Col>
            {loggedUser?.role === "USER" && (
              <>
                <h1>Prenota ora la tua consultazione!</h1>
                <p className="text-light">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Iusto, minus! Enim, voluptatem impedit officiis minima neque
                  eveniet corporis repellat odit sed assumenda blanditiis velit,
                  dolores odio in iste? Tenetur, voluptatem!
                </p>
              </>
            )}
            {loggedUser?.role === "TATTOOARTIST" && (
              <>
                <h1>Consulta le tue prenotazioni!</h1>
              </>
            )}
            {!isLogged ? (
              <>
                <h2 className="text-light">
                  Per poter procedere con la prenotazione devi prima registrarti
                  o accedere
                </h2>
                <Link to="/login" className="btn-primary">
                  vai al Login
                </Link>
                <div className="my-4">
                  <p className="text-light">puoi contattarci tramite </p>
                  <div className="text-light d-flex justify-content-evenly">
                    <span>📞 +39 1234567789</span>
                    <span>icona facebook</span>
                    <span>icona instagram</span>
                  </div>
                </div>
              </>
            ) : (
              <Container>
                <Row>
                  {loggedUser?.role === "USER" && (
                    <Form className="reservation-form" onSubmit={handleSubmit}>
                      <Alert variant="warning">
                        Fai attenzione una volta inviata la tua prenotazione non
                        ne potrai effetuare un altra!
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
                          Data selezionata: {dateReservation.toDateString()}
                        </p>

                        <Form.Label>
                          Ora:
                          <Form.Control
                            required
                            type="time"
                            value={timeReservation}
                            onChange={(e) => setTimeReservation(e.target.value)}
                          />
                        </Form.Label>
                        <Form.Label className="">
                          Tatuatore
                          <Form.Select
                            required
                            className="mb-3"
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
                        <Button className="btn-primary" type="submit">
                          Prenota
                        </Button>
                      </Col>
                    </Form>
                  )}
                  {loggedUser.role === "TATTOOARTIST" && (
                    <Form
                      className="reservation-form"
                      onSubmit={handleTattooSessionSubmit}
                    >
                      <Alert variant="warning">
                        Bentornato {loggedUser?.username} , è il momento di una
                        nuova prenotazione
                      </Alert>
                      <Col>
                        <Calendar
                          onChange={handleDateChange}
                          value={dateReservation}
                        />
                      </Col>
                      <Col className="d-flex flex-column ">
                        <p className="mt-2 text-light">
                          Data selezionata: {dateReservation.toDateString()}
                        </p>

                        <Form.Label>
                          Ora:
                          <Form.Control
                            required
                            type="time"
                            value={timeReservation}
                            onChange={(e) => setTimeReservation(e.target.value)}
                          />
                        </Form.Label>
                        <Form.Label className="">
                          Utente
                          <Form.Control
                            required
                            type="text"
                            placeholder="username utente.."
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </Form.Label>
                        <Button className="btn-primary" type="submit">
                          Prenota
                        </Button>
                      </Col>
                    </Form>
                  )}
                </Row>
              </Container>
            )}
            <Container className="border-top mt-5">
              <Row>
                {reservations?.length > 0 ? (
                  <>
                    <h4 className="text-light my-4">Le tue prenotazioni</h4>
                    {reservations.map((reservation, i) => (
                      <Col key={i}>
                        <Card className="mb-4">
                          <Card.Header>
                            Tipo di Prenotazione: {reservation?.typeReservation}
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
                                    Artista: {reservation.tattoArtist?.username}
                                  </div>
                                  <div>
                                    <img
                                      className="reservation-img-card rounded-circle "
                                      src={reservation.tattoArtist?.avatarURL}
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
                                  <Button onClick={handleShow} variant="danger">
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
                                    <Modal.Body>
                                      Sicuro di voler eliminare la prenotazione:
                                      <span className="d-block">
                                        Di tipo: {reservation?.typeReservation},
                                      </span>
                                      <span>
                                        Con: {reservation.tattoArtist?.username}
                                        ,
                                      </span>
                                      <span className="d-block">
                                        in data: {reservation?.dateReservation}.
                                      </span>
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
                                  <Button onClick={handleShow} variant="danger">
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
                                    <Modal.Body>
                                      Sicuro di voler eliminare la prenotazione:
                                      <span className="d-block">
                                        Di tipo: {reservation?.typeReservation},
                                      </span>
                                      <span>
                                        Con: {reservation.user?.username},
                                      </span>
                                      <span className="d-block">
                                        in data: {reservation?.dateReservation}.
                                      </span>
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
                  <div>
                    <p>Non hai prenotazioni</p>
                  </div>
                )}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}
