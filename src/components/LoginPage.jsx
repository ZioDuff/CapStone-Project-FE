import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import "../style/partials/_loginpage.scss"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  loginUserAction,
  registerUserAction,
  RUN_LOADING,
} from "../redux/actions"
import { motion } from "framer-motion"
const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const errorMessageLogin = useSelector((state) => state.error?.errorLogin)
  const errorMessageRegister = useSelector(
    (state) => state.error?.errorRegistration
  )
  const isLoading = useSelector((state) => state.user?.isLoading)
  const [isVisible, setIsVisible] = useState(false)
  const [isLogged, setIsLogged] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [surname, setsurname] = useState("")
  const [username, setUsername] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log("provando ad accedere")
    const loginObj = {
      email: email,
      password: password,
    }
    dispatch({ type: RUN_LOADING })
    dispatch(loginUserAction(loginObj, navigate))
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    console.log("provando a registrarmi")
    const registerObj = {
      username: username,
      email: email,
      password: password,
      name: name,
      surname: surname,
      dateOfBirth: dateOfBirth,
    }
    dispatch({ type: RUN_LOADING })
    dispatch(registerUserAction(registerObj))
    setUsername("")
    setEmail("")
    setPassword("")
    setName("")
    setsurname("")
    setDateOfBirth("")
    setIsLogged(true)
  }

  const resetFormFields = () => {
    setEmail("")
    setPassword("")
  }

  const toggleForm = () => {
    setIsLogged(!isLogged)
    resetFormFields()
  }

  useEffect(() => {}, [isLogged])

  return (
    <Container data-bs-theme="dark" fluid className="login-container ">
      {!isLoading ? (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="p-3 my-5 d-flex flex-column form-container"
        >
          {isLogged ? (
            <Form className="text-light" onSubmit={handleLoginSubmit}>
              <h1 className="text-center mb-4">Login</h1>
              <Col>
                <Form.Group className="mb-1" controlId="formGroupEmail">
                  <Form.Label>Inserisci la tua Email</Form.Label>
                  <Form.Control
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Esempio@gmail.com"
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group
                  className="mb-1 position-relative"
                  controlId="formGroupPassword"
                >
                  <Form.Label>Inserisci la tua Password</Form.Label>
                  <Form.Control
                    value={password}
                    className="position-relative"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    type={isVisible ? "text" : "password"}
                    placeholder="Password"
                  />

                  <span
                    onClick={() => setIsVisible(!isVisible)}
                    style={{ cursor: "pointer" }}
                    className="position-absolute mt-3  top-50 end-0 translate-middle-y me-3"
                  >
                    {!isVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </Form.Group>
              </Col>

              {errorMessageLogin && (
                <Alert variant="danger">{errorMessageLogin}</Alert>
              )}
              <Button type="submit" className="my-2 w-100 btn-submit">
                Login
              </Button>
            </Form>
          ) : (
            <Form className="text-light " onSubmit={handleRegisterSubmit}>
              <h1 className="text-center mb-4">Registrati</h1>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formGroupUserName">
                    <Form.Label>Scegli un Username</Form.Label>
                    <Form.Control
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Es. Goku"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Inserisci la tua Email</Form.Label>
                    <Form.Control
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Esempio@gmail.com"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group
                    className="mb-3 position-relative"
                    controlId="formGroupPassword"
                  >
                    <Form.Label>Inserisci la tua Password</Form.Label>
                    <Form.Control
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      type={isVisible ? "text" : "password"}
                      placeholder="Password"
                    />
                    <span
                      onClick={() => setIsVisible(!isVisible)}
                      style={{ cursor: "pointer" }}
                      className="position-absolute end-0 top-50 mt-1 translate-middle-x "
                    >
                      {!isVisible ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Inserisci il tuo nome</Form.Label>
                    <Form.Control
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Es. Mario"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formGroupSurname">
                    <Form.Label>Inserisci il tuo cognome</Form.Label>
                    <Form.Control
                      value={surname}
                      required
                      onChange={(e) => setsurname(e.target.value)}
                      type="text"
                      placeholder="Es. Rossi"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formGroupAge">
                    <Form.Label>Anno di nascita</Form.Label>
                    <Form.Control
                      value={dateOfBirth}
                      required
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      type="date"
                      placeholder="yyyy/mm/dd"
                    />
                  </Form.Group>
                </Col>
                {errorMessageRegister && (
                  <Alert variant="danger">{errorMessageRegister}</Alert>
                )}
                <Button type="submit" className="my-2 btn-submit">
                  Registati
                </Button>
              </Row>
            </Form>
          )}
          <div className="d-flex text-light ">
            <p onClick={toggleForm}>
              {isLogged ? (
                <>
                  <span className="me-2">Non sei registrato?</span>
                  <a href="#">Registati</a>
                </>
              ) : (
                <>
                  <span className="me-2">Sei gia registrato?</span>
                  <a href="#">Login</a>
                </>
              )}
            </p>
          </div>
        </motion.div>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  )
}
export default LoginPage
