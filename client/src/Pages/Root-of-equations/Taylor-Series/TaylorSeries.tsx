import React, { useState, FormEvent, ChangeEvent } from "react"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './TaylorSeries.css'
import { derivative, parse, factorial, evaluate } from 'mathjs'

interface FormValues {
  fx: string;
  x: number;
  x0: number;
  n: number;
}

const TaylorSeries: React.FC = () => {
  const [showGraph, setshowGraph] = useState<boolean>(false);
  const [displayEQ, setDisplayEQ] = useState<string>("(x^2)-7");
  const [X, setX] = useState<number>(0);
  const [Xin, setXin] = useState<number>(0);
  const [X0in, setX0in] = useState<number>(0);
  const [N, setN] = useState<number>(0);

  const CalTaylor = (x: number, x0: number, f: string, n: number) => {
    console.log(x + " " + x0 + " " + f + " " + n);
    let scope = {
      x:x
    }
    let fAns=evaluate(displayEQ,scope);
    console.log(fAns);
    
    let fx = "";
    let iter = 0;
    let answer = 0;
    while (iter <= n) {
      if (iter == 0) {
        fx = f
        console.log(fx);
        answer += parse(fx).evaluate({ x: x0 }) + Math.pow((x - x0), iter) / factorial(iter);
        console.log(answer);
        iter++;
      }
      else {
        fx = derivative(fx, 'x').toString();
        console.log(fx);
        answer += parse(fx).evaluate({ x: x0 }) + Math.pow((x - x0), iter) / factorial(iter);
        console.log(answer);
        iter++;
      }
    }
    console.log(answer + "out");
    setX(answer);
    setshowGraph(true);
  }

  const inputEquation = (fx: string) => {
    setDisplayEQ(fx);
  }

  const inputfx = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayEQ(e.target.value);
  }

  const inputX = (e: ChangeEvent<HTMLInputElement>) => {
    setXin(parseFloat(e.target.value));
  }

  const inputX0 = (e: ChangeEvent<HTMLInputElement>) => {
    setX0in(parseFloat(e.target.value));
  }

  const inputN = (e: ChangeEvent<HTMLInputElement>) => {
    setN(parseFloat(e.target.value));
  }

  const calculateRoot = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setX(0);
    // const formData: FormValues = {
    //   fx: e.currentTarget.value.fx,
    //   x: parseFloat(e.currentTarget.value.x),
    //   x0: e.currentTarget.value.x0,
    //   n: e.currentTarget.value.n
    // };
    // inputEquation(formData.fx);
    // setXin(formData.x);
    // setX0in(formData.x0);
    // setN(formData.n);
    CalTaylor(Xin, X0in, displayEQ, N);
  }

  return (
    <div className="taylor">
      <div className="container taylor-input" style={{ margin: "2vh 2vw", padding: "20px" }}>
        <form style={{ width: "20vw" }} onSubmit={(e) => { calculateRoot(e) }}>
          <u><h4><b>Taylor Series method</b></h4></u>
          <h5><b>Please fill the input below</b></h5>
          <label htmlFor='fx'>f(x)</label>
          <br />
          <input required type="text" id="fx" data-testid='fx' name="fx" className="form-control" placeholder="Enter f(x)" style={{ borderRadius: "5px" }} onChange={inputfx} defaultValue={displayEQ} />
          <br />
          <label htmlFor='x'>X value</label>
          <br />
          <input required type="number" step="0.01" id='x' data-testid='x' name="x" className="form-control" placeholder="Enter X" style={{ borderRadius: "5px" }} onChange={inputX} />
          <br />
          <label htmlFor="x0">X0 value</label>
          <br />
          <input required type="number" step="0.01" id='x0' data-testid='x0' name="x0" className="form-control" placeholder="Enter X0" style={{ borderRadius: "5px" }} onChange={inputX0}/>
          <br />
          <label htmlFor='n'>N value</label>
          <br />
          <input required type="number" step="0.01" id='n' data-testid='n' name="n" className="form-control" placeholder="Enter N" style={{ borderRadius: "5px" }} onChange={inputN} />
          <br />
          <div className="taylor-child">
            <div style={{ width: "100px" }}>
              <button className="btn btn-primary btn-block" id="btn-submit" style={{ backgroundColor: "#ad2e24", borderColor: "#540804", marginBottom: "5px" }} data-testid='calculate 'type="submit">Calculate</button>
            </div>
            <div>
              <button disabled className="btn btn-primary btn-block" id="btn-load" style={{ backgroundColor: "#ea8c55", borderColor: "#ffbe0b", marginBottom: "5px" }} onClick={() => { }}>Example</button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {showGraph === true &&
          <div>
            <div className="container taylor-answer" style={{ margin: "2vh 2vw", padding: "10px 20px", border: "3px solid #ea8c55", borderRadius: "8px" }}>
              <div>
                <h4><u><b>Input equation: {displayEQ}</b></u></h4>
                <h4>Input X: {Xin}</h4>
                <h4>Input X0: {X0in}</h4>
                <h4>Input N: {N}</h4>
              </div>
              <div>
                <h4><u><b>Result</b></u></h4>
                <h5>Total iteration: {N}</h5>
                <div data-testid='ans'>Answer = {X.toPrecision(1)}</div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

  )
}

export default TaylorSeries;