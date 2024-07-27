import "../style/partials/_singleTattooArtistPage.scss"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSingleTattooArtistAction } from "../redux/actions"
import { Col, Container, Row } from "react-bootstrap"

const SingleTattooArtistPage = () => {
  const singleTattooArtist = useSelector(
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
                {singleTattooArtist.tattoos > 0 ? (
                  <div className="mt-5">
                    {singleTattooArtist?.tattoos.map((tattoo, i) => (
                      <div key={i}>
                        <img src={tattoo.tattooURL} alt={tattoo.name} />
                      </div>
                    ))}
                  </div>
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
