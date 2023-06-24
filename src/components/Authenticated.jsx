import {useAuth} from "../providers/Auth.jsx";
import {Navigate, useLocation} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "./Navigation";

// eslint-disable-next-line react/prop-types
export const Authenticated = ({children}) => {

    const location = useLocation();
    const auth = useAuth();

    if(!auth.user){
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    return <><Navigation /><Container className="mt-4" >{children}</Container></>;
}

export default Authenticated;