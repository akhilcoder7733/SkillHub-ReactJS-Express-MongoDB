// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import MySkills from "./pages/MySkills";
import ExploreSkills from "./pages/ExploreSkills";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import AddSkillStepper from "./pages/AddSkillStepper";

// Layouts & Components
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./layouts/MainLayout";
import IntroSplash from "./components/IntroSplash";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import EditSkill from "./pages/EditSkill";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });

    // Optional fallback: auto close splash after 6s
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={null}>
      {showIntro ? (
        <IntroSplash onComplete={() => setShowIntro(false)} />
      ) : (
        <Routes>
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="skills" element={<MySkills />} />
            <Route path="profile" element={<Profile />} />
            <Route path="contact" element={<Contact />} />
            <Route path="add-skill" element={<AddSkillStepper />} />
            <Route path="explore" element={<ExploreSkills />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="about" element={<About />} />
            <Route path="/edit-skill/:id" element={<EditSkill />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      )}
    </Suspense>
  );
}

export default App;
