import React, { useState, FormEvent } from "react"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Onepoint.css'
import { parse } from 'mathjs'
import axios from "axios";
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
    X: number
    E: number;
    Xold: number;
};

interface FormValues {
    fx: string;
    x: number;
}

type Option = {
    value: string;
}

const Onepoint: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    //table state
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueX, setValueX] = useState<number[]>([]);
    const [valueE, setValueE] = useState<number[]>([]);
    const [valueXold, setValueXold] = useState<number[]>([]);
    const [showGraph, setshowGraph] = useState<boolean>(false);
    const [iterCount, setIterCount] = useState<number>(0);
    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [equation, setEquation] = useState<string>("");
    const [X, setX] = useState<number>(0);
    const [Xin, setXin] = useState<number>(0);
    const [Authorization, setAuthorization] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const print = (): JSX.Element => {
        console.log(data);
        setValueIter(data.map((x) => x.iteration));
        setValueX(data.map((x) => x.X));
        setValueE(data.map((x) => x.E));
        setValueXold(data.map((x) => x.Xold));
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>XNew</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X.toPrecision(4)}</td>
                                <td>{element.E.toPrecision(4)}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const error = (xold: number, xnew: number) => Math.abs((xnew - xold) / xnew) * 100;

    const Calonepoint = (x0: number, f: string) => {

        let ea, scope, xNew = 0;
        let iter = 0;
        let MAX = 50;
        const e = 0.00001;
        let obj: Data = { iteration: 0, X: 0, E: 100, Xold: 0 };
        do {
            scope = {
                x: x0,
            }
            console.log(x0);
            xNew = parse(f).evaluate(scope)
            iter++;
            ea = error(x0, xNew);
            obj = {
                iteration: iter,
                X: xNew,
                E: ea,
                Xold: x0
            }
            data.push(obj)
            x0 = xNew
        } while (ea > e && iter < MAX)
        setX(x0);
        setIterCount(iter);
        console.log(x0);
        setshowGraph(true);
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

    const XGraph = {
        labels: valueIter,
        datasets: [
            {
                label: 'X',
                data: valueX,
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
        setValueX([]);
        setValueXold([]);
        setValueE([]);
        setHtml(null);
        const formData: FormValues = {
            fx: e.currentTarget.fx.value,
            x: e.currentTarget.x.value
        };
        inputEquation(formData.fx);
        console.log(formData.x);
        setXin(formData.x);
        Calonepoint(formData.x, formData.fx);
        setHtml(print());

        console.log(valueIter)
        console.log(valueX)
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        if(selectedValue == 'empty') {
            alert("Value cannot be empty");
            setshowGraph(false)
        }
        console.log(selectedValue);

        axios.post("http://localhost:5000/token").then(res=> {
            setAuthorization(res.data.token);
            console.log(res.data.token);
          })
        
        setSelectedOption({ value: selectedValue });

        axios.post("http://localhost:5000/methods", {pages: 'onepoints', Equation: selectedValue}, {headers: {authorization: `${Authorization}`}}).then(response => {
            const inputFx = document.getElementById('fx-input') as HTMLInputElement;
            const inputX = document.getElementById('x-input') as HTMLInputElement;
            inputFx.value = response.data.Equation;
            inputX.value = response.data.X;
        })
        .catch(error => {
            console.error(error);
        });  

    }

    return (
        <div className="onepoint">
            <div className="container onepoint-input" style={{ margin: "2vh 2vw", padding: "20px" }}>
            <u><h4><b>One-Point iteration method</b></h4></u>
                    <h5><b>Please fill the input below</b></h5>
            <div>
                    <label htmlFor="my-select">Select an example: &nbsp;</label>
                    <select id="my-select" value={selectedOption?.value} onChange={handleOptionChange}>
                        <option value="empty"></option>
                        <option value="(((2*x)+5)/2)^(1/3)">(((2*x)+5)/2)^(1/3)</option>
                        {/* <option value="(x^2)-7">(x^2)-7</option> */}
                    </select>
                </div>
                <form style={{ width: "20vw" }} onSubmit={(e) => { calculateRoot(e) }}>
                    
                    <label>&nbsp; f(x)</label>
                    <br />
                    <input required type="text" id="fx-input" name="fx" className="form-control" placeholder="Enter f(x)" style={{ borderRadius: "5px" }} defaultValue={equation} />
                    <br />
                    <label>&nbsp; X value</label>
                    <br />
                    <input required type="number" id="x-input" step="0.01" name="x" className="form-control" placeholder="Enter X" style={{ borderRadius: "5px" }} defaultValue={Xin} />
                    <br />
                    <div className="onepoint-child">
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
                        <div className="container onepoint-answer" style={{ margin: "2vh 2vw", padding: "10px 20px", border: "3px solid #ea8c55", borderRadius: "8px" }}>
                            <div>
                                <h4><u><b>Input equation: {equation}</b></u></h4>
                                <h4>Input X: {Xin}</h4>
                            </div>
                            <div>
                                <h4><u><b>Result</b></u></h4>
                                <h5>Total iteration: {iterCount}</h5>
                                <h5 style={{ color: "white" }}><b>Answer = {X.toPrecision(4)}</b></h5>
                            </div>
                        </div>
                        <div className="container onepoint-graph" style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>Error graph</b></u></h4>
                            <Line style={{ height: "245px", width: "490px" }} options={options} data={errorGraph} />
                        </div>
                        <div className="container onepoint-graph" style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>X graph</b></u></h4>
                            <Line style={{ height: "245px", width: "490px" }} options={options} data={XGraph} />
                        </div>
                    </div>
                }
            </div>
            <div>
                {showGraph === true &&
                    <div>
                        <div className="container onepoint-table" style={{ margin: "2vh 1vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>Calculate values</b></u></h4>
                            {html}
                        </div>
                    </div>
                }
            </div>
        </div>

    )
}

export default Onepoint