import { useEffect, useState } from "react"
import { Button, Col, Container, Modal, Row, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchRegisterTattooArtistAction } from "../redux/actions"
import { Link } from "react-router-dom"

const MyMainProfile = () => {
  const isLogged = useSelector((state) => state.user.isLogged)
  const loggedUser = useSelector((state) => state.user.user_info)
  const token = useSelector((state) => state.user.user_bearer.accessToken)

  const [show, setShow] = useState(false)
  const [showModalEmail, setShowModalEmail] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [dateOfBirth, setDateOfBirth] = useState("")

  const dispatch = useDispatch()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleCloseModalEmail = () => setShowModalEmail(false)
  const handleShowModalEmail = () => setShowModalEmail(true)

  const handleRegisterSubmit = (e) => {
    e.preventDefault()

    const registerObj = {
      username: username,
      email: email,
      password: password,
      name: name,
      surname: surname,
      description: description,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
    }
    try {
      dispatch(fetchRegisterTattooArtistAction(token, registerObj))
      alert("Artista creato con successo")
      setEmail("")
      setPassword("")
      setName("")
      setDateOfBirth("")
      setDescription("")
      setSurname("")
      setUsername("")
      setPhoneNumber(null)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleUpdateUserInfo = (e) => {
    e.preventDefault()
  }
  useEffect(() => {}, [])
  return (
    <Container>
      <Row>
        <Col className=" p-4">
          {!isLogged ? (
            <Button as={Link} to="/login">
              vai al login
            </Button>
          ) : (
            <>
              <div className="d-flex align-items-center position-relative">
                <div className="me-3">
                  <img
                    className="rounded-circle"
                    src={loggedUser.avatarURL}
                    alt="sono io"
                  />
                </div>
                <div className="text-light">
                  <h2>{loggedUser.username}</h2>
                  {loggedUser.role === "ADMIN" && (
                    <Button
                      onClick={handleShow}
                      className="btn btn-primary position-absolute end-0"
                    >
                      inserisci nuovo Artista
                    </Button>
                  )}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Registarzione Nuovo Tatuatore</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleRegisterSubmit}>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupUserName"
                        >
                          <Form.Label>Scegli un Username</Form.Label>
                          <Form.Control
                            required
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Es. Goku"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Inserisci la tua Email</Form.Label>
                          <Form.Control
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Esempio@gmail.com"
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupPassword"
                        >
                          <Form.Label>Inserisci la tua Password</Form.Label>
                          <Form.Control
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupName">
                          <Form.Label>Inserisci il tuo nome</Form.Label>
                          <Form.Control
                            required
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Es. Mario"
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupSurname"
                        >
                          <Form.Label>Inserisci il tuo cognome</Form.Label>
                          <Form.Control
                            required
                            onChange={(e) => setSurname(e.target.value)}
                            type="text"
                            placeholder="Es. Rossi"
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupDescription"
                        >
                          <Form.Label>Inserisci una descrizione</Form.Label>
                          <Form.Control
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            as="textarea"
                            rows={3}
                            placeholder="Faccio questo lavoro perchè..."
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupPhoneNumber"
                        >
                          <Form.Label>
                            Inserisci il numero di telefono
                          </Form.Label>
                          <Form.Control
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            type="text"
                            placeholder="Es. 3341313131"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupAge">
                          <Form.Label>Anno di nascita</Form.Label>
                          <Form.Control
                            required
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            type="date"
                            placeholder="yyyy/mm/dd"
                          />
                        </Form.Group>
                        <Button
                          onClick={handleClose}
                          type="submit"
                          className="mb-2"
                        >
                          invia
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
              <Container
                className="my-5 border-top border-bottom text-light "
                data-bs-theme="dark"
              >
                <p className="my-4">Info personali</p>
                <p className="my-4">Aggiorna le tue info personali</p>
                <Form onSubmit={handleUpdateUserInfo}>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                          defaultValue={loggedUser.name}
                          type="text"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control
                          value={loggedUser.surname}
                          type="text"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          value={loggedUser.username}
                          type="text"
                          required
                        />
                      </Form.Group>
                    </Col>
                    {loggedUser.role === "TATTOOARTIST" && (
                      <>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Numero di telefono</Form.Label>
                            <Form.Control
                              defaultValue={loggedUser.phoneNumber}
                              type="text"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control
                              defaultValue={loggedUser.description}
                              as="textarea"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </>
                    )}
                    <Col>
                      <Button type="submit" className="my-4">
                        Invia Cambiamenti
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Container>
              <Container className="text-light">
                <p>Credenziali diaccesso</p>
                <p>Controlla e modifica le tue credenziali d'accesso</p>
                <Row>
                  <Col xs={12} className="my-2">
                    <p className="mb-0">Email di accesso:</p>
                    <p>{loggedUser.email}</p>
                    <Button onClick={handleShowModalEmail} className="mb-2">
                      Cambia email
                    </Button>
                    <Modal show={showModalEmail} onHide={handleCloseModalEmail}>
                      <Modal.Header closeButton>
                        <Modal.Title>Cambia la Tua Email!</Modal.Title>
                      </Modal.Header>
                    </Modal>
                  </Col>
                  <Col>
                    <p className="mb-0">Password di accesso:</p>
                    <p>● ● ● ● ● ●</p>
                    <Button>Cambia password</Button>
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </Col>
      </Row>
    </Container>
  )
}
export default MyMainProfile
