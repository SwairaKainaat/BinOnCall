import { useState } from 'react'
import { Routes, Route, Router } from "react-router-dom"; 
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Services from './pages/Services';
import Schedule from './pages/Schedule';
import Jobs from './pages/Jobs';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';
import About from './pages/About';
import Account from './pages/Account';
import Advertise from './pages/Advertise';
import Affiliate from './pages/Affiliate';
import BinServices from './pages/BinServices';
import Blog from './pages/Blog';
import Bulk from './pages/Bulk';
import Career from './pages/Career';
import Contact from './pages/Contact';
import Express from './pages/Express';
import FAQs from './pages/FAQs';
import Investors from './pages/Investors';
import Login from './pages/Login';
import Pickup from './pages/Pickup';
import PickupScheduling from './pages/PickupScheduling';
import Privacy from './pages/Privacy';
import Recycling from './pages/Recycling';
import Sell from './pages/Sell';
import Signup from './pages/Signup';
import Terms from './pages/Terms';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
   <Routes>
         <Route path="/" exact element={<Home />} />
         <Route path="/Services"  element={<Services />} />
         <Route path="/Schedule"  element={<Schedule />} />
         <Route path="/Jobs"  element={<Jobs />} />
         <Route path="/AdminDashboard" element={<AdminDashboard/>} />
         <Route path="/About" element={<About/>} />
         <Route path="/Account" element={<Account/>} />
         <Route path="/Advertise" element={<Advertise/>} />
         <Route path="/Affiliate" element={<Affiliate/>} />
         <Route path="/BinServices" element={<BinServices/>} />
         <Route path="/Blog" element={<Blog/>} />
         <Route path="/Bulk" element={<Bulk/>} />
         <Route path="/Career" element={<Career/>} />
         <Route path="/Contact" element={<Contact/>} />
         <Route path="/Express" element={<Express/>} />
         <Route path="/FAQs" element={<FAQs/>} />
         <Route path="/Investors" element={<Investors/>} />
         <Route path="/Login" element={<Login/>} />
         <Route path="/Pickup" element={<Pickup/>} />
         <Route path="/PickupSheduling" element={<PickupScheduling/>} />
         <Route path="/Privacy" element={<Privacy/>} />
         <Route path="/Recycling" element={<Recycling/>} />
         <Route path="/Sell" element={<Sell/>} />
         <Route path="/Signup" element={<Signup/>} />
         <Route path="/Terms" element={<Terms/>} />
         </Routes>
         <Footer/>
    </>
  )
}

export default App
