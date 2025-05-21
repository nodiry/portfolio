import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/App';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import TwoAuth from './auth/TwoAuth';
import Dashboard from './dashboard/Dashboard';
import AboutPage from './components/AboutPage';
import UnAvailable from './errors/404';
import { ThemeProvider } from './components/theme-provider';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/yoz" element={<HomePage />} />
        <Route path="/blog/:id" element={<SignIn />} />
        <Route path="/project/:id" element={<SignUp />} />
        <Route path="/project" element={<TwoAuth />} />
        <Route path="/blog" element={<Dashboard />} />
        <Route path="/contact" element={<AboutPage />} />
        <Route path="*" element={<UnAvailable />} /> {/* Catch-all route */}
      </Routes>
    </Router>
    </ThemeProvider>
  </StrictMode>,
)
