import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home/Home";
import { MovieDetails } from "./components/MovieDetails";

function App() {
  return (<>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:type/:id/:title" element={<MovieDetails />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
