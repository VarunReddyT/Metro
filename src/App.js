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
import Navbar from "./Components/Navbar";

function App() {
  return (
    <TicketProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/tickets' element={<Tickets/>}/>
        <Route path="/payment" element={<PaymentForm />}/>
        <Route path="/bookedticket" element={<BookedTicket />}/>
        <Route path="/account" element={<Account />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </Router>
    </TicketProvider>
  );
}

export default App;

// import Google from "./Components/Google";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import PaymentFormDisplay from "./Components/PaymentFormDisplay";
// <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
// </GoogleOAuthProvider>
{/* <Route path="/payment" element={<PaymentFormDisplay />}/> */}
{/* <Route path="/google" element={<Google/>}/> */}