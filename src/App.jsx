import { About } from "./components/About.jsx";
import { Projects } from "./components/Projects.jsx";
import { Narbar } from "./components/Narbar.jsx";
import { Home } from "./components/Home.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";

//import { Box } from "./components/Box.jsx";

function App() {
  const location = useLocation();

  return (
    <>
      <Narbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
