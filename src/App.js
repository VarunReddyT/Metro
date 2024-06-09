import Fare from "./Components/HomePage";
import Tickets from "./Components/Tickets";
import SmartCard from "./Components/SmartCard";
import './Components/css/Home.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PaymentForm from "./Components/PaymentForm";
import BookedTicket from "./Components/BookedTicket";
import { TicketProvider } from "./Components/TicketContext";
function App() {
  return (
    <>
    <TicketProvider>
    <Router>
      <Routes>
        <Route path='/' element={<Fare/>}/>
        <Route path='/tickets' element={<Tickets/>}/>
        <Route path='/smartcard' element={<SmartCard/>}/>
        <Route path="/payment" element={<PaymentForm />}/>
        <Route path="/bookedticket" element={<BookedTicket />}/>
      </Routes>
    </Router>
    </TicketProvider>
    </>
  );
}

export default App;
