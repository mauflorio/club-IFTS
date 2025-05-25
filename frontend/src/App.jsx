import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/login';
import ProfileLanding from './components/ProfileLanding';
import PrivateRoute from './routes/PrivateRoute';
import AvailableActivities from './components/AvailableActivities';
import EnrolledActivities from './components/EnrolledActivities';

function Home() {
  return <h1>Bienvenido al sistema de gestión del club</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={
          <PrivateRoute>
            <ProfileLanding />
          </PrivateRoute>
        } />
        <Route path="/actividades" element={
          <PrivateRoute>
            <AvailableActivities />
          </PrivateRoute>
        } />
        <Route path="/actividades/inscriptas" element={
          <PrivateRoute>
            <EnrolledActivities />
          </PrivateRoute>
        } />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

