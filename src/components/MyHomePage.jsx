import "../style/partials/_myHomePage.scss"
import { Button, Col, Container, Row } from "react-bootstrap"
import MyCarousel from "./MyCarousel"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const MyHomePage = () => {
  const isLogged = useSelector((state) => state.user.isLogged)
  return (
    <>
      <MyCarousel />
      <Container>
        <Row>
          <Col xs={12} className="text-center ">
            <h1 className="my-3">Greatest Tattoo Studio</h1>
            <section>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Temporibus, facere? A minima, nam illo accusamus doloremque
                  aliquid neque quo nostrum quaerat molestiae, impedit
                  accusantium deleniti? Atque enim excepturi quas minus!
                </p>
              </div>
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  doloribus temporibus commodi laboriosam maiores molestias
                  nobis non officia repudiandae veniam. Quisquam labore quidem
                  illum dolore totam molestiae ipsum reiciendis culpa.
                </p>
              </div>
              {isLogged ? (
                <div className="my-3">
                  <h3>Prendi subito appuntamento!</h3>
                  <Button className="btn-submit">Prenota</Button>
                </div>
              ) : (
                <div className="my-3">
                  <h3>Se vuoi prendere appuntamento prima accedi!</h3>
                  <Button className="btn-submit" as={Link} to="/login">
                    Login
                  </Button>
                </div>
              )}
            </section>
          </Col>
          <aside className="text-light my-3">
            <Col>
              <div>
                <h3>QUA UNA FETCH GENERLE SUI TATTOO</h3>
              </div>
            </Col>
          </aside>
        </Row>
      </Container>
    </>
  )
}
export default MyHomePage
