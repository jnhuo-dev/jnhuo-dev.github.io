import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Architecture from "./pages/Architecture";
import BIM from "./pages/BIM";
import Contact from "./pages/Contact";
import Development from "./pages/Development";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProjectDetailPage from "./pages/ProjectDetailPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="architecture" element={<Architecture />} />
          <Route path="bim" element={<BIM />} />
          <Route path="development" element={<Development />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
