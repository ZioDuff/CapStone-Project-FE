import { useEffect, useState } from "react"
import "../style/App.scss"
import "react-calendar/dist/Calendar.css"
import "../style/partials/_reservationForm.scss"
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap"
import Calendar from "react-calendar"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  fetchSaveReservationAction,
  fetchSaveTattooSessionReservationAction,
  fetchTattooArtistsAction,
} from "../redux/actions"
export const ReservationPage = () => {
  const loggedUser = useSelector((state) => state.user.user_info)
  const reservations = useSelector(
    (state) => state.user?.user_info?.reservations
  )
  const isLogged = useSelector((state) => state.user.isLogged)
  const tattooArtistsArray = useSelector(
    (state) => state.tattooArtist?.tattooArtists
  )
  const token = useSelector((state) => state.user.user_bearer?.accessToken)
  const dispatch = useDispatch()

  const [dateReservation, setDateReservation] = useState(new Date())
  const [timeReservation, setTimeReservation] = useState("")
  const [tattooArtistUsername, setTattooArtistusername] = useState("")
  const [username, setUsername] = useState("")

  const handleDateChange = (newDate) => {
    setDateReservation(newDate)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formattedDate = dateReservation.toISOString().split("T")[0]
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

    const formattedDate = dateReservation.toISOString().split("T")[0]
    const formattedTime = timeReservation + ":00"

    const tattooSessionReservationObj = {
      dateReservation: formattedDate,
      timeReservation: formattedTime,
      username: username,
    }
    dispatch(
      fetchSaveTattooSessionReservationAction(
        token,
        tattooSessionReservationObj
      )
    )
  }

  useEffect(() => {
    dispatch(fetchTattooArtistsAction())
  }, [dispatch])
  return (
    <>
      <Container data-bs-theme="dark" className="text-center">
        <Row>
          <Col>
            {loggedUser.role === "USER" && (
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
            {loggedUser.role === "TATTOOARTIST" && (
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
                  {loggedUser.role === "USER" && (
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
                      <Col className="d-flex flex-column ">
                        <p className="mt-2 text-light">
                          Data selezionata: {dateReservation.toDateString()}
                        </p>

                        <Form.Label>
                          Ora:
                          <Form.Control
                            type="time"
                            value={timeReservation}
                            onChange={(e) => setTimeReservation(e.target.value)}
                          />
                        </Form.Label>
                        <Form.Label className="">
                          Tatuatore
                          <Form.Select
                            className="mb-3"
                            onChange={(e) =>
                              setTattooArtistusername(e.target.value)
                            }
                          >
                            <option>artista</option>
                            {tattooArtistsArray.length > 0 ? (
                              tattooArtistsArray.map((tattooArtist, i) => {
                                return (
                                  <option key={i}>
                                    {tattooArtist.username}
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
                        Bentornato {loggedUser.username} , è il momento di una
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
                            type="time"
                            value={timeReservation}
                            onChange={(e) => setTimeReservation(e.target.value)}
                          />
                        </Form.Label>
                        <Form.Label className="">
                          Utente
                          <Form.Control
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
                  <Col>
                    <h4 className="text-light">Le tue prenotazioni</h4>
                    <Table className="mt-4" striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Giorno</th>
                          <th>Ora</th>
                          <th>Tipologia</th>
                          {loggedUser.role === "USER" && <th>Artista</th>}
                          {loggedUser.role === "TATTOOARTIST" && (
                            <th>Utente</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {reservations.map((reservation, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{reservation.dateReservation}</td>
                            <td>{reservation.timeReservation}</td>
                            <td>{reservation.typeReservation}</td>
                            {loggedUser.role === "USER" && (
                              <td>{reservation?.tattoArtist.username}</td>
                            )}
                            {loggedUser.role === "TATTOOARTIST" && (
                              <td>{reservation?.user.username}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                ) : (
                  <>
                    <p>Non hai prenotazioni</p>
                  </>
                )}
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}
