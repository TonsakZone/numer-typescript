import React, { useState, ChangeEvent } from "react"
import { Button, Container, Form } from "react-bootstrap";
import { evaluate, derivative } from 'mathjs'
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
    XNew: number;
    X0: number;
    E: number;
};

const NewtonRaphson: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueE, setValueE] = useState<number[]>([]);
    const [valueXnew, setValueXnew] = useState<number[]>([]);
    const [valueX0, setValueX0] = useState<number[]>([]);
    const [showGraph, setshowGraph] = useState<boolean>(false);

    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [Equation, setEquation] = useState<string>("(x^4)-13");
    const [DiffEqua, setDiffEqua] = useState<string>("");
    const [X, setX] = useState<number>(0);
    const [X0, setX0] = useState<string>('0');
    // const [X1old, setX1old] = useState<string>('0');
    const print = (): JSX.Element => {
        console.log(data);
        setValueIter(data.map((x) => x.iteration));
        setValueXnew(data.map((x) => x.XNew));
        setValueX0(data.map((x) => x.X0));
        setValueE(data.map((x) => x.E));
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
                                <td>{element.XNew}</td>
                                <td>{element.X0}</td>
                                <td>{element.E}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const error = (xold: number, xnew: number) => Math.abs((xnew - xold) / xnew) * 100;

    const CalNR = (x0: number) => {
        let xNew, f, fDiff, ea, scope;
        let iter = 0;
        let MAX = 50;
        const e = 0.00001;
        let obj: Data = { iteration: 0, XNew: 0, X0: 0, E: 100 };
        do {
            scope = {
                x: x0,
            }
            f = evaluate(Equation, scope)
            fDiff = evaluate(DiffEqua, scope)

            xNew = x0-(f/fDiff);

            iter++;
            ea = error(x0, xNew);
            obj = {
                iteration: iter,
                XNew: xNew,
                X0: x0,
                E: ea
            }
            data.push(obj)
            x0 = xNew;
        } while (ea > e && iter < MAX)
        setX(x0)
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
        const diffInput = derivative(Equation,'x').toString()
        setDiffEqua(diffInput)
    }

    const inputX0 = (e: ChangeEvent<HTMLInputElement>) => {
        const inputX0 = e.target.value;
        console.log(inputX0);
        setX0(inputX0);
    }

    const calculateRoot = () => {
        const x0num = parseFloat(X0)
        CalNR(x0num);
        setHtml(print());

        console.log(valueIter)
        console.log(valueX0)
    }

    const resetPage = () => {

    }

    return (
        <Container style={{ background: '#ffbe0b' }}>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input X0</Form.Label>
                    <input type="number" id="XL" onChange={inputX0} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
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

export default NewtonRaphson