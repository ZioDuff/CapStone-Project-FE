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
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <Container fluid>
      <h1 className="text-center mt-4 mb-4">Conosci la nostra crew!</h1>
      <div className="text-light text-center mb-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          accusamus ullam libero doloremque, unde ex animi corrupti cupiditate.
          Voluptas maiores alias numquam itaque dolor tempore quod dolorem,
          totam obcaecati molestiae?
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
