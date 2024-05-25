import Fare from "./Components/HomePage";
import Tickets from "./Components/Tickets";
import SmartCard from "./Components/SmartCard";
import './Components/Home.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import PaymentForm from "./Components/PaymentForm";
import StripeSetup from "./Components/StripeSetup";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Fare/>}/>
        <Route path='/tickets' element={<Tickets/>}/>
        <Route path='/smartcard' element={<SmartCard/>}/>
        <Route path="/payment" element={<StripeSetup><PaymentForm /></StripeSetup>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
