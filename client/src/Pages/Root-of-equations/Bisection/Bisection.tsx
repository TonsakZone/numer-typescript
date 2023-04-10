import React, { useState, FormEvent } from "react"
import { evaluate } from 'mathjs'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Bisection.css'
import { Table } from '@mantine/core'
import { Link } from "react-router-dom";
import axios from 'axios'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

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

interface Option {
    value: string;
    // label: string;
}

const Bisection: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueXL, setValueXL] = useState<number[]>([]);
    const [valueXM, setValueXM] = useState<number[]>([]);
    const [valueXR, setValueXR] = useState<number[]>([]);
    const [valueE, setValueE] = useState<number[]>([]);
    const [showGraph, setshowGraph] = useState<boolean>(false);
    const [iterCount, setIterCount] = useState<number>(0);
    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [equation, setEquation] = useState<string>("(x^4)-13")
    const [X, setX] = useState<number>(0)
    const [XL, setXL] = useState<string>("0")
    const [XR, setXR] = useState<string>("0")
    const [Authorization, setAuthorization] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const print = (): JSX.Element => {
        console.log(data);
        setValueIter(data.map((x) => x.iteration));
        setValueXL(data.map((x) => x.XL));
        setValueXM(data.map((x) => x.Xm));
        setValueXR(data.map((x) => x.Xr));
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
                                <td>{element.XL.toPrecision(4)}</td>
                                <td>{element.Xm.toPrecision(4)}</td>
                                <td>{element.Xr.toPrecision(4)}</td>
                                <td>{element.E.toPrecision(4)}</td>
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
        scale: {
            x: {
                display: true,
                grid: {
                    display: true,
                }
            },

            y: {
                display: true,
                type: 'logarithmic',
            },
        },

        plugins: {
            legend: {
                display: false
            }
        }
    }

    const errorGraph = {
        labels: valueIter,
        datasets: [
            {
                label: 'ERROR',
                data: valueE,
                borderColor: '#540804',
                backgroundColor: '#ad2e24',
            },
        ],
    }

    const XMGraph = {
        labels: valueIter,
        datasets: [
            {
                label: 'XM',
                data: valueXM,
                borderColor: '#540804',
                backgroundColor: '#ad2e24',
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
        setValueXM([]);
        setValueXR([]);
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
        if (check === true) {
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

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if(selectedValue == 'empty') {
            alert("Value cannot be empty");
        }
        // const selectedLabel = e.target.selectedOptions[0].label;
        // console.log(selectedLabel);
        console.log(selectedValue);

        axios.post("http://localhost:5000/token").then(res=> {
            setAuthorization(res.data.token);
            console.log(res.data.token);
          })

        setSelectedOption({ value: selectedValue });
        // console.log(`http://localhost:5000/Exbisection/${selectedValue}`);
        
        // Make axios.post request to API endpoint with selected value
        axios.post(`http://localhost:5000/methods`, {pages: 'bisections', Equation: selectedValue}, {headers: {authorization: `${Authorization}`}})
            .then(response => {
                console.log(response.data.Equation);
                const inputFx = document.getElementById('fx-input') as HTMLInputElement;
                const inputXl = document.getElementById('xl-input') as HTMLInputElement;
                const inputXr = document.getElementById('xr-input') as HTMLInputElement;
                inputFx.value = response.data.Equation;
                inputXl.value = response.data.XL;
                inputXr.value = response.data.XR;
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="bisection">
            <div className="container bisection-input" style={{ margin: "2vh 2vw", padding: "20px" }}>
                <form style={{ width: "20vw" }} onSubmit={(e) => { calculateRoot(e) }}>
                    <u><h4><b>Bisection method</b></h4></u>
                    <h6 style={{ color: "red" }}>Note: f(XL) and f(XR) result must be opposite</h6>
                    <h5><b>Please fill the input below</b></h5>
                    <label>&nbsp; f(x)</label>
                    <br />
                    <input required type="text" id="fx-input" name="fx" className="form-control" placeholder="Enter f(x)" style={{ borderRadius: "5px" }} />
                    <br />
                    <label>&nbsp; XL value</label>
                    <br />
                    <input required type="number" id="xl-input" step="0.01" name="xl" className="form-control" placeholder="Enter XL" style={{ borderRadius: "5px" }} />
                    <br />
                    <label>&nbsp; XR value</label>
                    <br />
                    <input required type="number" id="xr-input" step="0.01" name="xr" className="form-control" placeholder="Enter XR" style={{ borderRadius: "5px" }} />
                    <br />
                    <div className="bisection-child">
                        <div>
                            <button className="btn btn-primary btn-block" id="btn-submit" style={{ backgroundColor: "#ad2e24", borderColor: "#540804", marginBottom: "10px" }} type="submit">Calculate</button>
                        </div>

                        <div>
                            <button className="btn btn-primary btn-block" id="btn-load" style={{ backgroundColor: "#000000", borderColor: "#000000", marginBottom: "10px" }}><Link to="/rootofequation">Back</Link></button>
                        </div>
                    </div>
                </form>
                <div>
                    <label htmlFor="my-select">Select an example: &nbsp;</label>
                    <select id="my-select" value={selectedOption?.value} onChange={handleOptionChange}>
                        <option value="empty"></option>
                        <option value="(x^4)-13">(x^4)-13</option>
                        <option value="(x^2)-7">(x^2)-7</option>
                    </select>
                </div>
            </div>
            <div>
                {showGraph === true &&
                    <div>
                        <div className="container bisection-answer" style={{ margin: "2vh 2vw", padding: "10px 20px", border: "3px solid #ea8c55", borderRadius: "8px" }}>
                            <div>
                                <h4><u><b>Input equation: {equation}</b></u></h4>
                                <h4>Input XL: {XL}</h4>
                                <h4>Input XR: {XR}</h4>
                            </div>
                            <div>
                                <h4><u><b>Result</b></u></h4>
                                <h5>Total iteration: {iterCount}</h5>
                                <h5 style={{ color: "white" }}><b>Answer = {X.toPrecision(4)}</b></h5>
                            </div>
                        </div>
                        <div className="container bisection-graph" style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>Error graph</b></u></h4>
                            <Line style={{ height: "245px", width: "490px" }} options={options} data={errorGraph} />
                        </div>
                        <div className="container bisection-graph" style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>XM graph</b></u></h4>
                            <Line style={{ height: "245px", width: "490px" }} options={options} data={XMGraph} />
                        </div>
                    </div>
                }
            </div>
            <div>
                {showGraph === true &&
                    <div>
                        <div className="container bisection-table" style={{ margin: "2vh 1vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>Calculate values</b></u></h4>
                            {html}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Bisection;

