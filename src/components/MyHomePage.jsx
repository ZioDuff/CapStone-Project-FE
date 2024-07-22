import { Col, Container, Row } from "react-bootstrap"
import MyCarousel from "./MyCarousel"

const MyHomePage = () => {
  return (
    <>
      <MyCarousel />
      <Container>
        <Row>
          <Col xs={12} className="text-center mt-3">
            <h1>Greatest Tattoo Studio</h1>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default MyHomePage
