import Home from "./Components/HomePage";
import Tickets from "./Components/Tickets";
import './Components/css/Home.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PaymentForm from "./Components/PaymentForm";
import BookedTicket from "./Components/BookedTicket";
import { TicketProvider } from "./Components/TicketContext";
import Account from "./Components/Account";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Google from "./Components/Google";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
    <TicketProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tickets' element={<Tickets/>}/>
        <Route path="/payment" element={<PaymentForm />}/>
        <Route path="/bookedticket" element={<BookedTicket />}/>
        <Route path="/account" element={<Account />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/google" element={<Google/>}/>
      </Routes>
    </Router>
    </TicketProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
