import "../style/partials/_myMainProfile.scss"
import { useEffect, useRef, useState } from "react"
import { Button, Col, Container, Modal, Row, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchDeleteOwnAccountAction,
  fetchRegisterTattooArtistAction,
  fetchUploadAvatarAction,
  fetchUploadTattooAction,
} from "../redux/actions"
import { Link, useNavigate } from "react-router-dom"

const MyMainProfile = () => {
  const isLogged = useSelector((state) => state.user.isLogged)
  const loggedUser = useSelector((state) => state.user.user_info)
  const token = useSelector((state) => state.user.user_bearer.accessToken)

  const [show, setShow] = useState(false)
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)

  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false)
  const [isPasswordFormVisible, setIsPasswordFormVisible] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [username, setUsername] = useState("")
  const [description, setDescription] = useState("")
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [dateOfBirth, setDateOfBirth] = useState("")

  const [tattooName, setTattooName] = useState("")
  const [tattooDescription, setTattooDescription] = useState("")
  const [tattooFile, setTattooFile] = useState(null)

  const fileInput = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleCloseDeleteModal = () => setShowDeleteAccountModal(false)
  const handleShowDeleteModal = () => setShowDeleteAccountModal(true)

  const handleTattooFormSubmit = (e) => {
    e.preventDefault()
    if (token) {
      const formData = new FormData()
      formData.append("newTattoo", tattooFile)
      formData.append(
        "payload",
        JSON.stringify({ name: tattooName, description: tattooDescription })
      )
      dispatch(fetchUploadTattooAction(token, formData)).then(() => {
        alert("Tatuaggio inserito con successo")
        setTattooFile(null)
        setTattooName("")
        setTattooDescription("")
      })
    }
  }

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

  const deleteAccount = () => {
    if (loggedUser.id) {
      dispatch(fetchDeleteOwnAccountAction(token, navigate))
    }
  }

  const handleUpdateUserInfo = (e) => {
    e.preventDefault()
  }

  const hanldeImageClick = () => {
    fileInput.current.click()
  }

  const handleFileChange = (e) => {
    if (token) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("avatar", file)
      dispatch(fetchUploadAvatarAction(token, formData))
      console.log(file)
    }
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
                    className="profile-avatar"
                    src={loggedUser.avatarURL}
                    onClick={hanldeImageClick}
                    alt="sono io"
                  />
                  <Form.Control
                    ref={fileInput}
                    className="d-none"
                    type="file"
                    onChange={handleFileChange}
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
              {loggedUser.role === "TATTOOARTIST" && (
                <Container
                  data-bs-theme="dark"
                  className="my-5 border-top border-bottom text-light py-4  "
                >
                  <p className="text-decoration-underline">
                    Aggiungi un nuovo tatuaggio
                  </p>
                  <Form
                    onSubmit={handleTattooFormSubmit}
                    data-bs-theme="dark"
                    className="mt-2"
                  >
                    <Form.Group>
                      <Form.Label>Nome del tatuaggio</Form.Label>
                      <Form.Control
                        onChange={(e) => setTattooName(e.target.value)}
                        type="text"
                        placeholder="Es. dragone supremo"
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Descrizione del tatuaggio</Form.Label>
                      <Form.Control
                        onChange={(e) => setTattooDescription(e.target.value)}
                        type="text"
                        placeholder="Es. Ho svolto questo lavoro usando ecc..."
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>URL del Tattoo</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={(e) => setTattooFile(e.target.files[0])}
                      />
                    </Form.Group>
                    <Button type="submit" className="my-4">
                      invia
                    </Button>
                  </Form>
                </Container>
              )}
              <Container
                data-bs-theme="dark"
                className="text-light border-top  mt-4"
              >
                <Button className="p-0 my-4 bg-transparent border-0 text-decoration-underline ">
                  Controlla e modfica le tue info personali
                </Button>

                <Form
                  className="border-bottom mb-4 pb-4"
                  onSubmit={handleUpdateUserInfo}
                >
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                          defaultValue={loggedUser.name}
                          onChange={(e) => setName(e.target.value)}
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
                    <Col xs={12}>
                      <Button type="submit" className="my-4 ">
                        Invia Cambiamenti
                      </Button>
                    </Col>
                  </Row>
                </Form>

                <p>Modifica le tue credenziali d'accesso</p>
                <Row>
                  <Col xs={12} className="my-2">
                    <p className="mb-0">Email di accesso:</p>
                    <p className="mb-0">{loggedUser.email}</p>
                    {!isEmailFormVisible ? (
                      <Button
                        onClick={() =>
                          setIsEmailFormVisible(!isEmailFormVisible)
                        }
                        className="mb-2 bg-transparent border-0 p-0 text-decoration-underline"
                        Cambia
                        email
                      >
                        Cambia la tua email
                      </Button>
                    ) : (
                      <Form data-bs-theme="dark" className="mt-2">
                        <Form.Group className="position-relative">
                          <Form.Control defaultValue={loggedUser.email} />
                          <span
                            onClick={() => setIsEmailFormVisible(false)}
                            className="position-absolute end-0 top-50 translate-middle"
                          >
                            ✖️
                          </span>
                        </Form.Group>
                        <Button className="mt-2">invia</Button>
                      </Form>
                    )}
                  </Col>
                  <Col xs={12}>
                    <p className="mb-0">Password di accesso:</p>
                    <p className="mb-0">● ● ● ● ● ●</p>
                    {!isPasswordFormVisible ? (
                      <Button
                        onClick={() =>
                          setIsPasswordFormVisible(!isPasswordFormVisible)
                        }
                        className="mb-2 bg-transparent border-0 p-0 text-decoration-underline"
                        Cambia
                        email
                      >
                        Cambia la tua password
                      </Button>
                    ) : (
                      <Form data-bs-theme="dark" className="mt-2">
                        <Form.Group className="position-relative">
                          <Form.Control defaultValue={loggedUser.password} />
                          <span
                            onClick={() => setIsPasswordFormVisible(false)}
                            className="position-absolute end-0 top-50 translate-middle"
                          >
                            ✖️
                          </span>
                        </Form.Group>
                        <Button className="mt-2">invia</Button>
                      </Form>
                    )}
                  </Col>
                  <Col xs={12}>
                    <Button
                      onClick={handleShowDeleteModal}
                      className="btn-danger mt-4"
                    >
                      Elimina account
                    </Button>
                    <Modal
                      show={showDeleteAccountModal}
                      onHide={handleCloseDeleteModal}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Eliminazione Account</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Attenzione premendo Elimina perderai l'account!
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="danger" onClick={deleteAccount}>
                          Elimina
                        </Button>
                      </Modal.Footer>
                    </Modal>
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
