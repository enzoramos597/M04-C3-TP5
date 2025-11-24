
import { ProfileProvider } from "./contexts/ProfileContext"
import AppRouter from "./Routes/AppRouter"


function App() {
  

  return (
    <> 
      <ProfileProvider>        
        <AppRouter />           
      </ProfileProvider>      
    </>
  )
}

export default App
