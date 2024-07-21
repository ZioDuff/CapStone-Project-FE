import "bootstrap/dist/css/bootstrap.min.css"
import "./style/partials/_loginpage.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./components/LoginPage"
import MyHomePage from "./components/MyHomePage"
import MyNavbar from "./components/MyNavbar"

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MyHomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
