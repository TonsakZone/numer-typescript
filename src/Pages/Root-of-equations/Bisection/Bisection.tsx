import React, { useState, ChangeEvent, FormEvent } from "react"
import { evaluate } from 'mathjs'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './Bisection.css'
import { Table } from '@mantine/core'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Scatter } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type Data = {
    iteration: number;
    XL: number;
    Xm: number;
    Xr: number;
    E: number;
};

interface FormValues {
    fx: string;
    xl: number;
    xr: number;
}

interface InputData {
    XL: string;
    XR: string;
}

const Bisection: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueXL, setValueXL] = useState<number[]>([]);
    const [valueXm, setValueXm] = useState<number[]>([]);
    const [valueXr, setValueXr] = useState<number[]>([]);
    const [valueE, setValueE] = useState<number[]>([]);
    const [showGraph, setshowGraph] = useState<boolean>(false);
    const [iterCount, setIterCount] = useState<number>(0);
    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [equation, setEquation] = useState<string>("(x^4)-13")
    const [X, setX] = useState<number>(0)
    const [XL, setXL] = useState<string>("0")
    const [XR, setXR] = useState<string>("0")
    const print = (): JSX.Element => {
        console.log(data);
        setValueIter(data.map((x) => x.iteration));
        setValueXL(data.map((x) => x.XL));
        setValueXm(data.map((x) => x.Xm));
        setValueXr(data.map((x) => x.Xr));
        setValueE(data.map((x) => x.E));
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>XL</th>
                        <th>XM</th>
                        <th>XR</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.XL}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                                <td>{element.E}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        );
    }
    const error = (xold: number, xnew: number) => Math.abs((xnew - xold) / xnew) * 100;
    const Calbisection = (xL: number, xr: number) => {
        let xm, fXm, fXr, ea, scope;
        let iter = 0;
        let MAX = 50;
        const e = 0.00001;
        let obj: Data = { iteration: 0, XL: 0, Xm: 0, Xr: 0, E: 100 };
        do {
            xm = (xL + xr) / 2.0;
            scope = {
                x: xr,
            }
            fXr = evaluate(equation, scope)
            scope = {
                x: xm,
            }
            fXm = evaluate(equation, scope)
            iter++;
            if (fXm * fXr > 0) {
                ea = error(xr, xm);
                obj = {
                    iteration: iter,
                    XL: xL,
                    Xm: xm,
                    Xr: xr,
                    E: ea
                }
                data.push(obj)
                xr = xm;
            }
            else {
                ea = error(xL, xm);
                obj = {
                    iteration: iter,
                    XL: xL,
                    Xm: xm,
                    Xr: xr,
                    E: ea
                }
                data.push(obj)
                xL = xm;
            }
        } while (ea > e && iter < MAX)
        setX(obj.Xm);
        setIterCount(obj.iteration);
        console.log(X);
        setshowGraph(true)
    }
    const options = {
        scales: {
            x: {
                display: true,
                grid: {
                    display: true,
                }
            },
            y: {
                display: true,
            },
        },

        plugins: {
            legend: {
                display: false
            }
        }
    }
    const chartdata = {
        labels: valueIter,
        datasets: [
            {
                label: '',
                data: valueE,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }
    const checkinput = (input: InputData): boolean => {
        let fxl, fxr, scope;
        scope = {
            x: input.XL
        }
        fxl = evaluate(equation, scope);
        scope = {
            x: input.XR
        }
        fxr = evaluate(equation, scope);
        if (fxl < 0 && fxr > 0) {
            return true;
        } else {
            setshowGraph(false);
            return false;
        }
    }
    const inputEquation = (fx: string) => {
        setEquation(fx)
    }
    const calculateRoot = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setX(0);
        setData([]);
        setValueIter([]);
        setValueXL([]);
        setValueXm([]);
        setValueXr([]);
        setValueE([]);
        setHtml(null);
        const formData: FormValues = {
            fx: e.currentTarget.fx.value,
            xl: e.currentTarget.xl.value,
            xr: e.currentTarget.xr.value
        };
        const XLstr = formData.xl.toString();
        const XRstr = formData.xr.toString();
        const inputData: InputData = { XL: XLstr, XR: XRstr };
        inputEquation(formData.fx);
        let check = checkinput(inputData);
        if (check == true) {
            const xlnum = parseFloat(inputData.XL)
            const xrnum = parseFloat(inputData.XR)
            console.log(xlnum + " " + xrnum);
            setXL(XLstr);
            setXR(XRstr);
            Calbisection(xlnum, xrnum);
            setHtml(print());

            console.log(valueIter)
            console.log(valueXL)
        } else {
            alert("Failed! XL or XR value is incorrect");
        }
    }

    return (
        <div>
            <div className="container">
            <form id="bisection" onSubmit={(e) => { calculateRoot(e) }}>
                <div style={{ marginBottom: "10px", marginTop: "10px", padding: "5px" }}></div>
                <u><h5>Bisection method</h5></u>
                <label>&nbsp; f(x)</label>
                <br />
                <input required type="text" name="fx" className="form-control" placeholder="Enter f(x)" style={{ borderColor: "black", borderRadius: "5px", width: "30%" }} defaultValue={equation} />
                <br />
                <label>&nbsp; XL value</label>
                <br />
                <input required type="number" step="0.01" name="xl" className="form-control" placeholder="Enter XL" style={{ borderColor: "black", borderRadius: "5px", width: "30%" }} />
                <br />
                <label>&nbsp; XR value</label>
                <br />
                <input required type="number" step="0.01" name="xr" className="form-control" placeholder="Enter XR" style={{ borderColor: "black", borderRadius: "5px", width: "30%" }} />
                <br />
                <button className="btn btn-primary btn-block" id="btn-submit" style={{ backgroundColor: "#ad2e24", borderColor: "#ad2e24", marginRight: "5px", marginBottom: "5px" }} type="submit">Calculate</button>
            </form>
            <button className="btn btn-primary btn-block" id="btn-load" style={{ backgroundColor: "#ffbe0b", borderColor: "#ffbe0b", marginRight: "5px", marginBottom: "5px" }} >Load example</button>
            <br />
            </div>
            {showGraph == true &&
            <div>
                <div className="container">
                    <br />
                    <h5 style={{ color: "darkblue" }}><u><b>Equation: {equation}</b></u></h5>
                    <h5>XL: {XL}</h5>
                    <h5>XR: {XR}</h5>
                    <br />
                    <h5>Total iteration: {iterCount}</h5>
                    <h5 style={{ color: "darkred" }}><b>Answer = {X.toPrecision(6)}</b></h5>
                    </div>
                    <div className="container" style={{ width: "50%", height: "50%"}}>
                    <Line style={{ height: "40%", width: "40%"}}options={options} data={chartdata} />
                    {html}
                    </div>
                </div>
            }
            </div>
    )
}

export default Bisection;