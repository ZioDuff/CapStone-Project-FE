import "../style/partials/_myNavbar.scss"
import { useEffect } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserInfoAction } from "../redux/actions"
import { Link } from "react-router-dom"
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
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto align-items-center">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {!isLogged ? (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/profilePage">
                  <img className="profile-image" src={loggedUser.avatarURL} />
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/tatuatori">
                Tatuatori
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default MyNavbar
