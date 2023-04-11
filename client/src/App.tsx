import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Rootmainpage from './Pages/Root-of-equations/Rootmainpage';
import Bisection from './Pages/Root-of-equations/Bisection/Bisection';
import FalsePosition from './Pages/Root-of-equations/False-position/Falseposition';
import Onepoint from './Pages/Root-of-equations/One-Point/Onepoint';
import NewtonRaphson from './Pages/Root-of-equations/Newton-Raphson/NewtonRaphson';
import TaylorSeries from './Pages/Root-of-equations/Taylor-Series/TaylorSeries';
import Secant from './Pages/Root-of-equations/Secant/Secant';
import SolutionTechniques from './Pages/Solution-techniques/Solution-techniques';
import Cramer from './Pages/Solution-techniques/Cramer/Cramer';
import LinearRegression from './Pages/Least-square-regression/Linear-regression/LinearRegression';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/rootofequation" element={<Rootmainpage />} />
          <Route path="/bisection" element={<Bisection />} />
          <Route path="/falseposition" element={<FalsePosition />} />
          <Route path="/onepoint" element={<Onepoint />} />
          <Route path="/newtonraphson" element={<NewtonRaphson />} />
          <Route path="/taylor" element={<TaylorSeries />} />
          <Route path="/secant" element={<Secant />} />
          <Route path="/solutiontechnique" element={<SolutionTechniques />} />
          <Route path="/cramer" element={<Cramer />} />
          <Route path="/gausseliminate" element={''} />
          <Route path="/gaussjordan" element={''} />
          <Route path="/matrixinversion" element={''} />
          <Route path="/ludecomposition" element={''} />
          <Route path="/cholesky" element={''} />
          <Route path="/jacobi" element={''} />
          <Route path="/gaussseidel" element={''} />
          <Route path="/conjugate" element={''} />
          <Route path="/regression" element={<LinearRegression />} />
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
