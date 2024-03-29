import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    return (
        <div>
            <body className='navi'>
                <nav>
                    <h2>Numerical project</h2>
                    <ul className="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/rootofequation">Root of equations</Link>
                            {/* <ul className="menu-sub">
                                <li><Link to="/bisection">Bisection</Link></li>
                                <li><Link to="/falseposition">False-Position</Link></li>
                                <li><Link to="/onepoint">One-Point Iteration</Link></li>
                                <li><Link to="/newtonraphson">Newton-Raphson</Link></li>
                                <li><Link to="/taylor">Taylor Series</Link></li>
                                <li><Link to="/secant">Secant</Link></li>
                            </ul> */}
                            </li>
                        <li><Link to="/solutiontechnique">Solution Techniques</Link>
                            {/* <ul className="menu-sub">
                                <li><Link to="/cramer">Cramer's Rule</Link></li>
                                <li><Link to="/gausseliminate">Gauss Elimination</Link></li>
                                <li><Link to="/gaussjordan">Gauss-Jordan</Link></li>
                                <li><Link to="/matrixinversion">Matrix Inversion</Link></li>
                                <li><Link to="/ludecomposition">LU Decomposition</Link></li>
                                <li><Link to="/cholesky">Cholesky Decomposition</Link></li>
                                <li><Link to="/jacobi">Jacobi Itertion</Link></li>
                                <li><Link to="/gaussseidel">Gauss-Seidel Itertion</Link></li>
                                <li><Link to="/conjugate">Conjugate Gradient</Link></li>
                            </ul> */}
                            </li>
                        <li><Link to="/regression">Least-Square Regression</Link></li>
                    </ul>
                </nav>
            </body>
        </div>
    );
}

export default Navbar;