import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import DetailRecipe from "./components/DetailRecipe";
import CreateRecipe from "./components/CreateRecipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />} />
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/recipe/:id" element={<DetailRecipe />} />
      <Route path="/newrecipe" element={<CreateRecipe />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
