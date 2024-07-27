import "../style/partials/_singleTattooArtistPage.scss"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSingleTattooArtistAction } from "../redux/actions"
import { Col, Container, Row, Spinner } from "react-bootstrap"

const SingleTattooArtistPage = () => {
  const singleTattooArtist = useSelector(
    (state) => state.tattooArtist.singleTattooArtist
  )
  const loading = useSelector((state) => state.tattooArtist.loading)
  const tattoos = useSelector(
    (state) => state.tattooArtist.singleTattooArtist?.tattoos
  )
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleTattooArtistAction(id))
    }
  }, [dispatch, id])

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

  return (
    <>
      <Container className="mt-5" data-bs-theme="dark">
        <Row className="justify-content-center">
          <Col xs={12}>
            {!singleTattooArtist ? (
              <p>nessun artista trovato</p>
            ) : (
              <>
                <div className=" position-relative d-flex align-items-center justify-content-around  border-bottom pb-5">
                  <div>
                    <img
                      className="artist-avatar"
                      src={singleTattooArtist?.avatarURL}
                      alt=""
                    />
                  </div>
                  <div className="text-light">
                    <h2>{singleTattooArtist?.username}</h2>
                  </div>
                  <div className="position-absolute  bottom-0 end-0  text-light">
                    <p>qui icona instagram e facebook</p>
                  </div>
                </div>
                <div className="mt-4 d-flex flex-column align-items-center border-bottom pb-5">
                  <h1>Qualcosa su di me!</h1>
                  <div className="text-light">
                    {singleTattooArtist?.description}
                  </div>
                </div>
                {tattoos?.length > 0 ? (
                  <Container className="mt-5">
                    <Row>
                      <h2 className="text-light">
                        questi sono alucni dei miei lavori
                      </h2>
                      {tattoos.map((tattoo, i) => (
                        <Col xs={12} className="my-4" key={i}>
                          <img
                            className="w-100"
                            src={tattoo.tattoURL}
                            alt={tattoo.name}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Container>
                ) : (
                  <div className="mt-5">
                    <h2 className="text-light">
                      I miei lavori arriveranno presto !
                    </h2>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default SingleTattooArtistPage
