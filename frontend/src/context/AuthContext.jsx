import { createContext,useState } from "react";

export const AuthContext = createContext();

function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("access")
    );

    const logout=()=>{
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsLoggedIn(false);
    };

    return(
        <AuthContext.Provider value={{isLoggedIn,setIsLoggedIn,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;