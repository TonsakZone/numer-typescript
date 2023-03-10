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
    X: number
    E: number;
    Xold: number;
};

const Onepoint: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueX, setValueX] = useState<number[]>([]);
    const [valueE, setValueE] = useState<number[]>([]);
    const [valueXold, setValueXold] = useState<number[]>([]);
    const [showGraph, setshowGraph] = useState<boolean>(false);

    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [Equation, setEquation] = useState<string>("(x^4)-13");
    const [X, setX] = useState<number>(0);
    const [Xin, setXin]= useState<string>('0');
    // const [Xold, setXold] = useState<string>('0');
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
                        <th>Xold</th>
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
            fX = evaluate(Equation, scope)
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
        setX(x)
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

    const inputX = (e: ChangeEvent<HTMLInputElement>) => {
        const inputX = e.target.value;
        console.log(inputX);
        setXin(inputX);
    }

    const calculateRoot = () => {
        const xnum = parseFloat(Xin)
        Calonepoint(xnum);
        setHtml(print());

        console.log(valueIter)
        console.log(valueX)
    }

    const resetPage = () => {
        
    }

    return (
        <Container style={{background: '#ffbe0b'}}>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input x</Form.Label>
                    <input type="number" id="X" onChange={inputX} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
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

export default Onepoint