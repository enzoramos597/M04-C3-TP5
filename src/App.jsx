import { ToastContainer } from "react-toastify"

import { ProfileProvider } from "./contexts/ProfileContext"
import AppRouter from "./Routes/AppRouter"


function App() {
  

  return (
    <>    
      <ProfileProvider>        
        <AppRouter />       
        <ToastContainer />
      </ProfileProvider>      
    </>
  )
}

export default App
