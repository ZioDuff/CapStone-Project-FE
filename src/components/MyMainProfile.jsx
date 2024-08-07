import "../style/partials/_myMainProfile.scss"
import { useEffect, useRef, useState } from "react"
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  FETCH_TATTOO_ARTISTS_REQUEST,
  fetchDeleteOwnAccountAction,
  fetchRegisterTattooArtistAction,
  fetchUpdateUserEmail,
  fetchUpdateUserInfo,
  fetchUpdateUserPassword,
  fetchUploadAvatarAction,
  fetchUploadTattooAction,
  RUN_LOADING,
} from "../redux/actions"
import { Link, useNavigate } from "react-router-dom"
import { FaCamera, FaEye, FaEyeSlash, FaPlus } from "react-icons/fa"
const MyMainProfile = () => {
  const errorMessageRegister = useSelector(
    (state) => state.error?.errorRegistration
  )
  const isLogged = useSelector((state) => state.user?.isLogged)
  const loggedUser = useSelector((state) => state.user?.user_info)
  const token = useSelector((state) => state.user.user_bearer?.accessToken)
  const isLoading = useSelector((state) => state.user?.isLoading)
  const [show, setShow] = useState(false)
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false)
  const [isPasswordFormVisible, setIsPasswordFormVisible] = useState(false)

  const [updateForm, setUpdateForm] = useState({
    name: loggedUser?.name || "",
    surname: loggedUser?.surname || "",
    username: loggedUser?.username || "",
    description: loggedUser?.description || "",
    phoneNumber: loggedUser?.phoneNumber || "",
  })

  const [updateEmail, setUpdateEmail] = useState({
    email: "",
  })

  const [updatePassword, setUpdatePassword] = useState({
    password: "",
  })

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
      dispatch({ type: FETCH_TATTOO_ARTISTS_REQUEST })
      dispatch(fetchRegisterTattooArtistAction(token, registerObj, handleClose))
      setEmail("")
      setPassword("")
      setName("")
      setDateOfBirth("")
      setDescription("")
      setSurname("")
      setUsername("")
      setPhoneNumber(null)
    } catch (err) {
      errorMessageRegister
    }
  }

  const deleteAccount = () => {
    if (loggedUser.id) {
      dispatch(fetchDeleteOwnAccountAction(token, navigate))
    }
  }

  const handleUpdateUserInfo = (e) => {
    e.preventDefault()
    dispatch({ type: RUN_LOADING })
    dispatch(fetchUpdateUserInfo(token, updateForm))
  }

  const handleUpdateUserEmail = (e) => {
    e.preventDefault()
    dispatch({ type: RUN_LOADING })
    dispatch(fetchUpdateUserEmail(token, updateEmail)).then(() => {
      navigate("/login")
    })
  }

  const handleUpdateUserPassword = (e) => {
    e.preventDefault()
    dispatch({ type: RUN_LOADING })
    dispatch(fetchUpdateUserPassword(token, updatePassword)).then(() => {
      navigate("/login")
    })
  }

  const hanldeImageClick = () => {
    fileInput.current.click()
  }

  const handleFileChange = (e) => {
    if (token) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("avatar", file)
      dispatch({ type: RUN_LOADING })
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
            <Container>
              <Row>
                <Col className="text-center">
                  <Alert variant="danger">
                    Ops...Sembra che tu ancora non abbia fatto accesso alla
                    nostra piattaforma!
                  </Alert>
                  <Button as={Link} to="/login">
                    vai al login
                  </Button>
                </Col>
              </Row>
            </Container>
          ) : (
            <>
              <div className="d-flex align-items-center position-relative">
                <div className="me-3">
                  <div
                    onClick={hanldeImageClick}
                    className="position-relative image-container"
                  >
                    <img
                      style={{ cursor: "pointer" }}
                      className="profile-avatar"
                      src={loggedUser.avatarURL}
                      alt="sono io"
                    />
                    {isLoading ? (
                      <Spinner
                        className="overlay-spinner"
                        animation="border"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    ) : (
                      <div className="overlay">
                        <FaCamera className="camera-icon" />
                      </div>
                    )}
                  </div>
                  <Form.Control
                    ref={fileInput}
                    className="d-none"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="text-light">
                  <h2
                    style={{ textTransform: "uppercase" }}
                    className="fs-1 fw-semibold"
                  >
                    {loggedUser.username}
                  </h2>
                  {loggedUser.role === "ADMIN" && (
                    <Button
                      onClick={handleShow}
                      className="d-flex align-items-center btn btn-primary position-absolute end-0"
                    >
                      <span className="me-1">Nuovo Artista</span>
                      <span>
                        <FaPlus />
                      </span>
                    </Button>
                  )}
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Registarzione Nuovo Tatuatore</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {isLoading ? (
                        <div
                          style={{
                            minHeight: "400px",
                          }}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <Spinner
                            className="text-primary "
                            animation="border"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </div>
                      ) : (
                        <Form onSubmit={handleRegisterSubmit}>
                          <Row>
                            <Col xs={12} md={6}>
                              <Form.Group
                                className="mb-3"
                                controlId="formGroupUserName"
                              >
                                <Form.Label className="label-new-artist">
                                  Inserisci Username
                                </Form.Label>
                                <Form.Control
                                  className="text-light"
                                  required
                                  onChange={(e) => setUsername(e.target.value)}
                                  type="text"
                                  placeholder="Es. Goku"
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                              <Form.Group
                                className="mb-3"
                                controlId="formGroupEmail"
                              >
                                <Form.Label className="label-new-artist">
                                  Inserisci Email
                                </Form.Label>
                                <Form.Control
                                  className="text-light"
                                  required
                                  onChange={(e) => setEmail(e.target.value)}
                                  type="email"
                                  placeholder="Esempio@gmail.com"
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                              <Form.Group
                                className="mb-3 position-relative"
                                controlId="formGroupPassword"
                              >
                                <Form.Label className="label-new-artist">
                                  Inserisci Password
                                </Form.Label>
                                <Form.Control
                                  className=" text-light"
                                  required
                                  onChange={(e) => setPassword(e.target.value)}
                                  type={isVisible ? "text" : "password"}
                                  placeholder="Password"
                                />
                                <span
                                  onClick={() => setIsVisible(!isVisible)}
                                  style={{ cursor: "pointer" }}
                                  className="position-absolute mt-3 text-light  top-50 end-0 translate-middle-y me-3"
                                >
                                  {!isVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                              </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                              <Form.Group
                                className="mb-3"
                                controlId="formGroupName"
                              >
                                <Form.Label className="label-new-artist">
                                  Inserisci nome
                                </Form.Label>
                                <Form.Control
                                  className="text-light"
                                  required
                                  onChange={(e) => setName(e.target.value)}
                                  type="text"
                                  placeholder="Es. Mario"
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                              <Form.Group
                                className="mb-3"
                                controlId="formGroupSurname"
                              >
                                <Form.Label className="label-new-artist">
                                  Inserisci cognome
                                </Form.Label>
                                <Form.Control
                                  className="text-light"
                                  required
                                  onChange={(e) => setSurname(e.target.value)}
                                  type="text"
                                  placeholder="Es. Rossi"
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                              <Form.Group
                                className="mb-3"
                                controlId="formGroupPhoneNumber"
                              >
                                <Form.Label className="label-new-artist">
                                  Inserisci numero di telefono
                                </Form.Label>
                                <Form.Control
                                  className="text-light"
                                  required
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                  type="text"
                                  placeholder="Es. 3341313131"
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={12}>
                              <Form.Group
                                className="mb-3 position-relative"
                                controlId="formGroupAge"
                              >
                                <Form.Label className="label-new-artist">
                                  Inserisci data di nascita
                                </Form.Label>
                                <Form.Control
                                  className="text-light"
                                  required
                                  onChange={(e) =>
                                    setDateOfBirth(e.target.value)
                                  }
                                  type="date"
                                  placeholder="yyyy/mm/dd"
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="formGroupDescription"
                              >
                                <Form.Label className="label-new-artist">
                                  Inserisci descrizione
                                </Form.Label>
                                <Form.Control
                                  className="text-light"
                                  required
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  as="textarea"
                                  rows={3}
                                  placeholder="Faccio questo lavoro perchè..."
                                />
                              </Form.Group>
                              {errorMessageRegister && (
                                <Col>
                                  <Alert variant="danger">
                                    {errorMessageRegister}
                                  </Alert>
                                </Col>
                              )}
                            </Col>
                            <Col>
                              <Button type="submit" className="mb-2 w-100">
                                Invia
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      )}
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
                <p className=" my-4  text-decoration-underline ">
                  Controlla e modfica le tue info personali
                </p>

                <Form
                  className="border-bottom mb-4 pb-4"
                  onSubmit={handleUpdateUserInfo}
                >
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="mb-0">Nome</Form.Label>
                        <Form.Control
                          className="mb-2"
                          value={updateForm?.name}
                          onChange={(e) =>
                            setUpdateForm({
                              ...updateForm,
                              name: e.target.value,
                            })
                          }
                          type="text"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="mb-0">Cognome</Form.Label>
                        <Form.Control
                          className="mb-2"
                          value={updateForm?.surname}
                          onChange={(e) =>
                            setUpdateForm({
                              ...updateForm,
                              surname: e.target.value,
                            })
                          }
                          type="text"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label className="mb-0">Username</Form.Label>
                        <Form.Control
                          className="mb-2"
                          value={updateForm?.username}
                          onChange={(e) =>
                            setUpdateForm({
                              ...updateForm,
                              username: e.target.value,
                            })
                          }
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
                              value={updateForm?.phoneNumber}
                              onChange={(e) =>
                                setUpdateForm({
                                  ...updateForm,
                                  phoneNumber: e.target.value,
                                })
                              }
                              type="text"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control
                              value={updateForm?.description}
                              onChange={(e) =>
                                setUpdateForm({
                                  ...updateForm,
                                  description: e.target.value,
                                })
                              }
                              as="textarea"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </>
                    )}
                    <Col xs={12}>
                      <Button
                        style={{
                          minWidth: "150px",
                        }}
                        type="submit"
                        className="my-4 "
                      >
                        {!isLoading ? (
                          <span>Invia Cambiamenti</span>
                        ) : (
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>

                <p>Modifica le tue credenziali d'accesso</p>
                <Row>
                  <Col xs={12} className="my-2">
                    <p className="mb-0">Email di accesso:</p>
                    <p className="mb-0">{loggedUser?.email}</p>
                    {!isEmailFormVisible ? (
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setIsEmailFormVisible(!isEmailFormVisible)
                        }
                        className="mb-2  text-decoration-underline"
                      >
                        Cambia la tua email
                      </p>
                    ) : (
                      <Form
                        onSubmit={handleUpdateUserEmail}
                        data-bs-theme="dark"
                        className="mt-2"
                      >
                        <Form.Group className="position-relative mb-4">
                          <Form.Control
                            required
                            type="email"
                            value={updateEmail?.email}
                            onChange={(e) =>
                              setUpdateEmail({
                                ...updateEmail,
                                email: e.target.value,
                              })
                            }
                          />
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsEmailFormVisible(false)}
                            className="position-absolute end-0 top-50 translate-middle"
                          >
                            ✖️
                          </span>
                        </Form.Group>
                        <Button type="submit" className="my-2">
                          {!isLoading ? (
                            <span>Invia</span>
                          ) : (
                            <Spinner animation="border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </Spinner>
                          )}
                        </Button>
                      </Form>
                    )}
                  </Col>
                  <Col xs={12}>
                    <p className="mb-0">Password di accesso:</p>
                    <p className="mb-0">● ● ● ● ● ●</p>
                    {!isPasswordFormVisible ? (
                      <p
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          setIsPasswordFormVisible(!isPasswordFormVisible)
                        }
                        className="mb-2  text-decoration-underline"
                      >
                        Cambia la tua password
                      </p>
                    ) : (
                      <Form
                        onSubmit={handleUpdateUserPassword}
                        data-bs-theme="dark"
                        className="mt-2"
                      >
                        <Form.Group className="position-relative  mb-4">
                          <Form.Control
                            required
                            value={updatePassword?.password}
                            onChange={(e) =>
                              setUpdatePassword({
                                ...updatePassword,
                                password: e.target.value,
                              })
                            }
                          />
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => setIsPasswordFormVisible(false)}
                            className="position-absolute end-0 top-50 translate-middle"
                          >
                            ✖️
                          </span>
                        </Form.Group>
                        <Button type="submit" className="my-2">
                          {!isLoading ? (
                            <span>Invia</span>
                          ) : (
                            <Spinner animation="border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </Spinner>
                          )}
                        </Button>
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
                        <Alert variant="danger">
                          Attenzione premendo Elimina perderai l'account!
                        </Alert>
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
