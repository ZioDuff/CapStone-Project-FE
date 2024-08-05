import { Button, Container, Form, Spinner } from "react-bootstrap"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import "../style/partials/_loginpage.scss"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUserAction, registerUserAction } from "../redux/actions"
import { motion } from "framer-motion"
const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(false)
  const [isLogged, setIsLogged] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [surname, setsurname] = useState("")
  const [username, setUsername] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log("provando ad accedere")
    const loginObj = {
      email: email,
      password: password,
    }
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
    dispatch(registerUserAction(registerObj))
    setEmail("")
    setPassword("")
    setIsLogged(true)
  }

  useEffect(() => {
    console.log(isLogged ? "devo accedere" : "devo registrarmi")
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [isLogged])

  return (
    <Container data-bs-theme="dark" fluid className="login-container">
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
                className="mb-3 position-relative"
                controlId="formGroupPassword"
              >
                <Form.Label>Inserisci la tua Password</Form.Label>
                <Form.Control
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
              <Button type="submit" className="mb-2 btn-submit">
                Login
              </Button>
            </Form>
          ) : (
            <Form className="text-light" onSubmit={handleRegisterSubmit}>
              <h1 className="text-center mb-4">Registrati</h1>
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
              <Form.Group
                className="mb-3 postion-relative "
                controlId="formGroupPassword"
              >
                <Form.Label>Inserisci la tua Password</Form.Label>
                <Form.Control
                  className="position-relative"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  type={isVisible ? "text" : "password"}
                  placeholder="Password"
                />
                <span
                  onClick={() => setIsVisible(!isVisible)}
                  style={{ cursor: "pointer" }}
                  className="position-absolute mb-4   bottom-50 end-0 translate-middle-y me-4"
                >
                  {!isVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
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
                  onChange={(e) => setsurname(e.target.value)}
                  type="text"
                  placeholder="Es. Rossi"
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
              <Button type="submit" className="mb-2 btn-submit">
                Registati
              </Button>
            </Form>
          )}
          <div className="d-flex text-light ">
            <p onClick={() => setIsLogged(!isLogged)}>
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
