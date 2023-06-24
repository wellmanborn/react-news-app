import {useContext, useState, createContext} from "react";

const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {

    const userDetails = localStorage.getItem('userDetails') ?? null;

    const [user, setUser] = useState(userDetails);

    const login = (user) => {
        localStorage.setItem('userDetails', JSON.stringify(user));
        setUser(user);
    }

    const logout = () => {
        localStorage.removeItem('userDetails');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}