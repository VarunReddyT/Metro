import Fare from "./Components/HomePage";
import Tickets from "./Components/Tickets";
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
        <Route path="/payment" element={<PaymentForm />}/>
        <Route path="/bookedticket" element={<BookedTicket />}/>
      </Routes>
    </Router>
    </TicketProvider>
    </>
  );
}

export default App;
