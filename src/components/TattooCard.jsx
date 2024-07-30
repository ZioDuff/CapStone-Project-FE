import { Card } from "react-bootstrap"
import "../style/partials/_tattooCard.scss"

const TattooCard = ({ tattoo }) => {
  // const tattooArtistId = useSelector((state) => state.user?.user_info?.id)
  // const token = useSelector((state) => state.user.user_bearer?.accessToken)
  // const dispatch = useDispatch()
  // const [showDeleteModal, setShowDeleteModal] = useState(false)
  // const handleShowDeleteModal = () => setShowDeleteModal(true)
  // const handleCloseDeleteModal = () => setShowDeleteModal(false)

  // const handleDeleteTattoo = () => {
  //   if (token) {
  //     dispatch(fetchDeleteOwnTattooAction(token, tattoo?.id)).then(()=>{
  //       handleCloseDeleteModal()
  //     })

  //   }
  // }

  return (
    <>
      <Card border="warning">
        <Card.Img
          className="tattoo-card"
          src={tattoo.tattoURL}
          alt={tattoo.name}
        />
        <div className="card-overlay p-2">
          <Card.Title>{tattoo?.name}</Card.Title>
        </div>
      </Card>
    </>
  )
}
export default TattooCard
