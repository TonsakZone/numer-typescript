import React, { useState, FormEvent } from "react"
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Onepoint.css'
import { evaluate } from 'mathjs'
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

interface InputData {
    X: string;
}

const Onepoint: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueX, setValueX] = useState<number[]>([]);
    const [valueE, setValueE] = useState<number[]>([]);
    const [valueXold, setValueXold] = useState<number[]>([]);
    const [showGraph, setshowGraph] = useState<boolean>(false);
    const [iterCount, setIterCount] = useState<number>(0);
    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [equation, setEquation] = useState<string>("(x^4)-13");
    const [X, setX] = useState<number>(0);
    const [Xin, setXin]= useState<string>('0');
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
                        <th>X</th>
                        <th>X0</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X}</td>
                                <td>{element.Xold}</td>
                                <td>{element.E}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const error = (xold: number, xnew: number) => Math.abs((xnew - xold) / xnew) * 100;
    const Calonepoint = (x: number) => {
        let fX, ea, scope, Xold=0;
        let iter = 0;
        let MAX = 50;
        const e = 0.00001;
        let obj: Data = { iteration: 0, X: 0, E: 100, Xold: 0 };
        do {
            scope = {
                x: x,
            }
            fX = evaluate(equation, scope)
            iter++;
                ea = error(Xold, x);
                obj = {
                    iteration: iter,
                    X: x,
                    E: ea,
                    Xold: x
                }
                data.push(obj)
                Xold=x;
        } while (ea > e && iter < MAX)
        setX(obj.X);
        setIterCount(obj.iteration);
        console.log(X);
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
        const Xstr = formData.x.toString();
        const inputData: InputData = { X: Xstr };
        inputEquation(formData.fx);
            const xnum = parseFloat(inputData.X)
            console.log(xnum);
            setXin(Xstr);
            Calonepoint(xnum);
            setHtml(print());

            console.log(valueIter)
            console.log(valueX)
    }


    return (
        <div className="onepoint">
        <div className="container onepoint-input" style={{ margin: "2vh 2vw", padding: "20px" }}>
            <form style={{ width: "20vw" }} onSubmit={(e) => { calculateRoot(e) }}>
                <u><h4><b>One-Point method</b></h4></u>
                <h6 style={{ color: "red" }}>Note: f(XL) and f(XR) result must be opposite</h6>
                <p>Steps:</p>
                <p>1. หาค่า X1 โดย</p>
                <p>X1=((XL*f(XR))-(XR*f(XL)))/(f(XR)-(fXL))</p>
                <p>2. นำค่า X1 XR ไปแทนค่าในสมการ f(x) แล้วเทียบตามเงื่อนไขดังนี้</p>
                <p><b>หากค่า f(X1) * f(XR) {'>'} 0 ให้ค่า XR=X1</b></p>
                <p><b>หากค่า f(X1) * f(XR) {'<'} 0 ให้ค่า XL=X1</b></p>
                <p>3. หาค่า error</p>
                <h5><b>Please fill the input below</b></h5>
                <label>&nbsp; f(x)</label>
                <br />
                <input required type="text" name="fx" className="form-control" placeholder="Enter f(x)" style={{ borderRadius: "5px" }} defaultValue={equation} />
                <br />
                <label>&nbsp; X value</label>
                <br />
                <input required type="number" step="0.01" name="x" className="form-control" placeholder="Enter X" style={{ borderRadius: "5px" }} />
                <br />
                <div className="onepoint-child">
                <div style={{ width: "100px"}}>
                <button className="btn btn-primary btn-block" id="btn-submit" style={{ backgroundColor: "#ad2e24", borderColor: "#540804", marginBottom: "5px" }} type="submit">Calculate</button>
                </div>
                <div>
            <button disabled className="btn btn-primary btn-block" id="btn-load" style={{ backgroundColor: "#ea8c55", borderColor: "#ffbe0b", marginBottom: "5px" }} onClick={()=>{}}>Load example</button>
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
                        <h4>Input X: {X}</h4>                        </div>
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