import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { API_USERS } from "../services/api"

const ProfileContext = createContext()

export const useProfiles = () => useContext(ProfileContext)

//const API="https://69153a6384e8bd126af9262c.mockapi.io/users"
//const API="https://69153a6384e8bd126af9262c.mockapi.io/users"


export const ProfileProvider = ({ children }) => {
    const [profiles, setProfiles] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchProfiles = async () => {
        setLoading(true)
       try {        
        const { data } = await axios.get(API_USERS)
        setProfiles(data)
       } catch (error) {
        console.error("Error fetching profiles:", error)
       } finally {
        setLoading(false)
       }
    }     
    
    //Post fn
    const createProfile = async (profile) => {
        const { data } = await axios.post(API_USERS, profile)
        console.log('Datos-->', data)
        setProfiles((prev) =>[...prev, data])
    }
    // PUT fn

    const updateProfile = async (id, updatedProfile) => {
        const { data } = await axios.put(`${API_USERS}/${id}`, updatedProfile)
        setProfiles((prev) =>   
            prev.map((profile) => (profile.id === id ? data : profile ))
        )   
    }
    // Delete fn
    const deleteProfile = async (id) => {
        await axios.delete(`${API_USERS}/${id}`)
        setProfiles((prev) => prev.filter((profile) => profile.id !== id))
    }

    useEffect(() => {
        fetchProfiles()
    }, [])      
    return (        

        <ProfileContext.Provider value={{ profiles, loading, createProfile, updateProfile, deleteProfile }}>             
            {children}
        </ProfileContext.Provider>
    )
}   

export default ProfileContext

            
