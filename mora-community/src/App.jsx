import './App.css'
import { React, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './features/landing/LandingPage.jsx'
import Mainlayout from './shared/Layout/Mainlayout.jsx'
import Footer from './shared/Layout/Footer.jsx'
import { Spinner } from "@/components/ui/spinner"
import { Toaster } from 'sonner'
import ProtectedRoute from './shared/Layout/components/ProtectedRoute.jsx'
// Lazy load component
const Loginpage = lazy(() => import('./shared/Layout/components/Loginpage.jsx'));
function App() {

  return (
    <>
      <Toaster richColors />
      <Router>
        <Routes>
          {/* public path */}
          <Route path="/signin" element={
            <Suspense fallback={<Spinner />}>
              <Mainlayout children={<Loginpage />} Footerchildren={<Footer />} />
            </Suspense>
          } />
          {/* protecte path */}
          <Route element={
            <ProtectedRoute />
          }>
            <Route path="/" element={
              <Suspense fallback={<Spinner />}>
                <Mainlayout children={<LandingPage />} Footerchildren={<Footer />} />
              </Suspense>
            } />
          </Route>
          {/* Error path  */}
        </Routes>
      </Router>
    </>
  )
}

export default App
