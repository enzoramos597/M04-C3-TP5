import { ToastContainer } from "react-toastify"
import Home from "./componentes/Home"
import IniciarSesion from "./componentes/InciarSesion"
import RegisterForm from "./componentes/RegisterForm"
import { ProfileProvider } from "./contexts/ProfileContext"
import AppRouter from "./Routes/AppRouter"

function App() {
  

  return (
    <>
      <ProfileProvider>
        {/*<IniciarSesion />*/}
        {/*<RegisterForm />*/}
        <AppRouter />
        <ToastContainer />
      </ProfileProvider>      
    </>
  )
}

export default App
