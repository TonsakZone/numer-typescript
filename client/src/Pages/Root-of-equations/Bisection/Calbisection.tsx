import { evaluate } from 'mathjs';
// import { Data } from './Bisection';

type Data = {
    iteration: number;
    XL: number;
    Xm: number;
    Xr: number;
    E: number;
};

export const Calbisection = (xL: number, xr: number, equation: string): Data => {
  let xm, fXm, fXr, ea, scope;
  let iter = 0;
  let MAX = 50;
  const e = 0.00001;
  let obj: Data = { iteration: 0, XL: 0, Xm: 0, Xr: 0, E: 100 };
  do {
    xm = (xL + xr) / 2.0;
    scope = {
      x: xr,
    };
    fXr = evaluate(equation, scope);
    scope = {
      x: xm,
    };
    fXm = evaluate(equation, scope);
    iter++;
    if (fXm * fXr > 0) {
      ea = error(xr, xm);
      obj = {
        iteration: iter,
        XL: xL,
        Xm: xm,
        Xr: xr,
        E: ea,
      };
      xr = xm;
    } else {
      ea = error(xL, xm);
      obj = {
        iteration: iter,
        XL: xL,
        Xm: xm,
        Xr: xr,
        E: ea,
      };
      xL = xm;
    }
  } while (ea > e && iter < MAX);
  return obj;
};

const error = (xold: number, xnew: number) =>
  Math.abs((xnew - xold) / xnew) * 100;
