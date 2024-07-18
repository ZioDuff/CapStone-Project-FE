import "bootstrap/dist/css/bootstrap.min.css"
import "./style/partials/_loginpage.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./components/loginPage/LoginPage"
import MyHomePage from "./components/MyHomePage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MyHomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
