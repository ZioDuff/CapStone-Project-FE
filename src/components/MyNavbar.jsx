import { useEffect } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserInfoAction } from "../redux/actions"
const MyNavbar = () => {
  const token = useSelector((state) => state.user.user_bearer.accessToken)
  const isLogged = useSelector((state) => state.user.isLogged)
  const loggedUser = useSelector((state) => state.user.user_info)
  const dispatch = useDispatch()
  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfoAction(token))
    }
  }, [dispatch, token])
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {!isLogged ? (
                <Nav.Link href="/login">Login</Nav.Link>
              ) : (
                <img src={loggedUser.avatarURL} />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default MyNavbar
