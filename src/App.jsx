import './App.css'
import {AuthProvider} from "./providers/auth.jsx";
import {Route, Routes} from "react-router-dom";
import Articles from "./pages/articles/Articles";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Authenticated from "./components/Authenticated";

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route exact path="/" element={<Authenticated><Articles/></Authenticated>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/signup" element={<Signup/>}/>
            </Routes>
        </AuthProvider>
    )
}

export default App
