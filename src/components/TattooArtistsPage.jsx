import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTattooArtistsAction } from "../redux/actions"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import TattooArtistCard from "./TattooArtistCard"

const TattooArtistsPage = () => {
  const tattooArtistsArray = useSelector(
    (state) => state.tattooArtist?.tattooArtists
  )
  const loading = useSelector((state) => state.tattooArtist.loading)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTattooArtistsAction())
  }, [])

  if (loading) {
    return (
      <Container>
        <Row>
          <Col
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container fluid>
      <h1 className="text-center text-uppercase fw-bold mt-4 mb-4">
        Conosci la nostra crew!
      </h1>
      <div className="text-light text-center mb-4">
        <p>
          siamo orgogliosi di collaborare con un team di artisti eccezionali,
          ognuno con uno stile unico e una passione ineguagliabile per l’arte
          del tatuaggio. La nostra esperienza a tua disposizione per guidarti al
          meglio nella tua scelta.
        </p>
      </div>
      <Row className="justify-content-center">
        {tattooArtistsArray?.length > 0 ? (
          tattooArtistsArray.map((tattooArtist, i) => (
            <Col className="mb-3" xs={8} md={5} xl={4} xxl={3} key={i}>
              <TattooArtistCard
                key={tattooArtist?.id}
                tattooArtist={tattooArtist}
              />
            </Col>
          ))
        ) : (
          <h1>Sembra che al momento non ci siano tatuatori</h1>
        )}
      </Row>
    </Container>
  )
}
export default TattooArtistsPage
