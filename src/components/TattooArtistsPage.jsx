import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTattooArtistsAction } from "../redux/actions"
import { Col, Container, Row, Spinner } from "react-bootstrap"
import TattooArtistCard from "./TattooArtistCard"

const TattooArtistsPage = () => {
  const tattooArtistsArray = useSelector(
    (state) => state.tattooArtist.tattooArtists
  )
  const loading = useSelector((state) => state.tattooArtist.loading)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTattooArtistsAction())

    console.log(tattooArtistsArray)
  }, [])

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <Container fluid className="bg-secondary">
      <h1 className="text-center">Conosci la nostra crew!</h1>
      <Row>
        <Col>
          {tattooArtistsArray.length > 0 ? (
            tattooArtistsArray.map((tattooArtist) => (
              <TattooArtistCard
                key={tattooArtist.id}
                tattooArtist={tattooArtist}
              />
            ))
          ) : (
            <h1>Sembra che al momento non ci siano tatuatori</h1>
          )}
        </Col>
      </Row>
    </Container>
  )
}
export default TattooArtistsPage
