import React, { useState, ChangeEvent } from "react"
import { Button, Container, Form } from "react-bootstrap";
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
    XL: number;
    X1: number;
    XR: number;
    E: number;
    X1old: number;
};

const Falseposition: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueXL, setValueXL] = useState<number[]>([]);
    const [valueX1, setValueX1] = useState<number[]>([]);
    const [valueXR, setValueXR] = useState<number[]>([]);
    const [valueE, setValueE] = useState<number[]>([]);
    const [valueX1old, setValueX1old] = useState<number[]>([]);
    const [showGraph, setshowGraph] = useState<boolean>(false);

    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [Equation, setEquation] = useState<string>("(x^4)-13");
    const [X, setX] = useState<number>(0);
    const [XL, setXL] = useState<string>('0');
    const [XR, setXR] = useState<string>('0');
    // const [X1, setX1] = useState<string>('0');
    // const [X1old, setX1old] = useState<string>('0');
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
                                <td>{element.XL}</td>
                                <td>{element.X1}</td>
                                <td>{element.XR}</td>
                                <td>{element.E}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const error = (xold: number, xnew: number) => Math.abs((xnew - xold) / xnew) * 100;

    const Calfalseposition = (xL: number, xR: number) => {
        let X1, fX1, fXR, fXL, ea, scope, X1old=0;
        let iter = 0;
        let MAX = 50;
        const e = 0.00001;
        let obj: Data = { iteration: 0, XL: 0, X1: 0, XR: 0, E: 100, X1old: 0 };
        do {
            scope = {
                x: xR,
            }
            fXR = evaluate(Equation, scope)

            scope = {
                x: xL,
            }
            fXL = evaluate(Equation, scope)

            X1=((xL*fXR)-(xR*fXL))/(fXR-fXL);

            scope = {
                x: X1,
            }
            fX1 = evaluate(Equation, scope)

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
                data.push(obj)
                X1old=X1;
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
                data.push(obj)
                X1old=X1;
                xL = X1;
                console.log(data);
            }
        } while (ea > e && iter < MAX)
        setX(X1)
        setshowGraph(true)
    }

    const options = {
        scales: {
            x: {
                grid: {
                    display: false,
                }
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

    const inputEquation = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        console.log(input)
        setEquation(input)
    }

    const inputXL = (e: ChangeEvent<HTMLInputElement>) => {
        const inputXL = e.target.value;
        console.log(inputXL);
        setXL(inputXL);
        
    };


    const inputXR = (e: ChangeEvent<HTMLInputElement>) => {
        const inputXR = e.target.value;
        console.log(inputXR);
        setXR(inputXR);
    }

    const calculateRoot = () => {
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calfalseposition(xlnum, xrnum);
        setHtml(print());

        console.log(valueIter)
        console.log(valueXL)
    }

    const resetPage = () => {
        
    }

    return (
        <Container style={{background: '#ffbe0b'}}>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input XL</Form.Label>
                    <input type="number" id="XL" onChange={inputXL} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input XR</Form.Label>
                    <input type="number" id="XR" onChange={inputXR} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                <Button variant="dark" onClick={resetPage}>
                    Reset
                </Button>
            </Form>
            <br></br>
            <h5>Answer = {X.toPrecision(3)}</h5>
            {showGraph == true &&
            <Container>
                <Line options={options} data={chartdata} />
                {html}
            </Container>
            }

        </Container>

    )
}

export default Falseposition