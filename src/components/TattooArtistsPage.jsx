import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchTattooArtistsAction } from "../redux/actions"
import { Col, Container, Row } from "react-bootstrap"
import TattooArtistCard from "./TattooArtistCard"

const TattooArtistsPage = () => {
  const tattooArtistsArray = useSelector(
    (state) => state.tattooArtist.tattooArtists
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchTattooArtistsAction())
    console.log(tattooArtistsArray)
  }, [])
  return (
    <Container fluid className="bg-secondary">
      <h1 className="text-center">Conosci la nostra crew!</h1>
      <Row>
        <Col>
          {!tattooArtistsArray.lenght > 0 ? (
            tattooArtistsArray.map((tattooArtist) => (
              <TattooArtistCard
                key={tattooArtist.id}
                tattooArtist={tattooArtist}
              />
            ))
          ) : (
            <p>Sta caricando....</p>
          )}
        </Col>
      </Row>
    </Container>
  )
}
export default TattooArtistsPage
