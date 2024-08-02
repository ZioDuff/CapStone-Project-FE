import "bootstrap/dist/css/bootstrap.min.css"
import "./style/App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import MyHomePage from "./components/MyHomePage"
import MyNavbar from "./components/MyNavbar"
import MyMainProfile from "./components/MyMainProfile"
import TattooArtistsPage from "./components/TattooArtistsPage"
import SingleTattooArtistPage from "./components/SingleTattooArtistPage"
import { ReservationPage } from "./components/ReservationPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MyHomePage />} />
          <Route path="/profilePage" element={<MyMainProfile />} />
          <Route path="/tatuatori" element={<TattooArtistsPage />} />
          <Route path="/tatuatore/:id" element={<SingleTattooArtistPage />} />
          <Route path="/prenota" element={<ReservationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
