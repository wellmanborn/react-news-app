import {useAuth} from "../providers/Auth.jsx";
import {Navigate, useLocation} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Authenticated = ({children}) => {

    const location = useLocation();
    const auth = useAuth();

    console.log(auth.user)

    if(!auth.user){
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    return children;
}

export default Authenticated;