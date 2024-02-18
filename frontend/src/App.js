import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Header from "./components/Header";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import NewTicket from "./pages/NewTicket";
import Tickets from "./pages/Tickets";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/new-ticket"
                            element={
                                <PrivateRoute>
                                    <NewTicket />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/tickets"
                            element={
                                <PrivateRoute>
                                    <Tickets />
                                </PrivateRoute>
                            }
                        />
                        {/* <Route
                            path="/ticket/:ticketId"
                            element={
                                <PrivateRoute>
                                    <Ticket />
                                </PrivateRoute>
                            }
                        /> */}
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
