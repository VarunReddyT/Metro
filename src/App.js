import Fare from "./Components/HomePage";
import Tickets from "./Components/Tickets";
import SmartCard from "./Components/SmartCard";
import './Components/Home.css';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Fare/>}/>
        <Route path='/tickets' element={<Tickets/>}/>
        <Route path='/smartcard' element={<SmartCard/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
