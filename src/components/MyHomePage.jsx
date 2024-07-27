import "../style/partials/_myHomePage.scss"
import { Button, Col, Container, Row } from "react-bootstrap"
import MyCarousel from "./MyCarousel"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { fetchTattoosAction } from "../redux/actions"

const MyHomePage = () => {
  const isLogged = useSelector((state) => state.user.isLogged)
  const tattoos = useSelector((state) => state.tattoo?.tattoos)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTattoosAction())
  }, [])
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
          <Container className="text-light my-3">
            {tattoos?.length > 0 ? (
              <>
                <h2>
                  Questi sono solo alcuni dei lavori fatti dai nostri Artisti
                </h2>
                <Row>
                  {tattoos.map((tattoo, i) => (
                    <Col xs={12} md={6} lg={4} xl={3} key={i} className="mb-3">
                      <img
                        className="w-100"
                        src={tattoo.tattoURL}
                        alt={tattoo.name}
                      />
                    </Col>
                  ))}
                </Row>
              </>
            ) : (
              <h2>Non sono presenti ancora i lavori dei nostri artisti</h2>
            )}
          </Container>
        </Row>
      </Container>
    </>
  )
}
export default MyHomePage
