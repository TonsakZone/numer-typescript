import { evaluate } from 'mathjs';

type Data = {
    iteration: number;
    XL: number;
    X1: number;
    XR: number;
    E: number;
    X1old: number;
};


export const Calfalseposition = (xL: number, xR: number, equation: string) => {
    let X1, fX1, fXR, fXL, ea, scope, X1old = 0;
    let iter = 0;
    let MAX = 50;
    const e = 0.00001;
    let obj: Data = { iteration: 0, XL: 0, X1: 0, XR: 0, E: 100, X1old: 0 };
    do {
        scope = {
            x: xR,
        }
        fXR = evaluate(equation, scope)
        scope = {
            x: xL,
        }
        fXL = evaluate(equation, scope)
        X1 = ((xL * fXR) - (xR * fXL)) / (fXR - fXL);
        scope = {
            x: X1,
        }
        fX1 = evaluate(equation, scope)
        iter++;
        if (fX1 * fXR > 0) {
            ea = error(X1old, X1);
            obj = {
                iteration: iter,
                XL: xL,
                X1: X1,
                XR: xR,
                E: ea,
                X1old: X1old
            }
            X1old = X1;
            xR = X1;
        }
        else {
            ea = error(X1old, X1);
            obj = {
                iteration: iter,
                XL: xL,
                X1: X1,
                XR: xR,
                E: ea,
                X1old: X1old
            }
            X1old = X1;
            xL = X1;
        }
    } while (ea > e && iter < MAX)
    return obj;

}

const error = (xold: number, xnew: number) => Math.abs((xnew - xold) / xnew) * 100;

