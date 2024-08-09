import "../style/partials/_myHomePage.scss"
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap"
import MyCarousel from "./MyCarousel"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { fetchTattoosAction } from "../redux/actions"
import TattooCard from "./TattooCard"

const MyHomePage = () => {
  const isLogged = useSelector((state) => state.user.isLogged)
  const tattoos = useSelector((state) => state.tattoo?.tattoos)
  const loadingTattoos = useSelector((state) => state.tattoo?.isLoading)
  const errorTattoos = useSelector((state) => state.error?.errorTattoo)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTattoosAction())
  }, [])
  return (
    <>
      <MyCarousel />
      <Container data-bs-theme="dark">
        <Row>
          <Col xs={12} className="text-center ">
            <h1 id="studio-headers" className="my-3">
              Greatest Tattoo Studio
            </h1>
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
                  <Button as={Link} to="/prenota" className="btn-submit">
                    Prenota
                  </Button>
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
            {loadingTattoos ? (
              <div className="text-center my-4">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <>
                {errorTattoos && (
                  <div>
                    <Alert variant="danger">
                      Ci scusiamo per il disagio ma qualcosa è andato storto
                    </Alert>
                  </div>
                )}
                {tattoos?.length > 0 ? (
                  <>
                    <h2 className="mb-4 text-center">
                      Questi sono solo alcuni dei lavori fatti dai nostri
                      Artisti
                    </h2>
                    <Row className="justify-content-center">
                      {tattoos.map((tattoo, i) => (
                        <Col
                          xs={8}
                          md={6}
                          lg={4}
                          xl={4}
                          key={i}
                          className="mb-3"
                        >
                          <TattooCard tattoo={tattoo} />
                        </Col>
                      ))}
                    </Row>
                  </>
                ) : (
                  <div>
                    <Alert className="text-light text-center" variant="warning">
                      Stiamo lavorando per voi!
                      <br />
                      Presto arriveranno le immagini dei nostri tatuaggi!
                    </Alert>
                  </div>
                )}
              </>
            )}
          </Container>
        </Row>
      </Container>
    </>
  )
}
export default MyHomePage
