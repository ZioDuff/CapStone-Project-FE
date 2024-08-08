import "../style/partials/_myNavbar.scss"
import "../style/App.scss"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserInfoAction, logOutAction } from "../redux/actions"
import { Link, useNavigate } from "react-router-dom"
import logoStudio from "../assets/4iff4587-removebg-preview.png"
import { ButtonGroup, Navbar, Nav, Container, Dropdown } from "react-bootstrap"

const MyNavbar = () => {
  const token = useSelector((state) => state.user.user_bearer?.accessToken)
  const isLogged = useSelector((state) => state.user.isLogged)
  const loggedUser = useSelector((state) => state.user.user_info)
  const isAdmin = useSelector((state) => state.user?.isAdmin)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = () => {
    dispatch(logOutAction())
    navigate("/")
  }

  useEffect(() => {
    if (token) {
      dispatch(fetchUserInfoAction(token))
    }
  }, [dispatch, token])
  return (
    <>
      <Navbar
        className="border-1 border-bottom border-primary"
        expand="lg"
        data-bs-theme="dark"
      >
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
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/tatuatori">
                Crew
              </Nav.Link>

              {isAdmin ? (
                <Nav.Link as={Link} to="/prenota">
                  Prenotazioni
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/prenota">
                  Prenota
                </Nav.Link>
              )}
              {!isLogged ? (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <div className="d-flex align-items-center">
                  <Nav.Link as={Link} to="/profilePage">
                    <img
                      className="profile-image me-2"
                      src={loggedUser?.avatarURL}
                    />
                  </Nav.Link>
                  <Dropdown as={ButtonGroup}>
                    <Nav.Link
                      as={Link}
                      to="/profilePage"
                      className="bg-transparent border-0"
                    >
                      {loggedUser?.username}
                    </Nav.Link>

                    <Dropdown.Toggle
                      split
                      className="bg-transparent border-0"
                      id="dropdown-split-basic"
                    />

                    <Dropdown.Menu className="position-absolute">
                      <Dropdown.Item as={Link} to="/profilePage">
                        Impostazioni
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogOut}>
                        Log out
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default MyNavbar
