import React from 'react';
 import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Jumia from './pages/JumiaProducts';
import Mytek from './pages/MytekProducts';
import TunisiaNet from './pages/TunisiaNetProducts';
import Alkitab from './pages/AlkitabProducts';
import JumiaItemPage from './pages/JumiaItemPage';
import AlkitabItemPage from './pages/AlkitabItemPage';
import MytekItemPage from './pages/MytekItemPage';
import TunisiaNetItemPage from './pages/TunisiaNetItemPage';
import Home from './pages/Home';
import ScrollTop from './utils/scrollTop';
function App() {
  return (
    <>
      <BrowserRouter>
       <ScrollTop/>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jumia/" element={<Jumia />} />
          <Route path="/tunisiaNet/" element={<TunisiaNet />} />
          <Route path="/alkitab/" element={<Alkitab />} />
          <Route path="/mytek" element={<Mytek />} />
           
           <Route path="/jumia/:search/" element={<Jumia />} />
          <Route path="/tunisianet/:search/" element={<TunisiaNet />} />
          <Route path="/mytek/:search/" element={<Mytek />} />
          <Route path="/alkitab/:search/" element={<Alkitab />} />
          
          <Route path="/jumia/item/:id" element={<JumiaItemPage />} />
          <Route path="/alkitab/item/:id" element={<AlkitabItemPage />} />
          <Route path="/mytek/item/:id" element={<MytekItemPage />} />
          <Route path="/tunisianet/item/:id" element={<TunisiaNetItemPage />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
