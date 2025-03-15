import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Learn } from './pages/Learn';
import  Collaborate  from './pages/Collaborate';
import  Events  from './pages/Events';
import  Map  from './pages/Map';
import Rewards from './pages/Rewards';
import  About  from './pages/About';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { PrivateRoute } from './components/PrivateRoute';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { Overview } from './pages/dashboard/Overview';
export function App() {
  return <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <Home />
                  </main>
                  <Footer />
                </div>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<PrivateRoute>
                  <DashboardLayout>
                    <Overview />
                  </DashboardLayout>
                </PrivateRoute>} />
            <Route path="/dashboard/learn" element={<PrivateRoute>
                  <DashboardLayout>
                    <Learn />
                  </DashboardLayout>
                </PrivateRoute>} />
            <Route path="/dashboard/collaborate" element={<PrivateRoute>
                  <DashboardLayout>
                    <Collaborate />
                  </DashboardLayout>
                </PrivateRoute>} />
            <Route path="/dashboard/events" element={<PrivateRoute>
                  <DashboardLayout>
                    <Events />
                  </DashboardLayout>
                </PrivateRoute>} />
            <Route path="/dashboard/map" element={<PrivateRoute>
                  <DashboardLayout>
                    <Map />
                  </DashboardLayout>
                </PrivateRoute>} />
            <Route path="/dashboard/rewards" element={<PrivateRoute>
                  <DashboardLayout>
                    <Rewards />
                  </DashboardLayout>
                </PrivateRoute>} />
            <Route path="/*" element={<div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex flex-col">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/learn" element={<Learn />} />
                      <Route path="/collaborate" element={<Collaborate />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/map" element={<Map />} />
                      <Route path="/rewards" element={<Rewards />} />
                      <Route path="/about" element={<About />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>;
}

export default App;