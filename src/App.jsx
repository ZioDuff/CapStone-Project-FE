import "bootstrap/dist/css/bootstrap.min.css"
import "./App.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LoginPage from "./components/loginPage/LoginPage"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
