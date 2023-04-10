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

import { render, screen, fireEvent } from '@testing-library/react';
import NewtonRaphson from './Pages/Root-of-equations/Newton-Raphson/NewtonRaphson';

describe('NewtonRaphson component', () => {
  test('renders input fields and button', () => {
    render(<NewtonRaphson />);
    const fxInput = screen.getByLabelText('f(x)');
    const xInput = screen.getByLabelText('x');
    const submitButton = screen.getByText('Calculate');
    expect(fxInput).toBeInTheDocument();
    expect(xInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('displays root and iteration count after calculation', () => {
    render(<NewtonRaphson />);
    const fxInput = screen.getByLabelText('f(x)');
    const xInput = screen.getByLabelText('x');
    const submitButton = screen.getByText('Calculate');
    fireEvent.change(fxInput, { target: { value: '(x^2)-7' } });
    fireEvent.change(xInput, { target: { value: '2' } });
    fireEvent.click(submitButton);
    const rootText = screen.getByText('2.6458');
    const iterationText = screen.getByText('5');
    expect(rootText).toBeInTheDocument();
    expect(iterationText).toBeInTheDocument();
  });
});
