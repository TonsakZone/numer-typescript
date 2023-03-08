import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Bisection from './Pages/Bisection/Bisection';
import FalsePosition from './Pages/False-position/Falseposition';
import Onepoint from './Pages/One-Point/Onepoint';
// import Test from './Pages/Bisection/Test';
import NewtonRaphson from './Pages/Newton-Raphson/NewtonRaphson';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<Test />} /> */}
          <Route path="/graphical" element={''} />
          <Route path="/bisection" element={<Bisection />} />
          <Route path="/falseposition" element={<FalsePosition />} />
          <Route path="/onepoint" element={<Onepoint />} />
          <Route path="/newtonraphson" element={<NewtonRaphson />} />
          {/* <Route path="/taylor" element={<Taylor />} /> */}
          <Route path="/secant" element={''} />
          <Route path="/cramer" element={''} />
          <Route path="/gausseliminate" element={''} />
          <Route path="/gaussjordan" element={''} />
          <Route path="/matrixinversion" element={''} />
          <Route path="/ludecomposition" element={''} />
          <Route path="/cholesky" element={''} />
          <Route path="/jacobi" element={''} />
          <Route path="/gaussseidel" element={''} />
          <Route path="/conjugate" element={''} />
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
