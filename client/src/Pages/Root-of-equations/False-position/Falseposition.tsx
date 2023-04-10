import React, { useState, FormEvent } from "react"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Falseposition.css'
import { evaluate } from 'mathjs'
import { Link } from "react-router-dom";
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
import { Line } from 'react-chartjs-2';
import { Calfalseposition } from "./Calfalseposition";

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
    X1: number;
    XR: number;
    E: number;
    X1old: number;
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

const Falseposition: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueXL, setValueXL] = useState<number[]>([]);
    const [valueX1, setValueX1] = useState<number[]>([]);
    const [valueXR, setValueXR] = useState<number[]>([]);
    const [valueE, setValueE] = useState<number[]>([]);
    const [valueX1old, setValueX1old] = useState<number[]>([]);
    const [showGraph, setshowGraph] = useState<boolean>(false);
    const [iterCount, setIterCount] = useState<number>(0);
    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [equation, setEquation] = useState<string>("(x^4)-13");
    const [X, setX] = useState<number>(0);
    const [XL, setXL] = useState<string>('0');
    const [XR, setXR] = useState<string>('0');
    const print = (): JSX.Element => {
        console.log(data);
        setValueIter(data.map((x) => x.iteration));
        setValueXL(data.map((x) => x.XL));
        setValueX1(data.map((x) => x.X1));
        setValueXR(data.map((x) => x.XR));
        setValueE(data.map((x) => x.E));
        setValueX1old(data.map((x) => x.X1old));
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>XL</th>
                        <th>X1</th>
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
                                <td>{element.X1.toPrecision(4)}</td>
                                <td>{element.XR.toPrecision(4)}</td>
                                <td>{element.E.toPrecision(4)}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        );
    }
const Calfalseposition1 = (xL: number, xr:number) => {
    const obj = Calfalseposition(xL, xr, equation);
    setX(obj.X1);
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
                ticks: {
                    stepSize: 0.000001,
                    suggestedMin: 0,

                }

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

    const X1Graph = {
        labels: valueIter,
        datasets: [
            {
                label: 'X1',
                data: valueX1,
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
        setValueX1([]);
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
            Calfalseposition1(xlnum, xrnum);
            setHtml(print());

            console.log(valueIter)
            console.log(valueXL)
        } else {
            alert("Failed! XL or XR value is incorrect");
        }
    }

    return (
        <div className="falseposition">
            <div className="container falseposition-input" style={{ margin: "2vh 2vw", padding: "20px" }}>
                <form style={{ width: "20vw" }} onSubmit={(e) => { calculateRoot(e) }}>
                    <u><h4><b>False-Position method</b></h4></u>
                    <h6 style={{ color: "red" }}>Note: f(XL) and f(XR) result must be opposite</h6>
                    <h5><b>Please fill the input below</b></h5>
                    <label>&nbsp; f(x)</label>
                    <br />
                    <input required type="text" name="fx" className="form-control" placeholder="Enter f(x)" style={{ borderRadius: "5px" }} defaultValue={equation} />
                    <br />
                    <label>&nbsp; XL value</label>
                    <br />
                    <input required type="number" step="0.01" name="xl" className="form-control" placeholder="Enter XL" style={{ borderRadius: "5px" }} />
                    <br />
                    <label>&nbsp; XR value</label>
                    <br />
                    <input required type="number" step="0.01" name="xr" className="form-control" placeholder="Enter XR" style={{ borderRadius: "5px" }} />
                    <br />
                    <div className="falseposition-child">
                        <div>
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
                        <div className="container falseposition-answer" style={{ margin: "2vh 2vw", padding: "10px 20px", border: "3px solid #ea8c55", borderRadius: "8px" }}>
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
                        <div className="container falseposition-graph" style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>Error graph</b></u></h4>
                            <Line style={{ height: "245px", width: "490px" }} options={options} data={errorGraph} />
                        </div>
                        <div className="container falseposition-graph" style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>X1 graph</b></u></h4>
                            <Line style={{ height: "245px", width: "490px" }} options={options} data={X1Graph} />
                        </div>
                    </div>
                }
            </div>
            <div>
                {showGraph === true &&
                    <div>
                        <div className="container falseposition-table" style={{ margin: "2vh 1vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>Calculate values</b></u></h4>
                            {html}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Falseposition