import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSingleTattooArtistAction } from "../redux/actions"
import { Col, Container, Row } from "react-bootstrap"

const SingleTattooArtistPage = () => {
  const SingleTattooArtist = useSelector(
    (state) => state.tattooArtist.singleTattooArtist
  )
  const loading = useSelector((state) => state.tattooArtist.loading)
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (id) {
      console.log(id)
      dispatch(fetchSingleTattooArtistAction(id))
    }
  }, [dispatch, id])

  if (loading) {
    return <div>caricamento....</div>
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            {!SingleTattooArtist ? (
              <p>nessun artista trovato</p>
            ) : (
              <img src={SingleTattooArtist.avatarURL} alt="" />
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default SingleTattooArtistPage
