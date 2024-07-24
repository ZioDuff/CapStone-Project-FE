import "../style/partials/_myNavbar.scss"
import "../style/App.scss"
import { useEffect } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserInfoAction } from "../redux/actions"
import { Link } from "react-router-dom"
import logoStudio from "../assets/draw_svg20240619-7-124scw8.svg-removebg.png"
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
      <Navbar expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              style={{ width: "110px" }}
              src={logoStudio}
              alt="logoStudio-home"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 justify-content-evenly align-items-center">
              <Nav.Link as={Link} to="/tatuatori">
                Crew
              </Nav.Link>
              <Nav.Link>Tattoos</Nav.Link>

              <Nav.Link>Contact Us</Nav.Link>
              {!isLogged ? (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/profilePage"
                  className="d-flex align-items-center"
                >
                  <img
                    className="profile-image me-2"
                    src={loggedUser.avatarURL}
                  />
                  <span>{loggedUser.username}</span>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default MyNavbar
