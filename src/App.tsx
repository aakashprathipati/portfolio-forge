import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Portfolio";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import NavigationEffects from "./components/NavigationEffects";

const App = () => (
  <BrowserRouter
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <NavigationEffects />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/projects/:slug" element={<Project />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
