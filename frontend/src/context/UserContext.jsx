;
import {useContext, createContext, useState} from 'react'
import { AuthDataContext } from './AuthContext';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 


export const userDataContext = createContext();

function UserContext({children}) {
    
    let [userData, setUserData] = useState("");

    let {serverUrl} = useContext(AuthDataContext)

    let navigate = useNavigate();

    const getCurrentUser = async () => {
    try {
        let result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
            withCredentials: true
        });

        setUserData(result.data);
        console.log("User data fetched successfully:", result.data);
    } catch (error) {
        // Only log as error if it's not a 401 (which is expected when user is not logged in)
        if (error.response?.status !== 401) {
            console.log("Error in getCurrentUser:", error);
        }
        setUserData(null);
    }
}

     useEffect(() => {
        getCurrentUser();
        
     },[])


    let value = {
          userData, setUserData, getCurrentUser
    }

  return (
    <div>
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext
