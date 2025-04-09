import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
// import ReportForm from "./components/ReportForm";
// import QuietFinder from "./components/QuietFinder";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        {/* <Route path="/report" element={<ReportForm />} />
        <Route path="/quiet" element={<QuietFinder />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
