import React, { useState } from 'react';
import {Calbisection} from './Pages/Root-of-equations/Bisection/Calbisection';
import { Calfalseposition } from './Pages/Root-of-equations/False-position/Calfalseposition';
import { render, fireEvent, screen } from '@testing-library/react';
import TaylorSeries from './Pages/Root-of-equations/Taylor-Series/TaylorSeries';

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

describe('Taylor component', () => {
  it('should calculate the Taylor series when the form is submitted', () => {
    render(<TaylorSeries />);
    const fxInput = screen.getByTestId('fx') as HTMLInputElement;
    const xInput = screen.getByTestId('x') as HTMLInputElement;
    const x0Input = screen.getByTestId('x0') as HTMLInputElement;
    const nInput = screen.getByTestId('n') as HTMLInputElement;
    const calculateButton = screen.getByTestId('calculate');
    
    console.log(fxInput.value);
    console.log(xInput.value);
    console.log(x0Input.value);
    console.log(nInput.value);

    fireEvent.change(fxInput, { target: { value: '(x^2)-7'} });
    fireEvent.change(xInput, { target: { value: 2} });
    fireEvent.change(x0Input, { target: { value: 1} });
    fireEvent.change(nInput,  { target: { value: 3} });

    console.log(fxInput.value);
    console.log(xInput.value);
    console.log(x0Input.value);
    console.log(nInput.value);

    fireEvent.click(calculateButton);

    const ans = screen.getByTestId('ans');
    console.log(ans.textContent);

    expect(ans.textContent).toBe('Answer = 0.7');
  });
});
