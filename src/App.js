import React from 'react';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
// import Prediction from './routes/Prediction';
import Navbar from './components/Navbar';
import Contact from './routes/Contact';
import PredHome from './components/PredHome';
import CropFertilizerPrediction from './components/CropFertilizerPrediction';
import YieldPrediction from './components/YieldPrediction'
import DiseasePrediction from './components/DiseasePrediction';
import RainfallPrediction from './components/RainfallPrediction';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Dashboard from './routes/Dashboard';




const App = () => {
  return(
  <>
   <Navbar/>
  <Routes>
    <Route path='/' element={<Home/>}/>
    {/* <Route path='/predictor' element={<Prediction/>}/> */}
    <Route path='/predict' element={<PredHome/>}/>

    <Route path="/crop-fertilizer-prediction" element={<CropFertilizerPrediction/>} />
    <Route path="/yield-prediction" element={<YieldPrediction/>} />
    <Route path="/disease-prediction" element={<DiseasePrediction/>} />
    <Route path="/rainfall-prediction" element={<RainfallPrediction/>} />
    
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/contact' element={<Contact/>}/>
  </Routes>
  </>
  );
};

export default App;
