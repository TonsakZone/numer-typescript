import React, { useState, FormEvent } from "react"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './TaylorSeries.css'
import { derivative, parse, factorial, evaluate } from 'mathjs'
import { Link } from "react-router-dom";

interface FormValues {
  fx: string;
  x: number;
  x0: number;
  n: number;
}

const Taylor: React.FC = () => {
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

  const calculateRoot = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setX(0);
    const formData: FormValues = {
      fx: e.currentTarget.fx.value,
      x: e.currentTarget.x.value,
      x0: e.currentTarget.x0.value,
      n: e.currentTarget.n.value
    };
    inputEquation(formData.fx);
    setXin(formData.x);
    setX0in(formData.x0);
    setN(formData.n);
    CalTaylor(formData.x, formData.x0, formData.fx, formData.n);
  }

  return (
    <div className="taylor">
      <div className="container taylor-input" style={{ margin: "2vh 2vw", padding: "20px" }}>
        <form style={{ width: "20vw" }} onSubmit={(e) => { calculateRoot(e) }}>
          <u><h4><b>Taylor Series method</b></h4></u>
          <h5><b>Please fill the input below</b></h5>
          <label>&nbsp; f(x)</label>
          <br />
          <input required type="text" name="fx" className="form-control" placeholder="Enter f(x)" style={{ borderRadius: "5px" }} defaultValue={displayEQ} />
          <br />
          <label>&nbsp; X value</label>
          <br />
          <input required type="number" step="0.01" name="x" className="form-control" placeholder="Enter X" style={{ borderRadius: "5px" }} defaultValue={Xin} />
          <br />
          <label>&nbsp; X0 value</label>
          <br />
          <input required type="number" step="0.01" name="x0" className="form-control" placeholder="Enter X0" style={{ borderRadius: "5px" }} defaultValue={Xin} />
          <br />
          <label>&nbsp; N value</label>
          <br />
          <input required type="number" step="0.01" name="n" className="form-control" placeholder="Enter N" style={{ borderRadius: "5px" }} defaultValue={Xin} />
          <br />
          <div className="taylor-child">
            <div style={{ width: "100px" }}>
              <button className="btn btn-primary btn-block" id="btn-submit" style={{ backgroundColor: "#ad2e24", borderColor: "#540804", marginBottom: "5px" }} type="submit">Calculate</button>
            </div>
            <div>
              <button disabled className="btn btn-primary btn-block" id="btn-load" style={{ backgroundColor: "#ea8c55", borderColor: "#ffbe0b", marginBottom: "5px" }} onClick={() => { }}>Example</button>
            </div>
            <div>
              <button className="btn btn-primary btn-block" id="btn-load" style={{ backgroundColor: "#000000", borderColor: "#000000", marginBottom: "10px" }}><Link to="/rootofequation">Back</Link></button>
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
                <h5 style={{ color: "white" }}><b>Answer = {X.toPrecision(1)}</b></h5>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

  )
}

export default Taylor;