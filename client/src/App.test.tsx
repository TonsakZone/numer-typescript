// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';
// import Bisection from './Pages/Root-of-equations/Bisection/Bisection';

// describe('test bisection' , () => {
//   test('bisection', () => {

//     expect(Bisection).toBeInTheDocument();
//   });
// })



// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// import { render, screen, fireEvent } from '@testing-library/react';
// import NewtonRaphson from './Pages/Root-of-equations/Newton-Raphson/NewtonRaphson';

// describe('NewtonRaphson component', () => {
//   test('renders input fields and button', () => {
//     render(<NewtonRaphson />);
//     const fxInput = screen.getByLabelText('f(x)');
//     const xInput = screen.getByLabelText('x');
//     const submitButton = screen.getByText('Calculate');
//     expect(fxInput).toBeInTheDocument();
//     expect(xInput).toBeInTheDocument();
//     expect(submitButton).toBeInTheDocument();
//   });

//   test('displays root and iteration count after calculation', () => {
//     render(<NewtonRaphson />);
//     const fxInput = screen.getByLabelText('f(x)');
//     const xInput = screen.getByLabelText('x');
//     const submitButton = screen.getByText('Calculate');
//     fireEvent.change(fxInput, { target: { value: '(x^2)-7' } });
//     fireEvent.change(xInput, { target: { value: '2' } });
//     fireEvent.click(submitButton);
//     const rootText = screen.getByText('2.6458');
//     const iterationText = screen.getByText('5');
//     expect(rootText).toBeInTheDocument();
//     expect(iterationText).toBeInTheDocument();
//   });
// });

import {Calbisection} from './Pages/Root-of-equations/Bisection/Calbisection';
import { Calfalseposition } from './Pages/Root-of-equations/False-position/Calfalseposition';


describe('calBisection', () => {
  test('returns the root of the equation', () => {
    // Test the function with the equation x^3 + 4x^2 - 10 = 0
    const equation = '(x^3)+(4x^2)-10';
    const result = Calbisection(1, 2, equation);
    expect(result.Xm).toBeCloseTo(1.3652, 4);
  });
});

describe('calFalseposition', () => {
  test('returns the root of the equation', () => {
    // Test the function with the equation x^3 + 4x^2 - 10 = 0
    const equation = '(x^4)-13';
    const result = Calfalseposition(0, 2, equation);
    expect(result.X1).toBeCloseTo(1.8988, 4);
  });
});
