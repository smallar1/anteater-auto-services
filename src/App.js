import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer'; 
import Testimonials from './components/Testimonials';
import Booking from './components/Bookings';
import ProfileDashboard from './components/ProfileDashboard';
import BookingHistory from './components/BookingHistory';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content"> {/* This div will grow to take the available space */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/bookings" element={<Booking />} />
            <Route path="/history" element={<BookingHistory />} />
            <Route
              path="/account"
              element={
                <>
                  <SignedIn>
                    <ProfileDashboard />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            {/* Insert other routes */}
          </Routes>
        </div>
        <Footer /> {/* The footer will always be at the bottom */}
      </div>
    </Router>
  );
}

export default App;
