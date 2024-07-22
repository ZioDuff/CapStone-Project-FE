import { useEffect, useState } from "react"
import { Button, Col, Container, Modal, Row, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchRegisterTattooArtistAction } from "../redux/actions"

const MyMainProfile = () => {
  const loggedUser = useSelector((state) => state.user.user_info)
  const token = useSelector((state) => state.user.user_bearer.accessToken)
  const [show, setShow] = useState(false)
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
  useEffect(() => {}, [])
  return (
    <Container>
      <Row>
        <Col className="d-flex bg-secondary p-4">
          <div className="me-5">
            <img src={loggedUser.avatarURL} alt="sono io" />
          </div>
          <div>
            <h2>{loggedUser.username}</h2>
            <p>{loggedUser.name}</p>
            <p>{loggedUser.surname}</p>
            <p>{loggedUser.email}</p>
            <p>{loggedUser.age}</p>
            {loggedUser.role === "ADMIN" && (
              <Button onClick={handleShow} className="btn btn-primary">
                inserisci nuovo Artista
              </Button>
            )}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Registarzione Nuovo Tatuatore</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleRegisterSubmit}>
                  <Form.Group className="mb-3" controlId="formGroupUserName">
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
                  <Form.Group className="mb-3" controlId="formGroupPassword">
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
                  <Form.Group className="mb-3" controlId="formGroupSurname">
                    <Form.Label>Inserisci il tuo cognome</Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => setSurname(e.target.value)}
                      type="text"
                      placeholder="Es. Rossi"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupDescription">
                    <Form.Label>Inserisci una descrizione</Form.Label>
                    <Form.Control
                      required
                      onChange={(e) => setDescription(e.target.value)}
                      as="textarea"
                      rows={3}
                      placeholder="Faccio questo lavoro perchè..."
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPhoneNumber">
                    <Form.Label>Inserisci il numero di telefono</Form.Label>
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
                  <Button onClick={handleClose} type="submit" className="mb-2">
                    invia
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default MyMainProfile
