import { Button, Container, Form } from "react-bootstrap"
import "./LoginPage.scss"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUserAction } from "../../redux/actions"
const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLogged, setIsLogged] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    console.log("provando ad accedere")
    const loginObj = {
      email: email,
      password: password,
    }
    dispatch(loginUserAction(loginObj, navigate))
  }

  useEffect(() => {
    console.log("Devo registrarmi")
  }, [isLogged])

  return (
    <Container fluid className="login-container ">
      <div className="p-3 my-5 d-flex flex-column form-container">
        {isLogged ? (
          <Form onSubmit={handleLoginSubmit}>
            <h1 className="text-center mb-4">Login</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Inserisci la tua Email</Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Esempio@gmail.com"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Inserisci la tua Password</Form.Label>
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button type="submit" className="mb-2">
              Login
            </Button>
          </Form>
        ) : (
          <Form>
            <h1 className="text-center mb-4">Registrati</h1>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Scegli un Username</Form.Label>
              <Form.Control type="text" placeholder="Es. Goku" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Inserisci la tua Email</Form.Label>
              <Form.Control type="email" placeholder="Esempio@gmail.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Inserisci la tua Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Inserisci il tuo nome</Form.Label>
              <Form.Control type="text" placeholder="Es. Mario" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Inserisci il tuo cognome</Form.Label>
              <Form.Control type="text" placeholder="Es. Rossi" />
            </Form.Group>
            <Button className="mb-2">Registati</Button>
          </Form>
        )}
        <div className="d-flex ">
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
      </div>
    </Container>
  )
}
export default LoginPage
