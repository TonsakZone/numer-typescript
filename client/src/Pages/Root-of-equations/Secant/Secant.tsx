import React, { useState, FormEvent } from "react"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Secant.css'
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
    X1: number;
    X0: number;
    E: number;
};

interface FormValues {
    fx: string;
    x1: number;
    x0: number;
}

const Secant: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueX1, setValueX1] = useState<number[]>([]);
    const [valueX0, setValueX0] = useState<number[]>([]);
    const [valueE, setValueE] = useState<number[]>([]);
    const [valueX1old, setValueX1old] = useState<number[]>([]);
    const [showGraph, setshowGraph] = useState<boolean>(false);
    const [iterCount, setIterCount] = useState<number>(0);
    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [equation, setEquation] = useState<string>("(x^2)-7");
    const [X, setX] = useState<number>(0);
    const [X1, setX1] = useState<number>(0);
    const [X0, setX0] = useState<number>(0);
    const print = (): JSX.Element => {
        console.log(data);
        setValueIter(data.map((x) => x.iteration));
        setValueX1(data.map((x) => x.X1));
        setValueX0(data.map((x) => x.X0));
        setValueE(data.map((x) => x.E));
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>X1</th>
                        {/* <th>X0</th> */}
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X1.toPrecision(4)}</td>
                                {/* <td>{element.X0.toPrecision(4)}</td> */}
                                <td>{element.E.toPrecision(4)}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const error = (xold: number, xnew: number) => Math.abs((xnew - xold) / xnew) * 100;
    const Calsecant = (x1: number, x0: number) => {
        let fx0, fx1, xNew, ea, scope;
        let iter = 0;
        let MAX = 50;
        const e = 0.00001;
        let obj: Data = { iteration: 0, X1: 0, X0: 0, E: 100 };
        do {
            scope = {
                x: x0,
            }
            fx0 = evaluate(equation, scope)
            scope = {
                x: x1,
            }
            fx1 = evaluate(equation, scope)
            xNew=x1-(fx1*(x0-x1))/(fx0-fx1);
            iter++;
                ea = error(x1, xNew);
                obj = {
                    iteration: iter,
                    X1: xNew,
                    X0: x1,
                    E: ea,
                }
                data.push(obj)
                x0 = x1;
                x1 = xNew;
        } while (ea > e && iter < MAX)
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

    const inputEquation = (fx: string) => {
        setEquation(fx)
    }

    const calculateRoot = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setX(0);
        setData([]);
        setValueIter([]);
        setValueX1([]);
        setValueX0([]);
        setValueE([]);
        setHtml(null);
        const formData: FormValues = {
            fx: e.currentTarget.fx.value,
            x1: e.currentTarget.x1.value,
            x0: e.currentTarget.x0.value
        };
        inputEquation(formData.fx);
            setX1(formData.x1);
            setX0(formData.x0);
            Calsecant(formData.x1, formData.x0);
            setHtml(print());

    }

    return (
        <div className="secant">
            <div className="container secant-input" style={{ margin: "2vh 2vw", padding: "20px" }}>
                <form style={{ width: "20vw" }} onSubmit={(e) => { calculateRoot(e) }}>
                    <u><h4><b>Secant method</b></h4></u>
                    <h5><b>Please fill the input below</b></h5>
                    <label>&nbsp; f(x)</label>
                    <br />
                    <input required type="text" name="fx" className="form-control" placeholder="Enter f(x)" style={{ borderRadius: "5px" }} defaultValue={equation} />
                    <br />
                    <label>&nbsp; X1 value</label>
                    <br />
                    <input required type="number" step="0.01" name="x1" className="form-control" placeholder="Enter X1" style={{ borderRadius: "5px" }} />
                    <br />
                    <label>&nbsp; X0 value</label>
                    <br />
                    <input required type="number" step="0.01" name="x0" className="form-control" placeholder="Enter X0" style={{ borderRadius: "5px" }} />
                    <br />
                    <div className="secant-child">
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
                        <div className="container secant-answer" style={{ margin: "2vh 2vw", padding: "10px 20px", border: "3px solid #ea8c55", borderRadius: "8px" }}>
                            <div>
                                <h4><u><b>Input equation: {equation}</b></u></h4>
                                <h4>Input X1: {X1}</h4>
                                <h4>Input X0: {X0}</h4>
                            </div>
                            <div>
                                <h4><u><b>Result</b></u></h4>
                                <h5>Total iteration: {iterCount}</h5>
                                <h5 style={{ color: "white" }}><b>Answer = {X.toPrecision(4)}</b></h5>
                            </div>
                        </div>
                        <div className="container secant-graph" style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>Error graph</b></u></h4>
                            <Line style={{ height: "245px", width: "490px" }} options={options} data={errorGraph} />
                        </div>
                        <div className="container secant-graph" style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>X1 graph</b></u></h4>
                            <Line style={{ height: "245px", width: "490px" }} options={options} data={X1Graph} />
                        </div>
                    </div>
                }
            </div>
            <div>
                {showGraph === true &&
                    <div>
                        <div className="container secant-table" style={{ margin: "2vh 1vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>Calculate values</b></u></h4>
                            {html}
                        </div>
                    </div>
                }
            </div>
        </div>

    )
}

export default Secant