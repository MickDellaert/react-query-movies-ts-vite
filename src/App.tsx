import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Movies } from "./components/Movies";
import { MovieDetails } from "./components/MovieDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/:type/:id/:title" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
