import { FaFacebook, FaInstagram } from "react-icons/fa"
import "../style/App.scss"
import "../style/partials/_myFooter.scss"
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit"

const MyFooter = () => {
  return (
    <MDBFooter className="border-top border-primary text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-evenly p-4 ">
        <div className="me-5 d-none d-lg-block">
          <h6 className="text-uppercase fw-bold">
            Rimani in contatto con noi:
          </h6>
        </div>

        <div>
          <a href="#" className="me-4   text-reset">
            <FaFacebook className="icon-social" />
          </a>

          <a href="" className="me-4 text-reset">
            <FaInstagram className="icon-social" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Tattoo Studio</h6>
              <p>Solo il meglio per i nostri clienti</p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">I nostri orari</h6>

              <ul
                style={{
                  display: "inline-block",
                }}
              >
                <li>Lun:9-18</li>
                <li>Mar: 9-18</li>
                <li>Mer: 9-18</li>
                <li>Gio: 9-18</li>
                <li>Ven: 9-18</li>
                <li>Sab: 9-18</li>
                <li>Dom: 9-18</li>
              </ul>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Roma
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4 "
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <span className="me-1">© 2024 Copyright:</span>
        <a
          className=" fw-bold text-primary"
          href="https://www.linkedin.com/in/jacopo-de-maio-8468ab304/"
          target="_blank"
        >
          Jacopo De Maio
        </a>
      </div>
    </MDBFooter>
  )
}
export default MyFooter
