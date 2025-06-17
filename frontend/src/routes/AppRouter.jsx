import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import RegistrationForm from "../components/RegistrationForm";
import Login from "../components/login";
import PrivateRoute from "./PrivateRoute";
import ProfileLanding from "../components/ProfileLanding";
import AvailableActivities from "../components/AvailableActivities";
import EnrolledActivities from "../components/EnrolledActivities";
import RecuperarContraseña from "../components/RecuperarContraseña";
import ResetearContraseña from "../components/ResetearContraseña";
import AdminLanding from "../components/AdminLanding";
import AdminPerfil from "../components/AdminPerfil";
import ProfesorLanding from "../components/ProfesorLandinf";
import ProgramarClase from "../components/ProgramarClase";
import MisClases from "../components/MisClases";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <ProfileLanding />
            </PrivateRoute>
          }
        />
        <Route
          path="/actividades"
          element={
            <PrivateRoute>
              <AvailableActivities />
            </PrivateRoute>
          }
        />
        <Route
          path="/actividades/inscriptas"
          element={
            <PrivateRoute>
              <EnrolledActivities />
            </PrivateRoute>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminLanding />} />
        <Route path="/admin/perfil" element={<AdminPerfil />} />
        <Route path="/profesor" element={<ProfesorLanding />} />
        <Route path="/programar-clase" element={<ProgramarClase />} />
        <Route path="/mis-clases" element={<MisClases />} />
        <Route path="/recuperar" element={<RecuperarContraseña />} />
        <Route path="/resetear" element={<ResetearContraseña />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
